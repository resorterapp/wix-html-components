/**
 * Created by Luan Nguyen on 24/4/18
 */
(function () {
  'use strict';

  const STARTING_LEVEL = 1;
  let rangeSlider;
  let displayValue;

  init();

  function init() {
    rangeSlider = document.querySelector('input#range1');
    displayValue = document.querySelector('.value');

    rangeSlider.oninput = rangeValue;
    rangeSlider.onchange = buttonClick;

    let params = (new URL(document.location)).searchParams;
    rangeSlider.max = params.get('max');
    rangeSlider.min = params.get('min');

    window.onmessage = receiveMsg;
    window.onload = () => {
      // Tells Wix that I'm loaded
      postMsg('LOADED!');
    };
  }

  function rangeValue () {
    displayValue.innerHTML = rangeSlider.value;
  }

  function buttonClick() {
    postMsg(parseInt(rangeSlider.value));
  }

  function postMsg(msg) {
    window.parent.postMessage(msg, '*');
  }

  function receiveMsg(event) {
    let value = parseInt(event.data) || STARTING_LEVEL;
    rangeSlider.value = value;
    displayValue.innerHTML = value;
  }
})();
