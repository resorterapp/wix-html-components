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
        type: '<',
        participants: '<',

        // functions
        duplicateLesson: '<',
        deleteLesson: '<'
      }
    });

  LessonItemController.$inject = ['settings'];

  function LessonItemController(settings) {
    let vm = this;

    // Initialises
    this.$onInit = onInit;

    ///////////

    function onInit() {
      vm.settings = settings;

      // Binds functions
      vm.isLessonPrivate = isLessonPrivate;
      vm.getParticipantsColumnCssClass = getParticipantsColumnCssClass;
      vm.getTimeOptions = getTimeOptions;
      vm.onAddLesson = onAddLesson;
      vm.onDelete = onDelete;

      vm.participantCheckboxes = buildSpecificParticipantsList();
      vm.innerCounts = {
        pickedMinis: 0,
        pickedOthers: 0
      };

      vm.pickParticipant = pickParticipant;
      vm.disableParticipant = disableParticipant;
    }

    function getTimeOptions() {
      if (isGroupAdults()) {
        return settings.TIME_OPTIONS.filter((item) => {
          return item !== 'All day';
        });
      }

      return settings.TIME_OPTIONS;
    }

    function onDelete() {
      vm.deleteLesson(vm.lesson);
    }

    function getParticipantsColumnCssClass() {
      return isLessonPrivate() ? 'col-sm-5' : 'col-sm-6';
    }

    function isLessonPrivate() {
      return ['private', 'disability'].indexOf(vm.type) > -1;
    }

    function isGroupAdults() {
      return ['group.adults'].indexOf(vm.type) > -1;
    }

    function onAddLesson() {
      vm.duplicateLesson(vm.lesson);
    }

    function buildSpecificParticipantsList() {
      let participantCheckboxes = [];

      for (const participant of vm.participants) {
        participantCheckboxes.push({
          participant: participant,
          checked: false,
          disabled: false
        });
      }

      return participantCheckboxes;
    }

    function pickParticipant(pc) {
      pc.checked = !pc.checked;

      if (!isLessonPrivate()) return;

      let checkCount = pc.checked ? 1 : -1;

      if (pc.participant.age > 5) {
        vm.innerCounts.pickedOthers += checkCount;
      } else {
        vm.innerCounts.pickedMinis += checkCount;
      }

      for (let pc of vm.participantCheckboxes) {
        pc.disabled = disableParticipant(pc);
      }
    }

    function disableParticipant(pc) {
      // If this is mini, checks if others are picked
      if (pc.participant.age <= 5) {
        return vm.innerCounts.pickedOthers > 0;
      }

      return vm.innerCounts.pickedMinis > 0;
    }
  }
})();
