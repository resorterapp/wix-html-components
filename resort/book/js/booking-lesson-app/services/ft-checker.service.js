(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('isParticipantFT', isParticipantFT);

  isParticipantFT.$inject = ['_', 'settings'];

  function isParticipantFT(_, settings) {

    const MIN_NON_FT_LEVEL = 2;

    // return function (lesson, participant) {
    //   if (!lesson.isFirstLesson) return false;
    //
    //   const activity = lesson.activity;
    //
    //   // Doesn't need to care about non-main activities
    //   if (settings.ACTIVITY_TYPES.default.indexOf(activity) < 0) return false;
    //
    //   // Handles Snowboarding first
    //   if (activity === 'Snowboard') {
    //     return participant.snowboardLevel <= 1;
    //   }
    //
    //   // Now, the telemark/ski
    //   return participant.skiLevel <= 1 && participant.telemarkLevel <= 1;
    // }

    return function (participant) {
      return participant.skiLevel < MIN_NON_FT_LEVEL
        && participant.snowboardLevel < MIN_NON_FT_LEVEL
        && participant.telemarkLevel < MIN_NON_FT_LEVEL;
    };
  }
})();
