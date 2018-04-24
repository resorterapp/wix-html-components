(function () {
  'use strict';

  angular
    .module('BookingLessonApp')
    .factory('Wix', Wix);

  Wix.$inject = ['$window', 'rx'];

  function Wix($window, rx) {
    let subject = new rx.Subject();
    let data = {};
    let msgOrigin = '{{ site.post_message_origin }}';

    return {
      msgOrigin: msgOrigin,
      getData: getData,
      setData: setData,
      subscribe: subscribe,
      sendMessage: sendMessage
    };

    ////////////

    function getData() {
      return data;
    }

    function setData(newData) {
      data = newData;

      // Notifies the subscribers
      subject.onNext(newData);
    }

    function subscribe(ob) {
      return subject.subscribe(ob);
    }

    function sendMessage(msgObj) {
      $window.parent.postMessage(msgObj);
    }
  }
})();
