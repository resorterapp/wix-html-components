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
      activities: [ 'Ski', 'Snowboard', 'Telemark', 'Snowmobiling', 'Snowbiking', 'Snowshoeing' ],
      participants: [
        {
          _id: uuid.v4(),
          firstName: 'John',
          age: 40,
          activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":true,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
          skiLevel: 'Black (Light)',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Sam',
          age: 23,
          activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
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
          activities: '{"skiChosen":false,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
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
          activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
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
          activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
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
          activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
          skiLevel: 'Yellow',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
        {
          _id: uuid.v4(),
          firstName: 'Beth',
          age: 3,
          activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
          skiLevel: 'Yellow',
          snowboardLevel: 'None',
          telemarkLevel: 'None',
          physicalDisability: false,
          physicalDetails: null
        },
      ]
    }
  };

  let savedData = {
    msg: 'SET_LESSONS_DATA',
    msgData: {
      date: {
        checkIn: '2018-06-03T14:00:00.000Z',
        checkOut: '2018-06-05T14:00:00.000Z'
      },
      activities: [
        'Ski',
        'Snowboard',
        'Telemark'
      ],
      participants: [
        {
          _id: '3c2062ee-fe33-4a5d-8977-b619007f6ad5',
          masterEmail: '65e056f7-9341-4726-bf42-45c3a08cf79f',
          age: 37,
          firstName: 'Corey',
          lastName: 'Holland',
          physicalDisability: null,
          physicalDetails: null,
          foodAllergy: null,
          allergyDetails: null,
          membership: null,
          membershipId: null,
          activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
          shoesize: null,
          weight: null,
          height: null,
          skiLevel: 5,
          snowboardLevel: 2,
          telemarkLevel: 1,
          snowbikeLevel: 1,
          snowmobileLevel: 1,
          snowshoeLevel: 1,
          _createdDate: '2018-05-15T06:16:47.010Z',
          _updatedDate: '2018-05-17T01:17:40.298Z'
        },
        {
          _id: '5e9f4680-26d3-4370-9802-c9ad6bca4021',
          masterEmail: '65e056f7-9341-4726-bf42-45c3a08cf79f',
          age: 23,
          firstName: 'Neil',
          lastName: 'Holland',
          skiLevel: 3,
          snowboardLevel: 5,
          telemarkLevel: 1,
          snowbikeLevel: 1,
          snowmobileLevel: 1,
          snowshoeLevel: 1,
          physicalDisability: false,
          physicalDetails: '',
          foodAllergy: false,
          allergyDetails: '',
          membership: 'DWA',
          membershipId: '',
          activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
          _createdDate: '2018-05-14T04:22:57.981Z',
          _updatedDate: '2018-05-17T00:54:06.269Z'
        }
      ]
    },
    lessonsData: {
      group: {
        adults: [
          {
            uuid: '6413ff66-d264-4042-ba3e-2d9aeab6024f',
            date: '2018-06-03T14:00:00.000Z',
            time: 'PM',
            duration: 4,
            activity: 'Ski',
            participants: [
              {
                _id: '3c2062ee-fe33-4a5d-8977-b619007f6ad5',
                masterEmail: '65e056f7-9341-4726-bf42-45c3a08cf79f',
                age: 37,
                firstName: 'Corey',
                lastName: 'Holland',
                physicalDisability: null,
                physicalDetails: null,
                foodAllergy: null,
                allergyDetails: null,
                membership: null,
                membershipId: null,
                activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
                shoesize: null,
                weight: null,
                height: null,
                skiLevel: 5,
                snowboardLevel: 2,
                telemarkLevel: 1,
                snowbikeLevel: 1,
                snowmobileLevel: 1,
                snowshoeLevel: 1,
                _createdDate: '2018-05-15T06:16:47.010Z',
                _updatedDate: '2018-05-17T01:17:40.298Z'
              }
            ]
          },
          {
            uuid: '07d8af52-3f49-46e8-9a51-08224419024d',
            date: '2018-06-04T14:00:00.000Z',
            time: 'PM',
            duration: 4,
            activity: 'Ski',
            participants: [
              {
                _id: '5e9f4680-26d3-4370-9802-c9ad6bca4021',
                masterEmail: '65e056f7-9341-4726-bf42-45c3a08cf79f',
                age: 23,
                firstName: 'Neil',
                lastName: 'Holland',
                physicalDisability: false,
                physicalDetails: '',
                foodAllergy: false,
                allergyDetails: '',
                membership: 'DWA',
                membershipId: '',
                activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
                shoesize: null,
                weight: null,
                height: null,
                skiLevel: 3,
                snowboardLevel: 5,
                telemarkLevel: 1,
                snowbikeLevel: 1,
                snowmobileLevel: 1,
                snowshoeLevel: 1,
                _createdDate: '2018-05-14T04:22:57.981Z',
                _updatedDate: '2018-05-17T00:49:43.756Z'
              }
            ]
          }
        ],
        children: [],
        mini: []
      },
      'private': {
        instructor: {
          required: false,
          details: null
        },
        requests: null,
        lessons: []
      },
      disability: []
    }
  };
  let nullData = {
    msg: 'SET_LESSONS_DATA',
    msgData: {
      date: {
        checkIn: '2018-06-03T14:00:00.000Z',
        checkOut: '2018-06-05T14:00:00.000Z'
      },
      activities: [
        'Ski',
        'Snowboard',
        'Telemark'
      ],
      participants: [
        {
          _id: '3c2062ee-fe33-4a5d-8977-b619007f6ad5',
          masterEmail: '65e056f7-9341-4726-bf42-45c3a08cf79f',
          age: 37,
          firstName: 'Corey',
          lastName: 'Holland',
          physicalDisability: null,
          physicalDetails: null,
          foodAllergy: null,
          allergyDetails: null,
          membership: null,
          membershipId: null,
          activities: '{"skiChosen":true,"snowboardChosen":false,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
          shoesize: null,
          weight: null,
          height: null,
          skiLevel: 5,
          snowboardLevel: 2,
          telemarkLevel: 1,
          snowbikeLevel: 1,
          snowmobileLevel: 1,
          snowshoeLevel: 1,
          _createdDate: '2018-05-15T06:16:47.010Z',
          _updatedDate: '2018-05-17T01:17:40.298Z'
        },
        {
          _id: '5e9f4680-26d3-4370-9802-c9ad6bca4021',
          masterEmail: '65e056f7-9341-4726-bf42-45c3a08cf79f',
          age: 23,
          firstName: 'Neil',
          lastName: 'Holland',
          skiLevel: 3,
          snowboardLevel: 5,
          telemarkLevel: 1,
          snowbikeLevel: 1,
          snowmobileLevel: 1,
          snowshoeLevel: 1,
          physicalDisability: false,
          physicalDetails: '',
          foodAllergy: false,
          allergyDetails: '',
          membership: 'DWA',
          membershipId: '',
          activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
          _createdDate: '2018-05-14T04:22:57.981Z',
          _updatedDate: '2018-05-17T00:54:06.269Z'
        }
      ]
    },
    lessonsData: null
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
    if (!event.data || event.data.msg !== 'LESSONS_READY')
      throw new Error('Invalid LESSON message');

    window.frames.lessons.postMessage(nullData, '*');
    // window.frames.lessons.postMessage(savedData, '*');
  }
})();
