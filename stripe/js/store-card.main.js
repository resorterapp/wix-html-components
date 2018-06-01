/**
 * Created by Luan Nguyen on 28/5/18
 */
(StoreCardComponentController)();

function StoreCardComponentController() {
  'use strict';

  init();

  //////////

  function init() {
    // Handles messages from the outer guy
    window.onmessage = receiveMessage;

    // Tells the outer guy I'm loaded
    window.onload = function () {
      postMessage({
        msg: 'STRIPE_READY'
      });
    };

    // Initiates Stripe
    initStripe();
  }

  function postMessage(msg) {
    window.parent.postMessage(msg, '*');
  }

  function receiveMessage(event) {
    if (!event.data) {
      throw new Error('[STRIPE_ELEMENTS] Wrong format of message!');
    }
  }

  /**
   * Handle Stripe token when the user submits
   * @param token
   */
  function stripeTokenHandler(token) {
    postMessage({
      msg: 'STRIPE_TOKEN',
      data: {
        stripeToken: token
      }
    });
  }

  function initStripe() {
    // Creates a Stripe client
    const stripe = Stripe('pk_test_1uptoUzTpxwotcXDMf349fDs');

    // Create an instance of Elements.
    const elements = stripe.elements();

    // Create an instance of the card Element.
    const $card = elements.create('card');

    // Add an instance of the card Element into the `card-element` <div>.
    $card.mount('#card-element');

    // Binds events
    // Handles card's errors
    $card.addEventListener('change', cardOnChange);
    // Handles form submission
    const $form = document.getElementById('store-card-form');
    $form.addEventListener('submit', storeCardFormOnSubmit);

    //////////

    /**
     * Handle real-time validation errors from the card Element.
     * @param event Event with attached error message
     */
    function cardOnChange(event) {
      let displayError = document.getElementById('card-errors');
      displayError.textContent = event.error ? event.error.message : '';
    }

    /**
     * Handle store-card-form submit event
     * @param event
     */
    function storeCardFormOnSubmit(event) {
      event.preventDefault();

      stripe.createToken($card)
        .then(function (result) {
          if (result.error) {
            // Inform the user if there was an error.
            let $errorElement = document.getElementById('card-errors');
            $errorElement.textContent = result.error.message;
          } else {
            // Send the token to your server.
            stripeTokenHandler(result.token);
          }
        });
    }
  }
}
