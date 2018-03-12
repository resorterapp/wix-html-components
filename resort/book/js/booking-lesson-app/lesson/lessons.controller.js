(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .controller('LessonsController', LessonsController);

    LessonsController.$inject = ['$scope', 'Wix'];

    function LessonsController($scope, Wix) {
        var vm = this;
        var subscription = Wix.subscribe(loadData);

        vm.data = {};
        vm.hasData = false;

        // Leson Types
        vm.LESSON_TYPES = [
            'Group',
            'Private',
            'Private (disabled)'
        ];
        vm.lessonType = vm.LESSON_TYPES[0];

        vm.ACTIVITY_TYPES = [
            'Ski',
            'Snowboard',
            'Telemark',
            'Snowmobiling',
            'Snowbiking',
            'Snowshoeing'
        ];
        vm.activityType = vm.ACTIVITY_TYPES[0];

        function loadData(_) {
            $scope.$apply(function () {
                vm.data = Wix.getData();
                vm.hasData = true;
            });
        }

        function isDataAvailable() {
            return !angular.equals(vm.data, {});
        }
    }
})();
