(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('activityLessons', {
            templateUrl: 'js/booking-lesson-app/lesson/activity-lessons.html',
            controller: ActivityLessonsController,
            bindings: {
                // variables
                activity: '<',

                // functions
            }
        });

    ActivityLessonsController.$inject = ['settings'];

    function ActivityLessonsController(settings) {
        var vm = this;
        var results = {
            activity: vm.activity,
            lessons: {
                group: {
                    adults: [],
                    children: [],
                    mini: [],
                },
                private: {
                    instructor: null,
                    requests: null,
                    lessons: []
                },
                disability: {
                    membership: {
                        type: settings.DISABILITY_MEMBERSHIP_TYPES[0],
                        id: null
                    },
                    instructor: null,
                    requests: null,
                    lessons: []
                },
            }
        };

        this.$onInit = onInit;

        function onInit() {
            vm.settings = settings;

            vm.results = results;
        }
    }
})();
