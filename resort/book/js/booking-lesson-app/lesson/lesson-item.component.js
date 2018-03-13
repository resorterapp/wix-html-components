(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('lessonItem', {
            templateUrl: 'js/booking-lesson-app/lesson/lesson-item.html',
            controller: LessonItemController,
            bindings: {
                date: '<',
                participants: '<'
            }
        });

    LessonItemController.$inject = ['settings'];

    function LessonItemController(settings) {
        var vm = this;

        vm.ABILITY_LEVELS = settings.ABILITY_LEVELS;
        vm.results = {
            date: vm.date,
            isAM: true,
            level: vm.ABILITY_LEVELS[0],
            participants: []
        };

        // Binds functions
        vm.getAmPm = getAmPm;
        vm.getAmPmCSSClass = getAmPmCSSClass;

        function getAmPm() {
            return vm.results.isAM ? 'AM' : 'PM';
        }

        function getAmPmCSSClass() {
            return vm.results.isAM ? 'btn-warning' : 'btn-primary';
        }
    }
})();
