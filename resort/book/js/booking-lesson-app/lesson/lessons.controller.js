function buildDatesRange(fromDate, toDate) {
    let range = moment.range(fromDate, toDate);
    let dates = Array.from(range.by('day'));

    return dates.map(function (m) {
        return m.toDate();
    });
}

(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .controller('LessonsController', LessonsController);

    LessonsController.$inject = ['$scope', 'Wix', 'settings'];

    function LessonsController($scope, Wix, settings) {
        var vm = this;
        var subscription = Wix.subscribe(loadData);

        vm.data = {};
        vm.dates = [];
        vm.settings = settings;
        vm.lessonType = settings.LESSON_TYPES[0];
        vm.activityType = settings.ACTIVITY_TYPES[0];

        // Binding functions
        vm.getAdultParticipants = getAdultParticipants;
        vm.isDataAvailable = isDataAvailable;

        function loadData(_) {
            $scope.$apply(applyData);
        }

        function applyData() {
            vm.data = Wix.getData();
            vm.dates = buildDatesRange(vm.data.date.checkIn, vm.data.date.checkOut);
            vm.adultParticipants = getAdultParticipants(vm.data.participants);
            vm.childrenParticipants = getChildrenParticipants(vm.data.participants);
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
    }
})();
