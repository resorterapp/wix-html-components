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
    vm.activitiesList = settings.ACTIVITY_TYPES;
    vm.currentActivity = settings.ACTIVITY_TYPES[0];
    vm.results = {
      _originURL: null,
      activityLessons: []
    };

    // Binds functions
    vm.isDataAvailable = isDataAvailable;
    vm.addActivityLessons = addActivityLessons;
    vm.getResults = getResults;

    function loadData(_) {
      $scope.$apply(applyData);
    }

    function applyData() {
      vm.wix = Wix;
      vm.results._originURL = Wix.msgOrigin;
      vm.data = Wix.getData();
      vm.dates = buildDatesRange(vm.data.date.checkIn, vm.data.date.checkOut);
      vm.activitiesList = buildActivitiesList(vm.data.participants);
      vm.participants = buildParticipantsList(vm.data.participants);
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

    function buildActivitiesList(participants) {
      let activities = [];

      for (let i = 0; i < participants.length; i++) {
        let participant = participants[i];

        if (participant.skiLevel && participant.skiLevel !== 'None') activities.push('Ski');
        if (participant.snowboardLevel && participant.snowboardLevel !== 'None') activities.push('Snowboard');
        if (participant.telemarkLevel && participant.telemarkLevel !== 'None') activities.push('Telemark');
      }

      return _.uniq(activities);
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
     *
     * @returns {{msg: string, results: {_originURL: null, activityLessons: Array}}}
     */
    function getResults() {
      let results = angular.copy(vm.results);
      let activityLessonsList = results.activityLessons;

      // Filters the empty lessons
      for (let activityLessons of activityLessonsList) {
        let lessons = filterEmptyLessons(activityLessons.lessons);

        // Filters the lesson sections that have no lessons (because filtered above)
        const types = _.keys(lessons.group);
        for (const type of types) {
          if (_.isEmpty(lessons.group[type]))
            delete lessons.group[type];
        }

        if (_.isEmpty(lessons.group))
          delete lessons.group;

        if (_.isEmpty(lessons.private.lessons))
          delete lessons.private;

        if (_.isEmpty(lessons.disability.lessons))
          delete lessons.disability;
      }

      results.activityLessons = activityLessonsList.filter((al) => {
        return !_.isEmpty(al.lessons);
      });

      return results;
    }

    function filterEmptyLessons(lessons) {
      lessons.group.adults = filterNonParticipantLessons(lessons.group.adults);
      lessons.group.children = filterNonParticipantLessons(lessons.group.children);
      lessons.group.mini = filterNonParticipantLessons(lessons.group.mini);
      lessons.private.lessons = filterNonParticipantLessons(lessons.private.lessons);
      lessons.disability.lessons = filterNonParticipantLessons(lessons.disability.lessons);

      return lessons;
    }

    function filterNonParticipantLessons(lessons) {
      return lessons.filter((l) => {
        return !_.isEmpty(l.participants);
      });
    }

    function addActivityLessons(activityLessons) {
      vm.results.activityLessons.push(activityLessons);
    }

    function windowOnMessage(event) {
      // Checks the event origin to make sure it's from our site
      if (event.origin !== Wix.msgOrigin || !(event.data)) return;

      let message = event.data.msg;

      if (message === 'SEND_TRIP_DATA') return Wix.setData(event.data.msgData);

      if (message === 'GET_LESSONS_DATA')
        return $window.parent.postMessage(
          {
            msg: 'LESSONS_DATA',
            results: vm.getResults()
          },
          '*'
        );
    }
  }
})();
