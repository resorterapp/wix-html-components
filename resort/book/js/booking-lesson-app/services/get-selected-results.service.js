(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('getSelectedResult', getSelectedResult);

  getSelectedResult.$inject = [
    '_',
  ];

  function getSelectedResult(_) {

    return function (results) {
      let selectedResults = angular.copy(results);

      filterEmptyLessons(selectedResults.lessons);

      return selectedResults;
    };

    function filterEmptyLessons(lessons) {
      lessons.group.adults = filterNonParticipantLessons(lessons.group.adults);
      lessons.group.children = filterNonParticipantLessons(lessons.group.children);
      lessons.group.mini = filterNonParticipantLessons(lessons.group.mini);
      lessons.private.lessons = filterNonParticipantLessons(lessons.private.lessons);

      for (let disabilityLessons of lessons.disability) {
        disabilityLessons.lessons = filterNonParticipantLessons(disabilityLessons.lessons);
      }
      lessons.disability = lessons.disability.filter((dl) => !_.isEmpty(dl.lessons));

      return lessons;
    }

    function filterNonParticipantLessons(lessons) {
      return lessons.filter((l) => !_.isEmpty(l.participants));
    }
  }
})();
