/**
 * Created by Luan Nguyen on 30/5/18
 */
(NoLessonComponent)();

function NoLessonComponent() {
  'use strict';

  angular
    .module('BookingLessonApp')
    .component('noLesson', {
      templateUrl: 'js/booking-lesson-app/components/no-lesson.html',
      bindings: {
        // variables
        lessons: '<',
      }
    });
}
