(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('isParticipantFT', isParticipantFT);

  function isParticipantFT() {
    const MIN_NON_FT_LEVEL = 2;

    return function (participant) {
      return participant.skiLevel < MIN_NON_FT_LEVEL
        && participant.snowboardLevel < MIN_NON_FT_LEVEL
        && participant.telemarkLevel < MIN_NON_FT_LEVEL;
    };
  }
})();
