(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('lessonsList', {
            templateUrl: 'js/booking-lesson-app/lesson/lessons-list.html',
            controller: LessonsListController
        });

    function LessonsListController() {
        var ctrl = this;

        ctrl.lessons = [
            {
                date: 1520127466520
            },
            {
                date: 1520172548659
            }
        ];

        function deleteLesson(lesson) {
            var lessonIndex = ctrl.lessons.indexOf(lesson);

            if (lessonIndex >= 0) {
                ctrl.lessons.splice(lessonIndex, 1);
            }
        }
    }
})();
