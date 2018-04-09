let sample = {
  _originURL: 'something',
  activityLessons: [
    {
      activity: 'Ski',
      lessons: {
        group: {
          adults: [
            {
              date: '2018-07-02T00:00:00.000Z',
              time: 'PM',
              level: 'Blue (Light)',
              participants: [
                {
                  _id: '7e479d00-5a70-4079-a1a9-cd563b75eebf',
                  title: 'Jane',
                  age: 36,
                  disabled: false
                }
              ]
            }
          ],
          children: [],
          mini: [
            {
              date: '2018-07-02T00:00:00.000Z',
              time: 'All-day',
              level: 'Yellow',
              participants: [
                {
                  _id: '5ec8bf9e-648b-4d11-93de-76ec0b115396',
                  title: 'Eliza',
                  age: 5,
                  disabled: false
                }
              ]
            },
            {
              date: '2018-07-03T00:00:00.000Z',
              time: 'All-day',
              level: 'Yellow',
              participants: [
                {
                  _id: '5ec8bf9e-648b-4d11-93de-76ec0b115396',
                  title: 'Eliza',
                  age: 5,
                  disabled: false
                }
              ]
            }
          ],
        },
        private: {
          instructor: null,
          requests: null,
          lessons: [
            {
              date: '2018-07-01T00:00:00.000Z',
              duration: 2,
              time: 'PM',
              level: 'Black (Light)',
              participants: [
                {
                  _id: '83f27e93-7fdd-4894-b013-4b4c14bd4bab',
                  title: 'John',
                  age: 40,
                  disabled: false
                }
              ]
            },
            {
              date: '2018-07-04T00:00:00.000Z',
              duration: 2,
              time: 'PM',
              level: 'Black (Light)',
              participants: [
                {
                  _id: '83f27e93-7fdd-4894-b013-4b4c14bd4bab',
                  title: 'John',
                  age: 40,
                  disabled: false
                }
              ]
            },
            {
              date: '2018-07-04T00:00:00.000Z',
              duration: 2,
              time: 'PM',
              level: 'Black (Light)',
              participants: [
                {
                  _id: '83f27e93-7fdd-4894-b013-4b4c14bd4bab',
                  title: 'John',
                  age: 40,
                  disabled: false
                }
              ]
            },
            {
              date: '2018-07-04T00:00:00.000Z',
              duration: 2,
              time: 'PM',
              level: 'Black (Light)',
              participants: [
                {
                  _id: '83f27e93-7fdd-4894-b013-4b4c14bd4bab',
                  title: 'John',
                  age: 40,
                  disabled: false
                }
              ]
            }
          ]
        },
        disability: {}
      }
    },
    {
      activity: 'Snowboard',
      lessons: {
        group: {},
        private: {},
        disability: {
          instructor: {
            description: 'Miss Cody.'
          },
          requests: 'Mild autism.',
          lessons: [
            {
              date: '2018-07-01T00:00:00.000Z',
              duration: 2,
              time: 'PM',
              level: 'Green (Light)',
              participants: [
                {
                  _id: '620c66cc-fee4-434f-ac65-1f12f3cfa0f1',
                  title: 'Will',
                  age: 7,
                  disabled: {
                    details: 'Mild autism.'
                  }
                }
              ]
            },
            {
              date: '2018-07-02T00:00:00.000Z',
              duration: 2,
              time: 'PM',
              level: 'Green (Light)',
              participants: [
                {
                  _id: '620c66cc-fee4-434f-ac65-1f12f3cfa0f1',
                  title: 'Will',
                  age: 7,
                  disabled: {
                    details: 'Mild autism.'
                  }
                }
              ]
            }
          ]
        },
      }
    }
  ]
};
