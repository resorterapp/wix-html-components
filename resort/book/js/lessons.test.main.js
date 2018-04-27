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
      chosenActivities: {
        '954a5abc-cb96-4393-a56b-3e5798e515a2': {
          skiChosen: true,
          snowboardChosen: false,
          telemarkChosen: false,
          snowbikeChosen: false,
          snowmobileChosen: false,
          snowshoeChosen: false,
        },
        'e62a136f-a7b2-4358-957c-f2a51e846fef': {
          skiChosen: true,
          snowboardChosen: false,
          telemarkChosen: false,
          snowbikeChosen: false,
          snowmobileChosen: false,
          snowshoeChosen: false,
        },
        '81455ad8-2a27-4c4a-a8b2-c140bcbf2409': {
          skiChosen: false,
          snowboardChosen: true,
          telemarkChosen: false,
          snowbikeChosen: false,
          snowmobileChosen: false,
          snowshoeChosen: false,
        },
        '746411de-72ba-4121-a69d-f2911b1a03ad': {
          skiChosen: false,
          snowboardChosen: false,
          telemarkChosen: true,
          snowbikeChosen: false,
          snowmobileChosen: false,
          snowshoeChosen: false,
        },
        'd3b287ce-53c2-4c39-af1a-9f559db85265': {
          skiChosen: true,
          snowboardChosen: false,
          telemarkChosen: false,
          snowbikeChosen: false,
          snowmobileChosen: false,
          snowshoeChosen: false,
        },
      },
      participants: [
        {
          _id: '954a5abc-cb96-4393-a56b-3e5798e515a2',
          firstName: 'John',
          age: 40,
          skiLevel: 'Black (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: 'e62a136f-a7b2-4358-957c-f2a51e846fef',
          firstName: 'Jane',
          age: 36,
          skiLevel: 'Blue (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: '81455ad8-2a27-4c4a-a8b2-c140bcbf2409',
          firstName: 'Will',
          age: 7,
          skiLevel: 'None',
          snowboardLevel: 'Green (Light)',
          telemarkLevel: 'None',
          physicalDisability: true,
          physicalDetails: null
        },
        {
          _id: '746411de-72ba-4121-a69d-f2911b1a03ad',
          firstName: 'Lam',
          age: 7,
          skiLevel: 'None',
          snowboardLevel: 'None',
          telemarkLevel: 'Green (Light)',
          physicalDisability: true,
          physicalDetails: null
        },
        {
          _id: 'd3b287ce-53c2-4c39-af1a-9f559db85265',
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

    window.frames.lessons.postMessage(data, '{{ site.post_message_origin }}');
  }
})();
