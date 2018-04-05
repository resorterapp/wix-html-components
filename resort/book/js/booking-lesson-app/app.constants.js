(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .constant('moment', moment)
    .constant('uuid', uuid)
    .constant('_', window._);
})();
