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
      vm.duplicateLessonGroupAdults = duplicateLessonGroupAdults;
      vm.duplicateLessonGroupChildren = duplicateLessonGroupChildren;
      vm.duplicateLessonGroupMini = duplicateLessonGroupMini;
      vm.duplicateLessonPrivate = duplicateLessonPrivate;
      vm.addDisabilityLessons = addDisabilityLessons;
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

    function duplicateLesson(lessonsList, lesson) {
      let copiedLesson = Lesson.copy(lesson);

      // Empty the participants list
      copiedLesson.participants = [];

      lessonsList.push(copiedLesson);
    }

    function duplicateLessonGroupAdults(lesson) {
      let lessonsList = vm.results.group.adults;
      return duplicateLesson(lessonsList, lesson);
    }

    function duplicateLessonGroupChildren(lesson) {
      let lessonsList = vm.results.group.children;
      return duplicateLesson(lessonsList, lesson);
    }

    function duplicateLessonGroupMini(lesson) {
      let lessonsList = vm.results.group.mini;
      return duplicateLesson(lessonsList, lesson);
    }

    function duplicateLessonPrivate(lesson) {
      let lessonsList = vm.results.private.lessons;
      return duplicateLesson(lessonsList, lesson);
    }

    function addDisabilityLessons(results) {
      return vm.results.disability.push(results);
    }
  }
})();
