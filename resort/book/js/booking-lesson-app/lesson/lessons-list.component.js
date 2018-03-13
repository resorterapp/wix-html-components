function buildDatesRange(fromDate, toDate) {
    let range = moment.range(fromDate, toDate);
    let dates = Array.from(range.by('day'));

    return dates.map(function (m) {
        return m.toDate();
    });
}

(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .component('lessonsList', {
            templateUrl: 'js/booking-lesson-app/lesson/lessons-list.html',
            controller: LessonsListController,
            bindings: {
                id: '<',
                data: '<'
            }
        });

    function LessonsListController() {
        var ctrl = this;

        ctrl.dates = buildDatesRange(ctrl.data.date.checkIn, ctrl.data.date.checkOut);
        ctrl.addLessonTemplateUrl = ctrl.id + '_addLessonTemplate.html';
        ctrl.deleteLesson = deleteLesson;

        function deleteLesson(lesson) {
            let lessonIndex = ctrl.lessons.indexOf(lesson);

            if (lessonIndex >= 0) {
                ctrl.lessons.splice(lessonIndex, 1);
            }
        }
    }
})();
