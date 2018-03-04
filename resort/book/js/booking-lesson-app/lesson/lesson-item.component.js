(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('lessonItem', {
            templateUrl: 'js/booking-lesson-app/lesson/lesson-item.html',
            controller: LessonItemController,
            bindings: {
                date: '<'

            }
        });

    function LessonItemController() {
        var ctrl = this;

        ctrl.isAM = true;
        ctrl.getAmPm = getAmPm;
        ctrl.getAmPmCSSClass = getAmPmCSSClass;
        ctrl.level = 'Yellow';
        ctrl.participants = [];

        function getAmPm() {
            return ctrl.isAM ? 'AM' : 'PM';
        }

        function getAmPmCSSClass() {
            return ctrl.isAM ? 'btn-warning' : 'btn-primary';
        }
    }
})();
