'use strict';

(function () {
  window.addEventListener('load', init);

  /**
   * initlization of the program.
   */
  function init() {
    // let stateCards = qsa(".state-card");
    qs(".washington").addEventListener("mouseover", showWAInfo);
    qs(".nevada").addEventListener("mouseover", showNVInfo);
    qs(".oregon").addEventListener("mouseover", showORInfo);
    qs(".california").addEventListener("mouseover", showCAInfo);
    qs(".idaho").addEventListener("mouseover", showIDInfo);
    qs(".olympic-nation-park").addEventListener("click", olympicParkPage);
  }

  /**
   * jump to the olympic park pgae.
   */
  function olympicParkPage() {
    window.location.href = "olympic-nation-park.html";
  }

  /**
   * hide all state info
   */
  function hideAllInfo() {
    let stateCards = qsa(".state-info");
    for (let i = 0; i < stateCards.length; i++) {
      stateCards[i].classList.add("hidden");
    }
  }

  /**
   * shows info of washington state
   * @param {event} event
   */
  function showWAInfo(event) {
    hideAllInfo();
    qs(".washington-info").classList.remove("hidden");
  }

  /**
   * shows info of nevada state
   * @param {event} event
   */
  function showNVInfo(event) {
    hideAllInfo();
    qs(".nevada-info").classList.remove("hidden");
  }

  /**
   * shows info of oregon state
   * @param {event} event
   */
  function showORInfo(event) {
    hideAllInfo();
    qs(".oregon-info").classList.remove("hidden");
  }

  /**
   * shows info of california state
   * @param {event} event
   */
  function showCAInfo(event) {
    hideAllInfo();
    qs(".california-info").classList.remove("hidden");
  }

  /**
   * shows info of idaho state
   * @param {event} event
   */
  function showIDInfo(event) {
    hideAllInfo();
    qs(".california-info").classList.remove("hidden");
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {HTMLElement} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {HTMLElement} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns an  elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {HTMLElement} - the DOM objects matching the given query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();