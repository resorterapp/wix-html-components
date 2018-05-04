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
      activities: [
        'Ski',
        'Snowboard',
        'Telemark',
        'Snowmobiling',
        'Snowbiking',
        'Snowshoeing',
      ],
      participants: [
        {
          _id: uuid.v4(),
          firstName: 'John',
          age: 40,
          skiLevel: 'Black (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'William',
          age: 40,
          skiLevel: 'Black (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Johnson',
          age: 40,
          skiLevel: 'Black (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Smith',
          age: 40,
          skiLevel: 'Black (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Jack',
          age: 40,
          skiLevel: 'Black (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Jane',
          age: 36,
          skiLevel: 'Blue (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Will',
          age: 7,
          skiLevel: 'None',
          snowboardLevel: 'Green (Light)',
          telemarkLevel: 'None',
          physicalDisability: true,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Ray',
          age: 7,
          skiLevel: 'None',
          snowboardLevel: 'Green (Light)',
          telemarkLevel: 'None',
          physicalDisability: true,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Rick',
          age: 7,
          skiLevel: 'None',
          snowboardLevel: 'Green (Light)',
          telemarkLevel: 'None',
          physicalDisability: true,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Lam',
          age: 7,
          skiLevel: 'None',
          snowboardLevel: 'Green (Light)',
          telemarkLevel: 'None',
          physicalDisability: true,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Eliza',
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

    document.getElementById('myFrame').src = './lessons.html';
  }

  function handleLessonsMessage(event) {
    if (!event.data || event.data.msg !== 'LESSONS_READY') return;

    window.frames.lessons.postMessage(data, '*');
  }
})();
