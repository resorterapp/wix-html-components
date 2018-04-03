(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .constant('settings', {
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
      ABILITY_LEVELS: [
        'Yellow',
        'Green (Light)',
        'Green (Dark)',
        'Blue (Light)',
        'Blue (Dark)',
        'Black (Light)',
        'Black (Dark)'
      ],
      YES_NO_OPTIONS: [
        {name: 'Yes', value: true},
        {name: 'No', value: false}
      ],
      LESSON_TYPES_KEYS: [
        'groupAdult',
        'groupChildren',
        'groupMini',
        'private',
        'privateDisabled'
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
      ],
      DISABILITY_MEMBERSHIP_TYPES: [
        'DWA',
        'DSUSA'
      ]
    })
    .constant('moment', moment)
    .constant('uuid', uuid)
    .constant('_', window._);
})();
