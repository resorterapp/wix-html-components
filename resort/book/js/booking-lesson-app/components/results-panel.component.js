/**
 * Created by tklarryonline on Apr 03, 2018.
 */

(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .component('resultsPanel', {
      templateUrl: 'js/booking-lesson-app/components/results-panel.html',
      bindings: {
        results: '<'
      }
    });
})();
