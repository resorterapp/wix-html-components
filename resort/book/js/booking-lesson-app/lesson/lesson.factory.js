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
            new: createNew,
            build: build,
            copy: copy
        };

        function build(date, duration, level, participants, time) {
            return {
                uuid: uuid.v4(),
                date: date,
                duration: duration,
                level: level,
                participants: participants,
                time: time
            };
        }

        function createNew(type, date, duration) {
            return build(
                date,
                duration,
                settings.ABILITY_LEVELS[0],
                [],
                settings.TIME_OPTIONS[isGroup(type) ? 1 : 0]
            );
        }

        function isGroup(type) {
            return type.indexOf('group') > -1;
        }

        function copy(lesson) {
            let copiedLesson = angular.copy(lesson);

            // Fixes the ID
            copiedLesson.uuid = uuid.v4();

            return copiedLesson;
        }
    }
})();
