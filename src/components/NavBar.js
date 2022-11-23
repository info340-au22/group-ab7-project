import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function NavBar(props) {
  //console.log(faMagnifyingGlass);
  return (
    <header>
      <nav>
        <div className="titlecore">
          <div>
            <ul>
              <li className="title">
                <a href="/home">
                  <img
                    className="page-icon"
                    src="/img/icon.png"
                    alt="Website Icon"
                  />
                </a>
              </li>
              <li className="nav-option">
                <Link to="/states">States</Link>
              </li>
              <li className="nav-option">
                <Link to="/sites">Sites</Link>
              </li>
              <li className="nav-option">
                <Link to="/savedsites">Saved Sites</Link>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="search-bar">
              <input
                id="nav-search-input"
                type="text"
                placeholder="Search.."
                onKeyDown={(event) => {
                  if (event.which === 13) {
                    goSearch();
                  }
                }}
              />
              <button type="submit" onClick={goSearch}>
                <FontAwesomeIcon
                  className="search-icon"
                  icon={faMagnifyingGlass}
                />
              </button>
            </div>
            <img className="avatar" src="/img/ava.jpg" alt="avatar" />
          </div>
        </div>
      </nav>
    </header>
  );
}

function goSearch() {
  window.location.href =
    "/sites?search=" + document.getElementById("nav-search-input").value;
}
