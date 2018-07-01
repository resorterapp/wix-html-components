(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('Lesson', Lesson);

  Lesson.$inject = [
    '_',
    'uuid',
    'settings',
  ];

  function Lesson(_, uuid, settings) {

    // Default duration in hours
    const DEFAULT_DURATION = 4;

    return {
      createNew: createNew,
      newFromDates: newFromDates,
      copy: copy,
    };

    //////////

    function build(date, duration, participants, time, activity, isFirstTimeLesson) {
      return {
        uuid: uuid.v4(),
        date: date,
        time: time,
        duration: duration,
        activity: activity,
        participants: participants,
        isFirstTimeLesson: isFirstTimeLesson || false,
      };
    }

    function createNew(date, duration, activity) {
      return build(
        date,
        duration,
        [],
        settings.TIME_OPTIONS[1],
        activity,
      );
    }

    function newFromDates(dates, duration, activity) {
      return _.map(dates, date => createNew(date, duration, activity));
    }

    function copy(lesson) {
      let copiedLesson = angular.copy(lesson);

      // Fixes the ID
      copiedLesson.uuid = uuid.v4();

      return copiedLesson;
    }
  }
})();
