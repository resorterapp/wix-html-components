---
---

(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .factory('Wix', Wix);

    Wix.$inject = ['$window', 'rx', 'uuid'];

    function Wix($window, rx, uuid) {
        var subject = new rx.Subject();
        var data = {};

        $window.onmessage = windowOnMessage;

        return {
            getData: getData,
            setData: setData,
            subscribe: subscribe
        };

        ////////////

        function windowOnMessage(event) {
            // Checks the event origin to make sure it's from our site
            if (
                event.origin !== '{{ site.post_message_origin }}'
                || !(event.data)
            ) return;

            setData(event.data);
        }

        function getData() {
            return data;
        }

        function setData(newData) {
            data = newData;
            subject.onNext(newData);
        }

        function subscribe(ob) {
            return subject.subscribe(ob);
        }
    }
})();
