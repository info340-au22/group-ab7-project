import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NavList from "./NavList";
import NavMenu from "./NavBarMenu";
import Button from "react-bootstrap/Button";

export default function NavBar(props) {
  //console.log(faMagnifyingGlass);
  NavList();

  return (
    <header>
      <nav>
        <div className="titlecore">
          <div>
            <ul>
              <li className="title">
                <img
                  className="page-icon"
                  src="/img/icon.png"
                  alt="Website Icon"
                />
              </li>
              <NavList></NavList>
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
            <NavMenu />
            <Button
              variant="success"
              onClick={() => {
                window.location.replace("/login");
              }}
            >
              Log In
            </Button>{" "}
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
