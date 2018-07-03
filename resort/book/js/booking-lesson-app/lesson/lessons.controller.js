(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .controller('LessonsController', LessonsController);

  LessonsController.$inject = [
    '$scope',
    '$window',
    'moment',
    '_',
    'settings',
    'ActivitiesFilterService',
    'Wix',
    'isParticipantFT',
    'getSelectedResult',
  ];

  function LessonsController(
    $scope,
    $window,
    moment,
    _,
    settings,
    ActivitiesFilterService,
    Wix,
    isParticipantFT,
    getSelectedResult,
  ) {
    let vm = this;

    // Registers this as the listener of Wix event
    let subscription = Wix.subscribe(loadData);

    $window.onmessage = windowOnMessage;

    vm.data = {};
    vm.dates = [];
    vm.settings = settings;
    vm.results = {
      _originURL: null,
      lessons: {
        group: {
          adults: [],
          children: [],
          mini: [],
        },
        private: {
          instructor: {
            required: false,
            details: null,
          },
          requests: null,
          lessons: [],
        },
        disability: [],
      },
    };

    // Binds functions
    vm.isDataAvailable = isDataAvailable;
    vm.getResults = getResults;

    function loadData(_) {
      $scope.$apply(applyData);
    }

    function applyData() {
      vm.wix = Wix;
      vm.results._originURL = Wix.msgOrigin;
      vm.data = Wix.getData();
      vm.dates = buildDatesRange(vm.data.date.checkIn, vm.data.date.checkOut);
      vm.participants = buildParticipantsList(vm.data.participants);
      vm.activities = vm.data.activities;
    }

    function isDataAvailable() {
      return !angular.equals(vm.data, {});
    }

    function buildParticipantsList(participants) {
      let participantsList = {
        adults: [],
        children: [],
        mini: [],
        normal: [],
        disabled: [],
      };

      for (const participant of participants) {
        // Ignores those who didn't choose any activities
        const activities = ActivitiesFilterService.getParticipantActivities(participant);

        if (_.isEmpty(activities)) continue;

        participant.isFirstTimer = isParticipantFT(participant);

        if (participant.physicalDisability) {
          participantsList.disabled.push(participant);
          continue;
        }

        participantsList.normal.push(participant);

        if (participant.age >= settings.AGE_GROUP.ADULT) {
          participantsList.adults.push(participant);
          continue;
        }

        if (participant.age >= settings.AGE_GROUP.TEEN_CHILD) {
          participantsList.children.push(participant);
          continue;
        }

        if (participant.age >= settings.AGE_GROUP.MINI) {
          participantsList.mini.push(participant);
        }
      }

      return participantsList;
    }

    function buildDatesRange(fromDate, toDate) {
      let range = moment.range(fromDate, toDate);
      let dates = Array.from(range.by('day'));

      return dates.map(function (m) {
        return m.toDate();
      });
    }

    /**
     * Filter the results:
     * - Remove lessons with no participants
     * Then return the filtered one
     */
    function getResults() {
      return getSelectedResult(vm.results);
    }

    function prefillData(eventData) {
      if (eventData.lessonsData) {
        vm.results.lessons = eventData.lessonsData;
      }

      return Wix.setData(eventData.msgData);
    }

    function windowOnMessage(event) {
      // Checks the event origin to make sure it's from our site
      if (!(event.data)) return;

      let message = event.data.msg;

      if (message === 'SEND_TRIP_DATA')
        return Wix.setData(event.data.msgData);

      if (message === 'GET_LESSONS_DATA') {
        return $window.parent.postMessage(
          {
            msg: 'LESSONS_DATA',
            results: vm.getResults(),
          },
          '*',
        );
      }

      if (message === 'SET_LESSONS_DATA') {
        return prefillData(event.data);
      }
    }
  }
})();
