/**
 * Created by Luan Nguyen on 28/5/18
 */
(ElementsTestController)();

function ElementsTestController() {
  'use strict';

  init();

  //////////

  function init() {
    window.onmessage = windowOnMessage;

    document.getElementById('myFrame').src = './store-card.html';
  }

  function windowOnMessage(event) {
    if (!event.data || event.data.msg === 'STRIPE_READY') return;


    const data = event.data;
    const $resultsText = document.getElementById('results-text');
    $resultsText.innerHTML = JSON.stringify(data);
  }
}
