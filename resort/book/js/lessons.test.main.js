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
    msg: 'SET_LESSONS_DATA',
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
          "_id": "58c2d8c5-e5ab-44ec-9a3b-62b53306d3a6",
          "firstName": "John",
          "age": 40,
          "skiLevel": "Black (Light)",
          "snowboardLevel": "None",
          "telemarkLevel": "None",
          "physicalDisability": false,
          "physicalDetails": null
        },
        {
          "_id": "3d9b67bf-d7a3-4b7e-a9ea-69d81e0b2eb4",
          "firstName": "William",
          "age": 40,
          "skiLevel": "Black (Light)",
          "snowboardLevel": "None",
          "telemarkLevel": "None",
          "physicalDisability": false,
          "physicalDetails": null
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
          "_id": "d33cb631-892f-4569-9e8c-26cbf209ce31",
          "firstName": "Smith",
          "age": 40,
          "skiLevel": "Black (Light)",
          "snowboardLevel": "None",
          "telemarkLevel": "None",
          "physicalDisability": false,
          "physicalDetails": null
        },
        {
          "_id": "50f6abfb-1a74-4536-914d-243709665e3e",
          "firstName": "Jack",
          "age": 40,
          "skiLevel": "Black (Light)",
          "snowboardLevel": "None",
          "telemarkLevel": "None",
          "physicalDisability": false,
          "physicalDetails": null
        },
        {
          "_id": "1c204121-2381-4c89-a5e5-34ccf5dd2597",
          "firstName": "Jane",
          "age": 36,
          "skiLevel": "Blue (Light)",
          "snowboardLevel": "None",
          "telemarkLevel": "None",
          "physicalDisability": false,
          "physicalDetails": null
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
          "_id": "561448f8-572a-45d7-af36-dfc49f237413",
          "firstName": "Eliza",
          "age": 4,
          "skiLevel": "Yellow",
          "snowboardLevel": "None",
          "telemarkLevel": "None",
          "physicalDisability": false,
          "physicalDetails": null
        }
      ]
    },
    lessonsData: {
      "group": {
        "adults": [
          {
            "uuid": "5204e142-6122-487d-bf25-eda3230cd9ad",
            "date": "2018-07-01T00:00:00.000Z",
            "time": "PM",
            "duration": 4,
            "activity": "Snowboard",
            "participants": [
              {
                "_id": "58c2d8c5-e5ab-44ec-9a3b-62b53306d3a6",
                "firstName": "John",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              },
              {
                "_id": "3d9b67bf-d7a3-4b7e-a9ea-69d81e0b2eb4",
                "firstName": "William",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              }
            ]
          },
          {
            "uuid": "0ea2087b-d02b-4151-9c7d-08af8b1b6219",
            "date": "2018-07-02T00:00:00.000Z",
            "time": "PM",
            "duration": 4,
            "activity": "Ski",
            "participants": [
              {
                "_id": "d33cb631-892f-4569-9e8c-26cbf209ce31",
                "firstName": "Smith",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              },
              {
                "_id": "50f6abfb-1a74-4536-914d-243709665e3e",
                "firstName": "Jack",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              }
            ]
          }
        ],
        "children": [],
        "mini": [
          {
            "uuid": "80186e90-b1ea-4386-8568-0dfa20060ecd",
            "date": "2018-07-01T00:00:00.000Z",
            "time": "PM",
            "duration": 4,
            "activity": "Ski",
            "participants": [
              {
                "_id": "561448f8-572a-45d7-af36-dfc49f237413",
                "firstName": "Eliza",
                "age": 4,
                "skiLevel": "Yellow",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              }
            ]
          },
          {
            "uuid": "db7b1a97-df5f-45e5-adb3-d47eae458fb8",
            "date": "2018-07-02T00:00:00.000Z",
            "time": "PM",
            "duration": 4,
            "activity": "Telemark",
            "participants": [
              {
                "_id": "561448f8-572a-45d7-af36-dfc49f237413",
                "firstName": "Eliza",
                "age": 4,
                "skiLevel": "Yellow",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              }
            ]
          }
        ]
      },
      "private": {
        "instructor": {
          "required": false,
          "details": null
        },
        "requests": null,
        "lessons": [
          {
            "uuid": "94459629-d8d1-41c4-a8ae-fe40ac9768b1",
            "date": "2018-07-01T00:00:00.000Z",
            "time": "PM",
            "duration": 4,
            "activity": "Snowboard",
            "participants": [
              {
                "_id": "58c2d8c5-e5ab-44ec-9a3b-62b53306d3a6",
                "firstName": "John",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              },
              {
                "_id": "d33cb631-892f-4569-9e8c-26cbf209ce31",
                "firstName": "Smith",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              }
            ]
          },
          {
            "uuid": "7bf196c5-83ea-466b-bcc7-c7a4d789ebd3",
            "date": "2018-07-02T00:00:00.000Z",
            "time": "PM",
            "duration": 4,
            "activity": "Ski",
            "participants": [
              {
                "_id": "1c204121-2381-4c89-a5e5-34ccf5dd2597",
                "firstName": "Jane",
                "age": 36,
                "skiLevel": "Blue (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
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
                "_id": "3d9b67bf-d7a3-4b7e-a9ea-69d81e0b2eb4",
                "firstName": "William",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              },
              {
                "_id": "d33cb631-892f-4569-9e8c-26cbf209ce31",
                "firstName": "Smith",
                "age": 40,
                "skiLevel": "Black (Light)",
                "snowboardLevel": "None",
                "telemarkLevel": "None",
                "physicalDisability": false,
                "physicalDetails": null
              }
            ]
          }
        ]
      },
      "disability": []
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

    // window.frames.lessons.postMessage(data, '*');
    window.frames.lessons.postMessage(savedData, '*');
  }
})();
