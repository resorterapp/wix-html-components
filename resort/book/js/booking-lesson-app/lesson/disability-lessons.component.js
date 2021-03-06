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
        results: '<',
        activities: '<',
        participant: '<',
        dates: '<',
      },
    });

  DisabilityLessons.$inject = [
    '_',
    'settings',
    'ActivitiesFilterService',
    'Lesson',
  ];

  function DisabilityLessons(_, settings, ActivitiesFilterService, Lesson) {
    let vm = this;
    const DEFAULT_DURATION = 2;

    this.$onInit = onInit;

    function onInit() {
      vm.settings = settings;
      vm.participants = [vm.participant];

      vm.deleteLesson = deleteLesson;
      vm.addLesson = addLesson;

      if (!_.isEmpty(vm.results.lessons)) return;

      vm.results.lessons = createLessons();
    }

    function createLessons() {
      let lessons = Lesson.newFromDates(vm.dates, DEFAULT_DURATION);

      // The first lesson is a FT lesson if the candidate is FT
      if (vm.participant.isFirstTimer) {
        // removes the first "normal" lesson since we will replace it with FT lessons
        lessons = lessons.slice(1);

        const activities = ActivitiesFilterService.filter(settings.ACTIVITY_TYPES.default, [vm.participant]);

        for (const activity of activities) {
          let ftLesson = Lesson.build(
            vm.dates[0],
            DEFAULT_DURATION,
            [vm.participant],
            settings.TIME_OPTIONS[1],
            activity,
            true,
          );

          lessons.push(ftLesson);
        }
      }

      return lessons;
    }

    function deleteLesson(lesson) {
      let idx = vm.results.lessons.indexOf(lesson);

      if (idx < 0) return console.log('Cannot find lesson: ' + lesson);

      console.log('Delete lesson in: ' + lesson);
      vm.results.lessons.splice(idx, 1);
    }

    function addLesson(date) {
      vm.results.lessons.push(Lesson.createNew(date, DEFAULT_DURATION, null));
    }
  }
})();
