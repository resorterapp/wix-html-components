(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('ActivitiesFilterService', ActivitiesFilterService);

  ActivitiesFilterService.$inject = ['_', 'settings'];

  String.prototype.titlelize = function () {
    let strs = this.toLowerCase().split(' ');
    for (let i = 0; i < strs.length; i++) {
      strs[i] = strs[i].charAt(0).toUpperCase() + strs[i].slice(1);
    }
    return strs.join(' ');
  };

  function ActivitiesFilterService(_, settings) {
    const BASE_ACTIVITIES = settings.ACTIVITY_TYPES.private;

    return {
      filter: filterActivities,
      getParticipantActivities: getParticipantActivities,
      getParticipantsActivities: getParticipantsActivities,
    };

    function filterActivities(activities, participants) {
      return _.intersection(
        activities,
        BASE_ACTIVITIES,
        getParticipantsActivities(participants)
      );
    }

    function getParticipantsActivities(participants) {
      let activities = [];

      for (const participant of participants) {
        const participantActivities = getParticipantActivities(participant);
        activities = [...activities, ...participantActivities];
      }

      return _.uniq(activities);
    }

    function getParticipantActivities(participant) {
      let participantActivities = JSON.parse(participant.activities);
      return _.reduce(
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
    }
  }
})();
