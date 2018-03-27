(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .controller('LessonsController', LessonsController);

    LessonsController.$inject = [
        '$scope',
        'moment',
        '_',
        'Wix',
        'settings'
    ];

    function LessonsController($scope, moment, _, Wix, settings) {
        var vm = this;
        var subscription = Wix.subscribe(loadData);

        vm.data = {};
        vm.dates = [];
        vm.settings = settings;
        vm.activitiesList = settings.ACTIVITY_TYPES;
        vm.currentActivity = settings.ACTIVITY_TYPES[0];
        vm.results = {};

        // Binds functions
        vm.isDataAvailable = isDataAvailable;
        vm.getResults = getResults;

        function loadData(_) {
            $scope.$apply(applyData);
        }

        function applyData() {
            vm.wix = Wix;
            vm.data = Wix.getData();
            vm.dates = buildDatesRange(vm.data.date.checkIn, vm.data.date.checkOut);
            vm.activitiesList = buildActivitiesList(vm.data.participants);
            vm.participants = buildParticipantsList(vm.data.participants);
        }

        function isDataAvailable() {
            return !angular.equals(vm.data, {});
        }

        function buildParticipantsList(participants) {
            return {
                'adults': participants.filter(function (p) {
                    return p.age >= 18
                        && !p.disabled;
                }),
                'children': participants.filter(function (p) {
                    return p.age < 18
                        && p.age >= 6
                        && !p.disabled;
                }),
                'mini': participants.filter(function (p) {
                    return p.age < 6
                        && p.age >= 3
                        && !p.disabled;
                }),
                'normal': participants.filter(function (p) {
                    return !p.disabled;
                }),
                'disabled': participants.filter(function (p) {
                    return p.disabled;
                }),
            };
        }

        function buildActivitiesList(participants) {
            let activities = [];

            for (let i = 0; i < participants.length; i++) {
                let participant = participants[i];

                if (participant['Ski Level']) activities.push('Ski');
                if (participant['Snowboard Level']) activities.push('Snowboard');
                if (participant['Telemark Level']) activities.push('Telemark');
            }

            return _.uniq(activities);
        }

        function buildDatesRange(fromDate, toDate) {
            let range = moment.range(fromDate, toDate);
            let dates = Array.from(range.by('day'));

            return dates.map(function (m) {
                return m.toDate();
            });
        }

        function getResults() {
            // Copies the original results object
            let results = Object.assign({}, vm.results);

            // Filters the lessons to have only those with participants
            results.lessons = results.lessons.filter(function (l) {
                return l.participants.length;
            });

            return results;
        }
    }
})();
