(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('lessonItem', {
            templateUrl: 'js/booking-lesson-app/lesson/lesson-item.html',
            controller: LessonItemController,
            bindings: {
                // variables
                lesson: '<',
                participants: '<',

                // functions
                deleteLesson: '<'
            }
        });

    LessonItemController.$inject = ['settings'];

    function LessonItemController(settings) {
        var vm = this;

        // Initialises
        this.$onInit = onInit;

        function onInit() {
            vm.settings = settings;

            // Binds functions
            vm.getAmPm = getAmPm;
            vm.getAmPmCSSClass = getAmPmCSSClass;
            vm.getParticipantsColumnCssClass = getParticipantsColumnCssClass;
            vm.onDelete = onDelete;
        }

        function getAmPm() {
            return vm.lesson.isAM ? 'AM' : 'PM';
        }

        function getAmPmCSSClass() {
            return vm.lesson.isAM ? 'btn-warning' : 'btn-primary';
        }

        function onDelete() {
            vm.deleteLesson(vm.lesson);
        }

        function getParticipantsColumnCssClass() {
            return vm.lesson.type === 'private' || vm.lesson.type === 'privateDisabled'
                ? 'col-sm-4' : 'col-sm-6';
        }
    }
})();
