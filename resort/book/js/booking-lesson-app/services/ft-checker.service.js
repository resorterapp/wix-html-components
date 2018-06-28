(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('isParticipantFT', isParticipantFT);

  isParticipantFT.$inject = ['_', 'settings'];

  function isParticipantFT(_, settings) {

    return function (lesson, participant) {
      if (!lesson.isFirstLesson) return false;

      const activity = lesson.activity;

      // Doesn't need to care about non-main activities
      if (settings.ACTIVITY_TYPES.default.indexOf(activity) < 0) return false;

      // Handles Snowboarding first
      if (activity === 'Snowboard') {
        return participant.snowboardLevel <= 1;
      }

      // Now, the telemark/ski
      return participant.skiLevel <= 1 && participant.telemarkLevel <= 1;
    }
  }
})();
