(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('activityLessons', {
            templateUrl: 'js/booking-lesson-app/lesson/activity-lessons.html',
            controller: ActivityLessonsController,
            bindings: {
                // variables
                activity: '<',
                dates: '<',
                participants: '<',

                // functions
                addActivityLessons: '<'
            }
        });

    ActivityLessonsController.$inject = ['settings'];

    function ActivityLessonsController(settings) {
        var self = this;
        var results = {
            activity: self.activity,
            lessons: {
                group: {
                    adults: [],
                    children: [],
                    mini: [],
                },
                private: {
                    instructor: null,
                    requests: null,
                    lessons: []
                },
                disability: {
                    membership: {
                        type: settings.DISABILITY_MEMBERSHIP_TYPES[0],
                        id: null
                    },
                    instructor: null,
                    requests: null,
                    lessons: []
                },
            }
        };

        this.$onInit = onInit;

        function onInit() {
            self.settings = settings;

            createAllLessons();
            self.results = results;
        }

        function createLessons(type) {
            let lessons = [];

            for (let i = 0; i < self.dates.length; i++) {
                lessons.push(Lesson(type, self.dates[i], 4, settings));
            }

            return lessons;
        }

        function createAllLessons() {
            // LN Look for a better way to do this
            results.lessons.group.adults = createLessons('group.adults');
            results.lessons.group.children = createLessons('group.children');
            results.lessons.group.mini = createLessons('group.mini');
            results.lessons.private.lessons = createLessons('private.lessons');
            results.lessons.disability.lessons = createLessons('disability.lessons');
        }

        function deleteLesson(type) {
            let lessonsList = getLessonsList(type);

            return function (lesson) {
                let idx = lessonsList.indexOf(lesson);

                if (idx < 0) return console.log('Cannot find lesson in ' + type + ': ' + lesson);

                console.log('Delete lesson in ' + type + ': ' + lesson);
                lessonsList.splice(idx, 1);
            }
        }

        function getLessonsList(type) {
            let keys = type.split('.');
            return results.lessons[keys[0]][keys[1]];
        }
    }

    function Lesson(type, date, duration, settings) {

        return build();

        function build() {
            let lesson = {
                date: date,
                duration: duration,
                level: settings.ABILITY_LEVELS[0],
                participants: []
            };

            lesson.time = settings.TIME_OPTIONS[isGroup() ? 1 : 0];

            return lesson;
        }

        function isGroup() {
            return type.indexOf('group') > -1;
        }
    }
})();
