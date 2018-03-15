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
            vm.getParticipantsColumnCssClass = getParticipantsColumnCssClass;
            vm.getTimeOptions = getTimeOptions;
            vm.onDelete = onDelete;

            checkParticipants(vm.participants);
        }

        function getTimeOptions() {
            if (['groupChildren', 'groupMini'].indexOf(vm.lesson.type) > -1) {
                return settings.TIME_OPTIONS;
            }

            return settings.TIME_OPTIONS.filter(function (item) {
                return item !== 'All day';
            });
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
