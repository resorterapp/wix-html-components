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
            ]
        })
        .constant('moment', moment);
})();
