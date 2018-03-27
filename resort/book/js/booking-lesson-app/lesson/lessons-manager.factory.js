(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .factory('LessonsManager', LessonsManager);

    LessonsManager.$inject = [
        'settings'
    ];

    function LessonsManager(settings) {
        var vm = this;

        var lessons = {
            activityType: settings.ACTIVITY_TYPES[0],
            notes: {
                privateLesson: {
                    needSpecificInstructor: false,
                    instructorDescription: null,
                    specificRequirements: null
                },
                privateDisabledLesson: {
                    disabilityMembership: {
                        type: settings.DISABILITY_MEMBERSHIP_TYPES[0],
                        id: null
                    },
                    needSpecificInstructor: false,
                    instructorDescription: null,
                    specificRequirements: null
                }
            },
            lessons: []
        };
    }
})();
