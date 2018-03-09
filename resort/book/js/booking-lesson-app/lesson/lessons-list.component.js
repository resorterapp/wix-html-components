(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('lessonsList', {
            templateUrl: 'js/booking-lesson-app/lesson/lessons-list.html',
            controller: LessonsListController,
            bindings: {
                id: '<'
            }
        });

    LessonsListController.$inject = ['$scope', 'Wix'];

    function LessonsListController($scope, Wix) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.dates = [];
        ctrl.addLessonTemplateUrl = ctrl.id + '_addLessonTemplate.html';
        ctrl.deleteLesson = deleteLesson;

        var subscription = Wix.subscribe(function (data) {
            ctrl.data = data;
            ctrl.dates = retrieveDates();

            $scope.$apply();
        });

        function retrieveDates() {
            // Constructs a date range from checkIn to checkoutDate
            var range = moment.range(
                ctrl.data.date.checkIn,
                ctrl.data.date.checkOut
            );

            // Converts the range to array
            var dates = Array.from(range.by('day'));
            return dates.map(m => m.toDate());
        }


        function deleteLesson(lesson) {
            var lessonIndex = ctrl.lessons.indexOf(lesson);

            if (lessonIndex >= 0) {
                ctrl.lessons.splice(lessonIndex, 1);
            }
        }
    }
})();
