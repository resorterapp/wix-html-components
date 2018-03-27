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

        this.$onInit = onInit;

        function onInit() {
            self.settings = settings;

            self.results = {
                activity: self.activity,
                lessons: {
                    group: {
                        adults: [],
                        children: [],
                        mini: [],
                    },
                    private: {
                        instructor: {
                            required: false,
                            details: null
                        },
                        requests: null,
                        lessons: []
                    },
                    disability: {
                        membership: {
                            type: settings.DISABILITY_MEMBERSHIP_TYPES[0],
                            id: null
                        },
                        instructor: {
                            required: false,
                            details: null
                        },
                        requests: null,
                        lessons: []
                    },
                }
            };
            createAllLessons();

            // Binds the functions
            self.deleteLessonGroupAdults = deleteLessonGroupAdults;
            self.deleteLessonGroupChildren = deleteLessonGroupChildren;
            self.deleteLessonGroupMini = deleteLessonGroupMini;
            self.deleteLessonPrivate = deleteLessonPrivate;
            self.deleteLessonDisability = deleteLessonDisability;
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
            self.results.lessons.group.adults = createLessons('group.adults');
            self.results.lessons.group.children = createLessons('group.children');
            self.results.lessons.group.mini = createLessons('group.mini');
            self.results.lessons.private.lessons = createLessons('private.lessons');
            self.results.lessons.disability.lessons = createLessons('disability.lessons');
        }

        function deleteLesson(lessonsList, lesson) {
            let idx = lessonsList.indexOf(lesson);

            if (idx < 0) return console.log('Cannot find lesson: ' + lesson);

            console.log('Delete lesson in: ' + lesson);
            lessonsList.splice(idx, 1);
        }

        function deleteLessonGroupAdults(lesson) {
            let lessonsList = self.results.lessons.group.adults;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonGroupChildren(lesson) {
            let lessonsList = self.results.lessons.group.children;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonGroupMini(lesson) {
            let lessonsList = self.results.lessons.group.mini;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonPrivate(lesson) {
            let lessonsList = self.results.lessons.private.lessons;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonDisability(lesson) {
            let lessonsList = self.results.lessons.disability.lessons;
            return deleteLesson(lessonsList, lesson);
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
