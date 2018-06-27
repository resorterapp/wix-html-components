(function () {
  'use strict';

  const EMPTY_RESULTS = {
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
  };

  angular
    .module('BookingLessonApp')
    .component('activityLessons', {
      templateUrl: 'js/booking-lesson-app/lesson/activity-lessons.html',
      controller: ActivityLessonsController,
      bindings: {
        // variables
        activities: '<',
        dates: '<',
        participants: '<',
        results: '<',
      },
    });

  ActivityLessonsController.$inject = [
    '_',
    'isParticipantFT',
    'settings',
    'Lesson',
  ];

  function ActivityLessonsController(_, isParticipantFT, settings, Lesson) {
    let vm = this;

    this.$onInit = onInit;

    function onInit() {
      vm.settings = settings;
      if (isResultsEmpty(vm.results)) {
        createAllLessons();
      }

      // Binds the functions
      vm.deleteLessonGroupAdults = deleteLessonGroupAdults;
      vm.deleteLessonGroupChildren = deleteLessonGroupChildren;
      vm.deleteLessonGroupMini = deleteLessonGroupMini;
      vm.deleteLessonPrivate = deleteLessonPrivate;
      vm.addLessonGroupAdults = addLessonGroupAdults;
      vm.addLessonGroupChildren = addLessonGroupChildren;
      vm.addLessonGroupMini = addLessonGroupMini;
      vm.addLessonPrivate = addLessonPrivate;
      vm.addDisabilityLessons = addDisabilityLessons;

      vm.isCollapsed = {
        group: false,
        private: false,
        disabled: false,
      };
    }

    ///////////

    function isResultsEmpty(results) {
      return angular.equals(results, EMPTY_RESULTS);
    }

    function createLessons(type) {
      return Lesson.newFromDates(type, vm.dates, 4, 'Ski');
    }

    function createAllLessons() {
      // LN Look for a better way to do this
      vm.results.private.lessons = createLessons('private.lessons');

      // Add FTs to group lessons
      const types = ['adults', 'children', 'mini'];

      for (const type of types) {
        let lessons = createLessons(`group.${type}`);
        let firstLesson = lessons[0];
        const fts = _.filter(vm.participants[type], p => isParticipantFT(firstLesson, p));

        firstLesson.participants = fts;
        vm.results.group[type] = lessons;
      }
    }

    function deleteLesson(lessonsList, lesson) {
      let idx = lessonsList.indexOf(lesson);

      if (idx < 0) return console.log('Cannot find lesson: ' + lesson);

      console.log('Delete lesson in: ' + lesson);
      lessonsList.splice(idx, 1);
    }

    function deleteLessonGroupAdults(lesson) {
      let lessonsList = vm.results.group.adults;
      return deleteLesson(lessonsList, lesson);
    }

    function deleteLessonGroupChildren(lesson) {
      let lessonsList = vm.results.group.children;
      return deleteLesson(lessonsList, lesson);
    }

    function deleteLessonGroupMini(lesson) {
      let lessonsList = vm.results.group.mini;
      return deleteLesson(lessonsList, lesson);
    }

    function deleteLessonPrivate(lesson) {
      let lessonsList = vm.results.private.lessons;
      return deleteLesson(lessonsList, lesson);
    }

    function addLessonToDate(lessonsList, date, type) {
      lessonsList.push(Lesson.createNew(type, date, 4, null));
    }

    function addLessonGroupAdults(date) {
      return addLessonToDate(vm.results.group.adults, date, 'group.adults');
    }

    function addLessonGroupChildren(date) {
      return addLessonToDate(vm.results.group.children, date, 'group.children');
    }

    function addLessonGroupMini(date) {
      return addLessonToDate(vm.results.group.mini, date, 'group.mini');
    }

    function addLessonPrivate(date) {
      return addLessonToDate(vm.results.private.lessons, date, 'private.lessons');
    }

    function addDisabilityLessons(results) {
      return vm.results.disability.push(results);
    }
  }
})();
