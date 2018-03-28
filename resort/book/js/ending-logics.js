(function () {
    'use strict';

    // Notifies the parent window that I'm ready
    window.parent.postMessage({
        msg: 'LESSONS_READY'
    }, '*');
})();
