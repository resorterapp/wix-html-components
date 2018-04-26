/**
 * Created by Luan Nguyen on 24/4/18
 */
(function () {
  'use strict';

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
  }

  function rangeValue () {
    displayValue.innerHTML = rangeSlider.value;
  }

  function buttonClick() {
    window.parent.postMessage(parseInt(rangeSlider.value), '*');
  }

  function receiveMsg(event) {
    rangeSlider.value = parseInt(event.data);
  }
})();
