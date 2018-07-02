(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .component('firstTimeLessonItem', {
      templateUrl: 'js/booking-lesson-app/lesson/first-time-lesson-item.html',
      controller: FirstTimeLessonItemController,
      bindings: {
        // variables
        dates: '<',
        lesson: '<',
        type: '<',

        // functions
        deleteLesson: '<',
        moveLessonGroupToPrivate: '<',
        moveLessonToGroup: '<',
      },
    });

  FirstTimeLessonItemController.$inject = [
    '_',
    'settings',
  ];

  function FirstTimeLessonItemController(_, settings) {
    let vm = this;

    this.$onInit = function () {
      vm.settings = settings;

      vm.participants = vm.lesson.participants;
      vm.popupMessage = `First-time lesson for ${vm.lesson.activity} is mandatory`;

      // Options for date picker
      vm.toggleDatePicker = false;
      vm.datePickerOptions = {
        maxDate: vm.dates[vm.dates.length - 1],
        minDate: vm.dates[0],
        initDate: vm.dates[0],
        showWeeks: false,
        startingDay: 1, // LN: 1 for Monday
      };

      // Binds function
      vm.isLessonPrivateOrDisability = isLessonPrivateOrDisability;
      vm.getParticipantsColumnCssClass = getParticipantsColumnCssClass;
      vm.getTimeOptions = getTimeOptions;
      vm.onDelete = onDelete;
      vm.onMove = onMove;
    };

    //////////

    function onDelete() {
      vm.deleteLesson(vm.lesson);
    }

    function onMove() {
      // Wonders if there is `movedFrom` property
      if (vm.lesson.hasOwnProperty('movedFrom')) {
        // If there is -> 2nd move from Private
        vm.moveLessonToGroup(vm.lesson);
      } else {
        // If has no movedFrom -> first move from Group
        vm.lesson.movedFrom = vm.type;
        vm.moveLessonGroupToPrivate(vm.lesson);
      }

      onDelete();
    }

    function getTimeOptions() {
      return isLessonMatchTypes(['group.adults'])
        ? settings.TIME_OPTIONS.filter((item) => item !== 'All day')
        : settings.TIME_OPTIONS;
    }

    function getParticipantsColumnCssClass() {
      return isLessonPrivateOrDisability() ? 'col-sm-5' : 'col-sm-6';
    }

    function isLessonPrivateOrDisability() {
      return isLessonMatchTypes(['private', 'disability']);
    }

    function isLessonGroup() {
      return isLessonMatchTypes([
        'group.adults',
        'group.children',
        'group.mini',
      ]);
    }

    function isLessonMatchTypes(types) {
      return types.indexOf(vm.type) > -1;
    }
  }
})();
