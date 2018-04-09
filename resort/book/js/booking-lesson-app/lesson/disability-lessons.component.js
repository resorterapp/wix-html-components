/**
 * Created by Luan Nguyen on 9/4/18
 */
(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .component('disabilityLessons', {
      templateUrl: 'js/booking-lesson-app/lesson/disability-lesson.html',
      controller: DisabilityLessons,
      bindings: {
        // Variables
        participant: '<',
        dates: '<',

        // Functions
        addToActivityLessons: '<'
      }
    });

  DisabilityLessons.$inject = ['settings', 'Lesson'];

  function DisabilityLessons(settings, Lesson) {
    let vm = this;
    const TYPE = 'disability.lessons';

    this.$onInit = onInit;

    function onInit() {
      vm.settings = settings;

      vm.participants = [vm.participant];
      vm.results = {
        person: vm.participant.title,
        instructor: {
          required: false,
          details: null
        },
        requests: null,
        lessons: []
      };

      vm.deleteLesson = deleteLesson;
      vm.duplicateLesson = duplicateLesson;

      vm.results.lessons = createLessons();

      vm.addToActivityLessons(vm.results);
    }

    function createLessons() {
      return Lesson.newFromDates(TYPE, vm.dates, 2);
    }

    function deleteLesson(lesson) {
      let idx = vm.results.lessons.indexOf(lesson);

      if (idx < 0) return console.log('Cannot find lesson: ' + lesson);

      console.log('Delete lesson in: ' + lesson);
      vm.results.lessons.splice(idx, 1);
    }

    function duplicateLesson(lesson) {
      let copiedLesson = Lesson.copy(lesson);

      // Empty the participants list
      copiedLesson.participants = [];

      vm.results.lessons.push(copiedLesson);
    }
  }
})();