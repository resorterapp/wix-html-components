(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('dropdown', {
            templateUrl: 'js/booking-lesson-app/components/dropdown.html',
            controller: DropdownController,
            bindings: {
                items: '<'
            }
        });

    function DropdownController($element) {
        var ctrl = this;

        ctrl.selected = ctrl.items[0];

        ctrl.$postlink = function () {
            // $element.addClass(ctrl.)
        }
    }
})();
