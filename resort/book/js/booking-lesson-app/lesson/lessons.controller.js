(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .controller('LessonsController', LessonsController);

    LessonsController.$inject = [
        '$scope',
        'moment',
        'Wix',
        'settings'
    ];

    function LessonsController($scope, moment, Wix, settings) {
        var vm = this;
        var subscription = Wix.subscribe(loadData);

        vm.data = {};
        vm.dates = [];
        vm.settings = settings;
        vm.lessonType = settings.LESSON_TYPES[0];
        vm.activityType = settings.ACTIVITY_TYPES[0];
        vm.results = {
            notes: {
                privateLesson: {
                    needSpecificInstructor: false,
                    instructorDescription: null,
                    specificRequirements: null
                },
                privateDisabledLesson: {
                    dwaMembership: null,
                    needSpecificInstructor: false,
                    instructorDescription: null,
                    specificRequirements: null
                }
            },
            lessons: []
        };

        // Binds functions
        vm.getAdultParticipants = getAdultParticipants;
        vm.isDataAvailable = isDataAvailable;
        vm.addLesson = addLesson;
        vm.deleteLesson = deleteLesson;
        vm.updateLessons = updateLessons;
        vm.getAdultLessons = getAdultLessons;
        vm.getChildrenLessons = getChildrenLessons;
        vm.getPrivateLessons = getPrivateLessons;
        vm.getPrivateDisabledLessons = getPrivateDisabledLessons;

        function loadData(_) {
            $scope.$apply(applyData);
        }

        function applyData() {
            vm.wix = Wix;
            vm.data = Wix.getData();
            vm.dates = buildDatesRange(vm.data.date.checkIn, vm.data.date.checkOut);
            vm.adultParticipants = getAdultParticipants(vm.data.participants);
            vm.childrenParticipants = getChildrenParticipants(vm.data.participants);

            updateLessons();
        }

        function isDataAvailable() {
            return !angular.equals(vm.data, {});
        }

        function getAdultParticipants(participants) {
            return participants.filter(function (p) {
                return p.age >= 18;
            });
        }

        function getChildrenParticipants(participants) {
            return participants.filter(function (p) {
                return p.age < 18;
            });
        }

        function updateLessons() {
            // Then, builds the lessons list based on the chosen type
            let lessons = [];

            // Builds children lessons
            for (let i = 0; i < settings.LESSON_TYPES_KEYS.length; i++) {
                let lesson = buildLessons(settings.LESSON_TYPES_KEYS[i]);
                lessons.push.apply(lessons, lesson);
            }

            vm.results.lessons = lessons;
        }

        function addLesson(lesson) {
            console.log('Add Lesson: ' + lesson);
            vm.results.lessons.push(lesson);
        }

        function deleteLesson(lesson) {
            let idx = vm.results.lessons.indexOf(lesson);

            if (idx < 0) {
                console.log('Cannot find lesson: ' + lesson);
                return;
            }

            console.log('Delete Lesson: ' + lesson);
            vm.results.lessons.splice(idx, 1);
        }

        function buildLessons(lessonType) {
            let lessons = [];
            for (let i = 0; i < vm.dates.length; i++) {
                let lesson = {
                    type: lessonType,
                    date: vm.dates[i],
                    isAM: true,
                    level: settings.ABILITY_LEVELS[0],
                    participants: []
                };

                lessons.push(lesson);
            }

            return lessons;
        }

        function getAdultLessons() {
            return vm.results.lessons.filter(function (l) {
                return l.type === 'groupAdult';
            });
        }

        function getChildrenLessons() {
            return vm.results.lessons.filter(function (l) {
                return l.type === 'groupChildren';
            });
        }

        function getPrivateLessons() {
            return vm.results.lessons.filter(function (l) {
                return l.type === 'private';
            });
        }

        function getPrivateDisabledLessons() {
            return vm.results.lessons.filter(function (l) {
                return l.type === 'privateDisabled';
            });
        }

        function buildDatesRange(fromDate, toDate) {
            let range = moment.range(fromDate, toDate);
            let dates = Array.from(range.by('day'));

            return dates.map(function (m) {
                return m.toDate();
            });
        }
    }
})();
