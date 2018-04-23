(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('Lesson', Lesson);

  Lesson.$inject = [
    'uuid',
    'settings'
  ];

  function Lesson(uuid, settings) {

    return {
      newFromDates: createNewFromDates,
      copy: copy
    };

    function build(date, duration, participants, time, activity) {
      return {
        uuid: uuid.v4(),
        date: date,
        duration: duration,
        participants: participants,
        time: time,
        activity: activity
      };
    }

    function createNew(type, date, duration, activity) {
      return build(
        date,
        duration,
        [],
        settings.TIME_OPTIONS[1],
        activity
      );
    }

    function createNewFromDates(type, dates, duration, activity) {
      let lessons = [];

      for (let date of dates) {
        lessons.push(createNew(type, date, duration, activity));
      }

      return lessons;
    }

    function copy(lesson) {
      let copiedLesson = angular.copy(lesson);

      // Fixes the ID
      copiedLesson.uuid = uuid.v4();

      return copiedLesson;
    }
  }
})();
