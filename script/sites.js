'use strict';

(function () {
  window.addEventListener('load', init);

  /**
   * initlization of the program.
   */
  function init() {
    let filters = qsa(".filter li");
    for (let i = 0; i < filters.length; i++) {
      filters[i].addEventListener("click", filterClicked);
    }
  }

  function filterClicked(event) {
    let current = event.currentTarget;
    current.children[0].children[1].classList.remove("hidden");
    current.classList.add("selected");
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