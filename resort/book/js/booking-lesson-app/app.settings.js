/**
 * Created by tklarryonline on Apr 05, 2018.
 */

(function () {
  'use strict';

  const SETTINGS = {
      LESSON_TYPES: [
        'Group',
        'Private',
        'Private (disabled)'
      ],
      ACTIVITY_TYPES: [
        'Ski',
        'Snowboard',
        'Telemark',
        'Snowmobiling',
        'Snowbiking',
        'Snowshoeing'
      ],
      YES_NO_OPTIONS: [
        {name: 'Yes', value: true},
        {name: 'No', value: false}
      ],
      DURATION_OPTIONS: [
        {value: 1, name: '1hr'},
        {value: 2, name: '2hrs'},
        {value: 3, name: '3hrs'},
        {value: 4, name: '4hrs'},
        {value: 5, name: '5hrs'},
        {value: 6, name: '6hrs'},
        {value: 7, name: '7hrs'},
      ],
      TIME_OPTIONS: [
        'AM',
        'PM',
        'All day'
      ]
    };

  angular
    .module('BookingLessonApp')
    .constant('settings', SETTINGS);
})();
