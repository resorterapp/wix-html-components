/**
 * Created by Luan Nguyen on 24/4/18
 */
(function () {
  'use strict';

  const VALUES = [
    'Yellow',
    'Green (Light)',
    'Green (Dark)',
    'Blue (Light)',
    'Blue (Dark)',
    'Black (Light)',
    'Black (Dark)',
  ];
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
  }

  function rangeValue () {
    displayValue.innerHTML = rangeSlider.value;
  }

  function buttonClick() {
    window.parent.postMessage(VALUES[parseInt(rangeSlider.value) - 1], '*');
  }

  function receiveMsg(event) {
    // LN Continue working on this
    rangeSlider.value = parseInt(event.data) + 1;
  }
})();
