(function () {
  // Notifies the parent window that I'm ready
  window.onload = function () {
    window.parent.postMessage({
      msg: 'LESSONS_READY'
    }, '*');
  };
})();
