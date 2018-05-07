(function () {
  'use strict';

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

        // functions
        addLessons: '<'
      }
    });

  ActivityLessonsController.$inject = [
    'settings',
    'Lesson',
    'AnchorSmoothScroll'
  ];

  function ActivityLessonsController(settings, Lesson, AnchorSmoothScroll) {
    let vm = this;

    this.$onInit = onInit;

    function onInit() {
      vm.settings = settings;

      vm.results = {
        group: {
          adults: [],
          children: [],
          mini: [],
        },
        private: {
          instructor: {
            required: false,
            details: null
          },
          requests: null,
          lessons: []
        },
        disability: [],
      };
      createAllLessons();
      vm.addLessons(vm.results);

      // Binds the functions
      vm.scrollTo = scrollTo;
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
        disabled: false
      };
    }

    function createLessons(type) {
      return Lesson.newFromDates(type, vm.dates, 4, null);
    }

    function createAllLessons() {
      // LN Look for a better way to do this
      vm.results.group.adults = createLessons('group.adults');
      vm.results.group.children = createLessons('group.children');
      vm.results.group.mini = createLessons('group.mini');
      vm.results.private.lessons = createLessons('private.lessons');
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

    function scrollTo(elementID) {
      AnchorSmoothScroll.scrollTo(elementID);
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
