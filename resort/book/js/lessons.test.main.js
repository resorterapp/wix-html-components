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
          "_id": "3be0bd64-ca6a-4c5c-ab7c-030c331c582e",
          "firstName": "Johnson",
          "age": 40,
          "skiLevel": "Black (Light)",
          "snowboardLevel": "None",
          "telemarkLevel": "None",
          "physicalDisability": false,
          "physicalDetails": null
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

  let savedData = {
    group: {
      adults: [
        {
          uuid: 'ed672338-28c9-484e-80b9-fcbf809b435f',
          date: '2018-05-31T23:02:17.861Z',
          time: 'PM',
          duration: 4,
          activity: 'Ski',
          participants: [
            {
              _id: 'aed783e2-ffb9-43a1-8be3-61eafd981ec4',
              masterEmail: '6a244182-d4bc-436d-b875-7b26af44f927',
              age: 41,
              firstName: 'Tucker',
              lastName: 'Beckham',
              physicalDisability: null,
              physicalDetails: null,
              foodAllergy: null,
              allergyDetails: null,
              membership: null,
              membershipId: null,
              activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
              shoesize: null,
              weight: null,
              height: null,
              skiLevel: 2,
              snowboardLevel: 2,
              telemarkLevel: 1,
              snowbikeLevel: 1,
              snowmobileLevel: 1,
              snowshoeLevel: 1,
              _createdDate: '2018-05-23T03:57:35.146Z',
              _updatedDate: '2018-05-25T00:02:36.681Z'
            }
          ]
        },
        {
          uuid: 'd8bbb18d-4157-401a-acda-9a2e500b17a2',
          date: '2018-06-01T23:02:17.861Z',
          time: 'PM',
          duration: 4,
          activity: 'Ski',
          participants: [
            {
              _id: 'aed783e2-ffb9-43a1-8be3-61eafd981ec4',
              masterEmail: '6a244182-d4bc-436d-b875-7b26af44f927',
              age: 41,
              firstName: 'Tucker',
              lastName: 'Beckham',
              physicalDisability: null,
              physicalDetails: null,
              foodAllergy: null,
              allergyDetails: null,
              membership: null,
              membershipId: null,
              activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
              shoesize: null,
              weight: null,
              height: null,
              skiLevel: 2,
              snowboardLevel: 2,
              telemarkLevel: 1,
              snowbikeLevel: 1,
              snowmobileLevel: 1,
              snowshoeLevel: 1,
              _createdDate: '2018-05-23T03:57:35.146Z',
              _updatedDate: '2018-05-25T00:02:36.681Z'
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
      lessons: [
        {
          uuid: '795b1b4f-e99d-48cb-a61d-15e4b979d3b4',
          date: '2018-06-02T23:02:17.861Z',
          time: 'PM',
          duration: 4,
          activity: 'Ski',
          participants: [
            {
              _id: 'aed783e2-ffb9-43a1-8be3-61eafd981ec4',
              masterEmail: '6a244182-d4bc-436d-b875-7b26af44f927',
              age: 41,
              firstName: 'Tucker',
              lastName: 'Beckham',
              physicalDisability: null,
              physicalDetails: null,
              foodAllergy: null,
              allergyDetails: null,
              membership: null,
              membershipId: null,
              activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
              shoesize: null,
              weight: null,
              height: null,
              skiLevel: 2,
              snowboardLevel: 2,
              telemarkLevel: 1,
              snowbikeLevel: 1,
              snowmobileLevel: 1,
              snowshoeLevel: 1,
              _createdDate: '2018-05-23T03:57:35.146Z',
              _updatedDate: '2018-05-25T00:02:36.681Z'
            }
          ]
        },
        {
          uuid: '870448e6-f1a0-4acb-9249-099387c13b39',
          date: '2018-06-03T23:02:17.861Z',
          time: 'PM',
          duration: 4,
          activity: 'Ski',
          participants: [
            {
              _id: 'aed783e2-ffb9-43a1-8be3-61eafd981ec4',
              masterEmail: '6a244182-d4bc-436d-b875-7b26af44f927',
              age: 41,
              firstName: 'Tucker',
              lastName: 'Beckham',
              physicalDisability: null,
              physicalDetails: null,
              foodAllergy: null,
              allergyDetails: null,
              membership: null,
              membershipId: null,
              activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
              shoesize: null,
              weight: null,
              height: null,
              skiLevel: 2,
              snowboardLevel: 2,
              telemarkLevel: 1,
              snowbikeLevel: 1,
              snowmobileLevel: 1,
              snowshoeLevel: 1,
              _createdDate: '2018-05-23T03:57:35.146Z',
              _updatedDate: '2018-05-25T00:02:36.681Z'
            }
          ]
        }
      ]
    },
    disability: [
      {
        participantId: 'bd7a967c-feed-4ce5-88fe-ce9844c85e0c',
        person: 'Brad',
        instructor: {
          required: false,
          details: null
        },
        requests: null,
        lessons: [
          {
            uuid: '26ab29e5-aa37-4374-9687-8fe99cd66efb',
            date: '2018-05-31T23:02:17.861Z',
            time: 'PM',
            duration: 2,
            activity: 'Ski',
            participants: [
              {
                _id: 'bd7a967c-feed-4ce5-88fe-ce9844c85e0c',
                masterEmail: '6a244182-d4bc-436d-b875-7b26af44f927',
                age: 32,
                firstName: 'Brad',
                lastName: 'Howell',
                physicalDisability: true,
                physicalDetails: '',
                foodAllergy: false,
                allergyDetails: '',
                membership: 'DWA',
                membershipId: '123456789',
                activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
                shoesize: null,
                weight: null,
                height: null,
                skiLevel: 4,
                snowboardLevel: 2,
                telemarkLevel: 1,
                snowbikeLevel: 1,
                snowmobileLevel: 1,
                snowshoeLevel: 1,
                _createdDate: '2018-05-23T03:57:51.806Z',
                _updatedDate: '2018-05-25T00:02:43.081Z'
              }
            ]
          },
          {
            uuid: '4c85dbc6-d8d4-4eaa-9e7e-e52fbad92f3d',
            date: '2018-06-01T23:02:17.861Z',
            time: 'PM',
            duration: 2,
            activity: 'Ski',
            participants: [
              {
                _id: 'bd7a967c-feed-4ce5-88fe-ce9844c85e0c',
                masterEmail: '6a244182-d4bc-436d-b875-7b26af44f927',
                age: 32,
                firstName: 'Brad',
                lastName: 'Howell',
                physicalDisability: true,
                physicalDetails: '',
                foodAllergy: false,
                allergyDetails: '',
                membership: 'DWA',
                membershipId: '123456789',
                activities: '{"skiChosen":true,"snowboardChosen":true,"telemarkChosen":false,"snowbikeChosen":false,"snowmobileChosen":false,"snowshoeChosen":false}',
                shoesize: null,
                weight: null,
                height: null,
                skiLevel: 4,
                snowboardLevel: 2,
                telemarkLevel: 1,
                snowbikeLevel: 1,
                snowmobileLevel: 1,
                snowshoeLevel: 1,
                _createdDate: '2018-05-23T03:57:51.806Z',
                _updatedDate: '2018-05-25T00:02:43.081Z'
              }
            ]
          }
        ]
      }
    ]
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

    // window.frames.lessons.postMessage(data, '*');
    window.frames.lessons.postMessage(savedData, '*');
  }
})();
