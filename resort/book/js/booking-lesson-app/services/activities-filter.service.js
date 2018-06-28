(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('filterActivities', filterActivities);

  filterActivities.$inject = ['_', 'settings'];

  String.prototype.titlelize = function () {
    let strs = this.toLowerCase().split(' ');
    for (let i = 0; i < strs.length; i++) {
      strs[i] = strs[i].charAt(0).toUpperCase() + strs[i].slice(1);
    }
    return strs.join(' ');
  };

  function filterActivities(_, settings) {
    const BASE_ACTIVITIES = settings.ACTIVITY_TYPES.private;

    return function (activities, participants) {
      return _.intersection(
        activities,
        BASE_ACTIVITIES,
        getParticipantsActivities(participants)
      );
    };

    function getParticipantsActivities(participants) {
      let activities = [];

      for (const participant of participants) {
        let participantActivities = JSON.parse(participant.activities);
        participantActivities = _.reduce(
          participantActivities,
          (acc, value, key) => {
            if (value) {
              let act = key.replace('Chosen', '');
              acc.push(act.titlelize());
            }
            return acc;
          },
          [],
        );
        activities = [...activities, ...participantActivities];
      }

      return _.uniq(activities);
    }
  }
})();
