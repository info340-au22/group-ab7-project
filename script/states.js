'use strict';

(function() {
  window.addEventListener('load', init);

  /**
   * initlization of the program.
   */
  function init() {
    let stateCards = qsa(".state-card");
    for (let i = 0; i < stateCards.length; i++) {
      stateCards[i].addEventListener("mouseover", showStateInfo);
    }
  }

  function showStateInfo(event) {
    console.log("hello!");
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
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();