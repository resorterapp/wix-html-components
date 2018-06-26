(LessonItemComponent)();

function LessonItemComponent() {
  'use strict';

  angular
    .module('BookingLessonApp')
    .component('lessonItem', {
      templateUrl: 'js/booking-lesson-app/lesson/lesson-item.html',
      controller: LessonItemController,
      bindings: {
        // variables
        lesson: '<',
        type: '<',
        participants: '<',
        activities: '<',

        // functions
        duplicateLesson: '<',
        deleteLesson: '<'
      }
    })
    .component('lessonItemFirstTimer', {
      templateUrl: 'js/booking-lesson-app/lesson/lesson-item.first-timer.html',
      controller: LessonItemController,
      bindings: {
        // variables
        lesson: '<',
        type: '<',
        participants: '<',
        activities: '<',

        // functions
        duplicateLesson: '<',
        deleteLesson: '<'
      }
    });

  LessonItemController.$inject = ['_', 'settings'];
}

function LessonItemController(_, settings) {
  const CHILD_ADVICE = 'It is strongly advised for any child aged 5 and under to do ' +
    'a separate lesson, either as a group or a private lesson';
  const MAX_PEOPLE_ADVICE = 'Up to 4 people can join a lesson';

  let vm = this;

  // Initialises
  this.$onInit = onInit;

  ///////////

  function onInit() {
    vm.settings = settings;

    vm.availableActivities = buildActivitiesList(vm.participants);
    // Gets the first available activity
    vm.lesson.activity = vm.availableActivities[0];

    // Binds functions
    vm.isLessonPrivateOrDisability = isLessonPrivateOrDisability;
    vm.getParticipantsColumnCssClass = getParticipantsColumnCssClass;
    vm.getTimeOptions = getTimeOptions;
    vm.onAddLesson = onAddLesson;
    vm.onDelete = onDelete;

    vm.innerCounts = {
      pickedMinis: 0,
      pickedOthers: 0
    };
    vm.participantCheckboxes = buildSpecificParticipantsList();

    vm.pickParticipant = pickParticipant;
    vm.disableParticipant = disableParticipant;
    vm.compareParticipant = compareParticipant;
    vm.activityOnChange = activityOnChange;
  }

  function getTimeOptions() {
    if (isLessonMatchTypes(['group.adults'])) {
      return settings.TIME_OPTIONS.filter((item) => {
        return item !== 'All day';
      });
    }

    return settings.TIME_OPTIONS;
  }

  function onDelete() {
    vm.deleteLesson(vm.lesson);
  }

  function getParticipantsColumnCssClass() {
    return isLessonPrivateOrDisability() ? 'col-sm-5' : 'col-sm-6';
  }

  function isLessonPrivateOrDisability() {
    return isLessonMatchTypes(['private', 'disability']);
  }

  function isLessonMatchTypes(types) {
    return types.indexOf(vm.type) > -1;
  }

  function onAddLesson() {
    vm.duplicateLesson(vm.lesson);
  }

  function buildSpecificParticipantsList() {
    let participantCheckboxes = [];

    for (const participant of vm.participants) {
      let participantCheckbox = {
        participant: participant,
        checked: _.findIndex(vm.lesson.participants, ['_id', participant._id]) >= 0,
        disabled: false,
        message: null
      };

      if (!participantCheckbox.checked) {
        participantCheckbox.disabled = disableParticipant(participantCheckbox);
      }

      participantCheckboxes.push(participantCheckbox);
    }

    return participantCheckboxes;
  }

  function compareParticipant(p1, p2) {
    return p1._id === p2._id;
  }

  function pickParticipant(pc) {
    pc.checked = !pc.checked;

    if (isLessonMatchTypes(['disability'])) return;

    if (isLessonMatchTypes(['private'])) {
      let checkCount = pc.checked ? 1 : -1;

      if (pc.participant.age > 5) {
        vm.innerCounts.pickedOthers += checkCount;
      } else {
        vm.innerCounts.pickedMinis += checkCount;
      }
    }

    let otherCheckboxes = vm.participantCheckboxes.filter(function (p) {
      return p !== pc;
    });

    for (let oc of otherCheckboxes) {
      oc.disabled = disableParticipant(oc);
    }
  }

  function buildActivitiesList() {
    let baseActivities = isLessonMatchTypes(['private'])
      ? settings.ACTIVITY_TYPES.private
      : settings.ACTIVITY_TYPES.default;

    return _.intersection(vm.activities, baseActivities);
  }

  function invalidActivityAdvice(participantName) {
    return `${participantName} has not elected to do ${vm.lesson.activity}`;
  }

  function disableParticipant(pc) {
    // LN Don't try to simplify these logic blocks
    // They may look lengthy, but easier to understand than a short one with lots of && and ||

    pc.message = null;

    // If the chosen activity is not in the participant's chosenActivities,
    // disable the participant
    const participantActivities = JSON.parse(pc.participant.activities);
    if (!participantActivities[`${vm.lesson.activity.toLowerCase()}Chosen`]) {
      pc.message = invalidActivityAdvice(pc.participant.firstName);
      return true;
    }

    // If this is mini, checks if others are picked
    if (pc.participant.age < settings.AGE_GROUP.MINI) {
      if (vm.innerCounts.pickedOthers > 0) {
        pc.message = CHILD_ADVICE;
        return true;
      }

      if (vm.innerCounts.pickedMinis < settings.MAX_PEOPLE) {
        pc.message = MAX_PEOPLE_ADVICE;
        return false;
      }

      return !pc.checked;
    }

    if (vm.innerCounts.pickedMinis > 0) {
      pc.message = CHILD_ADVICE;
      return true;
    }

    if (vm.innerCounts.pickedOthers < settings.MAX_PEOPLE) {
      pc.message = MAX_PEOPLE_ADVICE;
      return false;
    }

    return !pc.checked;
  }

  function activityOnChange() {
    for (let participantCheckbox of vm.participantCheckboxes)
      participantCheckbox.disabled = disableParticipant(participantCheckbox);
  }
}
