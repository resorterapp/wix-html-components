/**
 * Created by Luan Nguyen on 24/4/18
 */
(function () {
  'use strict';

  let elem = document.querySelector('input[type="range"]');
  let target = document.querySelector('.value');

  elem.oninput = rangeValue;
  elem.onchange = buttonClick;

  function rangeValue () {
    const newValue = elem.value;
    target.innerHTML = newValue;
  }

  function buttonClick() {
    window.parent.postMessage(elem.value, '*');
  }
})();
