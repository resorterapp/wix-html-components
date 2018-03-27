---
---

(function () {
    'use strict';

    angular
        .module('BookingLessonApp')
        .factory('Wix', Wix);

    Wix.$inject = ['$window', 'rx'];

    function Wix($window, rx) {
        var subject = new rx.Subject();
        var data = {};

        $window.onmessage = windowOnMessage;

        return {
            getData: getData,
            setData: setData,
            subscribe: subscribe,
            sendMessage: sendMessage
        };

        ////////////

        function windowOnMessage(event) {
            // Checks the event origin to make sure it's from our site
            if ( event.origin !== '{{ site.post_message_origin }}' || !(event.data) ) return;

            let message = event.data.msg;

            if (message === 'SEND_TRIP_DATA') return setData(event.data.msgData);
        }

        function getData() {
            return data;
        }

        function setData(newData) {
            data = newData;

            // Notifies the subscribers
            subject.onNext(newData);
        }

        function subscribe(ob) {
            return subject.subscribe(ob);
        }

        function sendMessage(msgObj) {
            $window.parent.postMessage(msgObj);
        }
    }
})();
