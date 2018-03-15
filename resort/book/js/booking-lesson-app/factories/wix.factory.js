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
        var data = {
            date: {
                checkIn: new Date('2018-07-01'),
                checkOut: new Date('2018-07-04')
            },
            participants: [
                {
                    _id: uuid.v4(),
                    name: 'John',
                    age: 40,
                    disabled: false
                },
                {
                    _id: uuid.v4(),
                    name: 'Jane',
                    age: 36,
                    disabled: false
                },
                {
                    _id: uuid.v4(),
                    name: 'Will',
                    age: 7,
                    disabled: true
                },
                {
                    _id: uuid.v4(),
                    name: 'Eliza',
                    age: 4,
                    disabled: false
                }
            ]
        };

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
