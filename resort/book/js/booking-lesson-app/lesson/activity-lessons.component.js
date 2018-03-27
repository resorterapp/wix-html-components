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
        var vm = this;

        this.$onInit = onInit;

        function onInit() {
            vm.settings = settings;

            vm.results = {
                activity: vm.activity,
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
            vm.deleteLessonGroupAdults = deleteLessonGroupAdults;
            vm.deleteLessonGroupChildren = deleteLessonGroupChildren;
            vm.deleteLessonGroupMini = deleteLessonGroupMini;
            vm.deleteLessonPrivate = deleteLessonPrivate;
            vm.deleteLessonDisability = deleteLessonDisability;
        }

        function createLessons(type) {
            let lessons = [];

            for (let i = 0; i < vm.dates.length; i++) {
                lessons.push(Lesson(type, vm.dates[i], 4, settings));
            }

            return lessons;
        }

        function createAllLessons() {
            // LN Look for a better way to do this
            vm.results.lessons.group.adults = createLessons('group.adults');
            vm.results.lessons.group.children = createLessons('group.children');
            vm.results.lessons.group.mini = createLessons('group.mini');
            vm.results.lessons.private.lessons = createLessons('private.lessons');
            vm.results.lessons.disability.lessons = createLessons('disability.lessons');
        }

        function deleteLesson(lessonsList, lesson) {
            let idx = lessonsList.indexOf(lesson);

            if (idx < 0) return console.log('Cannot find lesson: ' + lesson);

            console.log('Delete lesson in: ' + lesson);
            lessonsList.splice(idx, 1);
        }

        function deleteLessonGroupAdults(lesson) {
            let lessonsList = vm.results.lessons.group.adults;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonGroupChildren(lesson) {
            let lessonsList = vm.results.lessons.group.children;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonGroupMini(lesson) {
            let lessonsList = vm.results.lessons.group.mini;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonPrivate(lesson) {
            let lessonsList = vm.results.lessons.private.lessons;
            return deleteLesson(lessonsList, lesson);
        }

        function deleteLessonDisability(lesson) {
            let lessonsList = vm.results.lessons.disability.lessons;
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
