(function () {
  'use strict';

  const EMPTY_RESULTS = {
    group: {
      adults: [],
      children: [],
      mini: [],
    },
    private: {
      instructor: {
        required: false,
        details: null,
      },
      requests: null,
      lessons: [],
    },
    disability: [],
  };

  angular
    .module('BookingLessonApp')
    .component('activityLessons', {
      templateUrl: 'js/booking-lesson-app/lesson/activity-lessons.html',
      controller: ActivityLessonsController,
      bindings: {
        // variables
        activities: '<',
        dates: '<',
        participants: '<',
        results: '<',
      },
    });

  ActivityLessonsController.$inject = [
    '_',
    'isParticipantFT',
    'settings',
    'Lesson',
  ];

  function ActivityLessonsController(_, isParticipantFT, settings, Lesson) {
    let vm = this;

    this.$onInit = onInit;

    function onInit() {
      vm.settings = settings;
      if (isResultsEmpty(vm.results)) {
        createAllLessons();
      }

      // Binds the functions
      vm.deleteLessonGroupAdults = deleteLessonGroupAdults;
      vm.deleteLessonGroupChildren = deleteLessonGroupChildren;
      vm.deleteLessonGroupMini = deleteLessonGroupMini;
      vm.deleteLessonPrivate = deleteLessonPrivate;
      vm.addLessonGroupAdults = addLessonGroupAdults;
      vm.addLessonGroupChildren = addLessonGroupChildren;
      vm.addLessonGroupMini = addLessonGroupMini;
      vm.addLessonPrivate = addLessonPrivate;
      vm.addDisabilityLessons = addDisabilityLessons;
      vm.moveLessonGroupToPrivate = moveLessonGroupToPrivate;
      vm.moveLessonToGroup = moveLessonToGroup;

      vm.isCollapsed = {
        group: false,
        private: false,
        disabled: false,
      };
    }

    ///////////

    function isResultsEmpty(results) {
      return angular.equals(results, EMPTY_RESULTS);
    }

    function createLessons() {
      return Lesson.newFromDates(vm.dates, 4, null);
    }

    /**
     * Create group lessons (adults, children & mini)
     * Check the lessons' candidates
     *  if there is at least one first-timer, mark the FIRST lesson
     *  i.e. lessons[0].isFirstTimeLesson = true
     */
    function createGroupLessons(type) {
      let lessons = createLessons();

      // Finds FTs
      const candidates = vm.participants[type];
      const firstTimers = _.filter(candidates, 'isFirstTimer');

      // Loops through 3 kinds of activities
      for (const activity of settings.ACTIVITY_TYPES.default) {
        // Finds all the FTs belong to this activity
        const fts = _.filter(firstTimers, ft => {
          const activities = JSON.parse(ft.activities);
          return activities[`${activity.toLowerCase()}Chosen`];
        });

        // If there's no such FT, ignores this activity
        if (_.isEmpty(fts)) continue;

        let ftLesson = Lesson.build(
          vm.dates[0],
          4,
          [...fts],
          settings.TIME_OPTIONS[1],
          activity,
          true
        );

        lessons.push(ftLesson);
      }

      return lessons;
    }

    function createAllLessons() {
      // TODO: Look for a better way to do this
      vm.results.private.lessons = createLessons();

      const types = ['adults', 'children', 'mini'];

      for (const type of types) {
        vm.results.group[type] = createGroupLessons(type);
      }
    }

    function deleteLesson(lessonsList, lesson) {
      let idx = lessonsList.indexOf(lesson);

      if (idx < 0) return console.log('Cannot find lesson: ' + lesson);

      console.log('Delete lesson in: ' + lesson);
      lessonsList.splice(idx, 1);
    }

    function deleteLessonGroupAdults(lesson) {
      let lessonsList = vm.results.group.adults;
      return deleteLesson(lessonsList, lesson);
    }

    function deleteLessonGroupChildren(lesson) {
      let lessonsList = vm.results.group.children;
      return deleteLesson(lessonsList, lesson);
    }

    function deleteLessonGroupMini(lesson) {
      let lessonsList = vm.results.group.mini;
      return deleteLesson(lessonsList, lesson);
    }

    function deleteLessonPrivate(lesson) {
      let lessonsList = vm.results.private.lessons;
      return deleteLesson(lessonsList, lesson);
    }

    function addLessonToDate(lessonsList, date) {
      lessonsList.push(Lesson.createNew(date, 4, null));
    }

    function addLessonGroupAdults(date) {
      return addLessonToDate(vm.results.group.adults, date);
    }

    function addLessonGroupChildren(date) {
      return addLessonToDate(vm.results.group.children, date);
    }

    function addLessonGroupMini(date) {
      return addLessonToDate(vm.results.group.mini, date);
    }

    function addLessonPrivate(date) {
      return addLessonToDate(vm.results.private.lessons, date);
    }

    function addDisabilityLessons(results) {
      return vm.results.disability.push(results);
    }

    function moveLessonGroupToPrivate(lesson) {
      // Makes a copy
      let copied = Lesson.copy(lesson);

      // Adds to the private lessons
      vm.results.private.lessons.push(copied);
    }

    function moveLessonToGroup(lesson) {
      // Makes a copy
      let copied = Lesson.copy(lesson);

      // Assumes that there is a movedFrom in lesson
      const type = copied.movedFrom.split('.')[1];
      delete copied.movedFrom;

      // Adds to the equivalent group lessons
      vm.results.group[type].push(copied);
    }
  }
})();
