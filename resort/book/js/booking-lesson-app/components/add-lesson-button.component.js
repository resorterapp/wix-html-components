/**
 * Created by Luan Nguyen on 23/4/18
 */
(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .component('addLessonButton', {
      templateUrl: 'js/booking-lesson-app/components/add-lesson-button.html',
      controller: AddLessonButtonController,
      bindings: {
        // variables
        dates: '<',

        // functions
        addLessonToDate: '<'
      }
    });

  AddLessonButtonController.$inject = ['settings'];

  function AddLessonButtonController(settings) {
    let vm = this;

    this.$onInit = onInit;

    function onInit() {
      vm.settings = settings;
      vm.toggleDatePicker = false;
      vm.pickedDate = null;
      vm.datePickerOptions = {
        maxDate: vm.dates[vm.dates.length - 1],
        minDate: vm.dates[0],
        initDate: vm.dates[0],
        showWeeks: false,
        startingDay: 1 // LN For Monday
      };

      // Functions
      vm.pickedDateChange = pickedDateChange;
    }

    function pickedDateChange(value) {
      if (value == null) return;

      vm.addLessonToDate(value);
      vm.pickedDate = null;
    }
  }
})();
