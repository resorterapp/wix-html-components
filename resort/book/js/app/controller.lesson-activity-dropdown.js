(function () {
    "use strict";

    angular
        .module("BookingLessonApp")
        .controller("LessonActivityDropdownController", LessonActivityDropdownController);

    function LessonActivityDropdownController() {
        this.items = [
            "Ski",
            "Snowboard",
            "Telemark",
            "Snowmobiling",
            "Snowbiking",
            "Snowshoeing"
        ];
        this.selected = this.items[0];
    }
})();
