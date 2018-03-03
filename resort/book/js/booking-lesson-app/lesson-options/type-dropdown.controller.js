(function () {
    "use strict";

    angular
        .module("BookingLessonApp")
        .controller("LessonTypeDropdownController", LessonTypeDropdownController);

    function LessonTypeDropdownController() {
        this.items = [
            "Group",
            "Private",
            "Private (disabled)"
        ];
        this.selected = this.items[0];
    }
})();
