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

        // Registers this as the listener of Wix event
        var subscription = Wix.subscribe(loadData);

        vm.data = {};
        vm.dates = [];
        vm.settings = settings;
        vm.activitiesList = settings.ACTIVITY_TYPES;
        vm.currentActivity = settings.ACTIVITY_TYPES[0];
        vm.results = {
            _originURL: null,
            activityLessons: []
        };

        // Binds functions
        vm.isDataAvailable = isDataAvailable;
        vm.addActivityLessons = addActivityLessons;
        vm.getResults = getResults;

        function loadData(_) {
            $scope.$apply(applyData);
        }

        function applyData() {
            vm.wix = Wix;
            vm.results._originURL = Wix.msgOrigin;
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
                        && !p.physicalDisability;
                }),
                'children': participants.filter(function (p) {
                    return p.age < 18
                        && p.age >= 6
                        && !p.physicalDisability;
                }),
                'mini': participants.filter(function (p) {
                    return p.age < 6
                        && p.age >= 3
                        && !p.physicalDisability;
                }),
                'normal': participants.filter(function (p) {
                    return !p.physicalDisability;
                }),
                'disabled': participants.filter(function (p) {
                    return p.physicalDisability;
                }),
            };
        }

        function buildActivitiesList(participants) {
            let activities = [];

            for (let i = 0; i < participants.length; i++) {
                let participant = participants[i];

                if (participant.skiLevel && participant.skiLevel !== 'None') activities.push('Ski');
                if (participant.snowboardLevel && participant.snowboardLevel !== 'None') activities.push('Snowboard');
                if (participant.telemarkLevel && participant.telemarkLevel !== 'None') activities.push('Telemark');
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
            return vm.results;
        }

        function addActivityLessons(activityLessons) {
            vm.results.activityLessons.push(activityLessons);
        }
    }
})();
