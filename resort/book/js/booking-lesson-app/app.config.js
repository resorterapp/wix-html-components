(function() {
    "use strict";

    angular
        .module("BookingLessonApp")
        .config(config);

    function config($interpolateProvider) {
        $interpolateProvider.startSymbol('[{');
        $interpolateProvider.endSymbol('}]');
    }
})();
