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
    'Wix',
  ];

  function LessonsController($scope, $window, moment, _, settings, Wix) {
    let vm = this;

    // Registers this as the listener of Wix event
    let subscription = Wix.subscribe(loadData);

    $window.onmessage = windowOnMessage;

    vm.data = {};
    vm.dates = [];
    vm.settings = settings;
    vm.results = {
      _originURL: null,
      lessons: {}
    };

    // Binds functions
    vm.isDataAvailable = isDataAvailable;
    vm.addLessons = addLessons;
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
      return {
        'adults': participants.filter(function (p) {
          return p.age >= 18
            && !p.physicalDisability;
        }),
        'children': participants.filter(function (p) {
          return p.age < 18
            && p.age >= 6
            && !p.physicalDisability;
        }),
        'mini': participants.filter(function (p) {
          return p.age < 6
            && p.age >= 3
            && !p.physicalDisability;
        }),
        'normal': participants.filter(function (p) {
          return !p.physicalDisability;
        }),
        'disabled': participants.filter(function (p) {
          return p.physicalDisability;
        }),
      };
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
      let results = angular.copy(vm.results);
      filterEmptyLessons(results.lessons);

      return results;
    }

    function filterEmptyLessons(lessons) {
      lessons.group.adults = filterNonParticipantLessons(lessons.group.adults);
      lessons.group.children = filterNonParticipantLessons(lessons.group.children);
      lessons.group.mini = filterNonParticipantLessons(lessons.group.mini);
      lessons.private.lessons = filterNonParticipantLessons(lessons.private.lessons);

      for (let disabilityLessons of lessons.disability) {
        disabilityLessons.lessons = filterNonParticipantLessons(disabilityLessons.lessons);
      }
      lessons.disability = lessons.disability.filter((dl) => {
        return !_.isEmpty(dl.lessons);
      });

      return lessons;
    }

    function filterNonParticipantLessons(lessons) {
      return lessons.filter((l) => {
        return !_.isEmpty(l.participants);
      });
    }

    function addLessons(lessons) {
      vm.results.lessons = lessons;
    }

    function windowOnMessage(event) {
      // Checks the event origin to make sure it's from our site
      if (event.origin !== Wix.msgOrigin || !(event.data)) return;

      let message = event.data.msg;

      if (message === 'SEND_TRIP_DATA')
        return Wix.setData(event.data.msgData);

      if (message === 'GET_LESSONS_DATA') {
        return $window.parent.postMessage(
          {
            msg: 'LESSONS_DATA',
            results: vm.getResults()
          },
          '*'
        );
      }
    }
  }
})();
