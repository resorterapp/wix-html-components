---
---

(function () {
    'use strict';

    // Initialise data
    let data = {
        msg: 'SEND_TRIP_DATA',
        msgData: {
            date: {
                checkIn: new Date('2018-07-01'),
                checkOut: new Date('2018-07-04')
            },
            participants: [
                {
                    _id: uuid.v4(),
                    title: 'John',
                    age: 40,
                    skiLevel: 'Black (Light)',
                    snowboardLevel: 'None',
                    telemarkLevel: 'None',
                    physicalDisability: false,
                    physicalDetails: null
                },
                {
                    _id: uuid.v4(),
                    title: 'Jane',
                    age: 36,
                    skiLevel: 'Blue (Light)',
                    snowboardLevel: 'None',
                    telemarkLevel: 'None',
                    physicalDisability: false,
                    physicalDetails: null
                },
                {
                    _id: uuid.v4(),
                    title: 'Will',
                    age: 7,
                    skiLevel: 'None',
                    snowboardLevel: 'Green (Light)',
                    telemarkLevel: 'None',
                    physicalDisability: true,
                    physicalDetails: null
                },
                {
                    _id: uuid.v4(),
                    title: 'Eliza',
                    age: 4,
                    skiLevel: 'Yellow',
                    snowboardLevel: 'None',
                    telemarkLevel: 'None',
                    physicalDisability: false,
                    physicalDetails: null
                }
            ]
        },
    };

    init();

    /**
     * Initialise the DOM
     */
    function init() {
        window.onmessage = handleLessonsMessage;

        let myFrame = document.getElementById('myFrame');
        myFrame.src = './lessons.html';
    }

    function handleLessonsMessage(event) {
        if (!event.data || event.data.msg !== 'LESSONS_READY') return;

        window.frames.lessons.postMessage(data, '{{ site.post_message_origin }}');
    }
})();
