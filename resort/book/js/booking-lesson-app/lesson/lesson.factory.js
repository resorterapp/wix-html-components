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

    function build(date, duration, participants, time) {
      return {
        uuid: uuid.v4(),
        date: date,
        duration: duration,
        participants: participants,
        time: time
      };
    }

    function createNew(type, date, duration) {
      return build(
        date,
        duration,
        [],
        settings.TIME_OPTIONS[1]
      );
    }

    function createNewFromDates(type, dates, duration) {
      let lessons = [];

      for (let date of dates) {
        lessons.push(createNew(type, date, duration));
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
