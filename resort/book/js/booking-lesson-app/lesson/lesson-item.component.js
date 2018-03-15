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
            vm.isLessonPrivate = isLessonPrivate;
            vm.getAmPm = getAmPm;
            vm.getAmPmCSSClass = getAmPmCSSClass;
            vm.getParticipantsColumnCssClass = getParticipantsColumnCssClass;
            vm.onDelete = onDelete;

            checkParticipants(vm.participants);
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
            return isLessonPrivate() ? 'col-sm-4' : 'col-sm-6';
        }

        function checkParticipants(participants) {
            if (participants.length !== 1) return;

            vm.lesson.participants = participants;
        }

        function isLessonPrivate() {
            return ['private', 'privateDisabled'].indexOf(vm.lesson.type) !== -1;
        }
    }
})();
