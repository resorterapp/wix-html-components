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
            // Empties the lessons list when the type is changed
            vm.results.lessons = [];

            // Then, builds the lessons list based on the chosen type
            switch (vm.lessonType) {
                case 'Group':
                    let lessons = buildLessons('GroupAdult');
                    let childrenLessons = buildLessons('GroupChildren');
                    lessons.push.apply(lessons, childrenLessons);

                    vm.results.lessons = lessons;
                    break;
                case 'Private':
                    vm.results.lessons = buildLessons('Private');
                    break;
                case 'Private (disabled)':
                    vm.results.lessons = buildLessons('Private (disabled)');
                    break;
            }
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
                return l.type === 'GroupAdult';
            });
        }

        function getChildrenLessons() {
            return vm.results.lessons.filter(function (l) {
                return l.type === 'GroupChildren';
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
