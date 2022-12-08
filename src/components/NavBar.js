import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NavList from "./NavList";
import NavMenu from "./NavBarMenu";
import Button from "react-bootstrap/Button";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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
            <UserAuth />
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

function UserAuth() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    //still waiting
    return <p>Initializing user</p>;
  }

  if (error) {
    //error logging in
    return <p>Error: {error}</p>;
  }

  if (user) {
    //user is defined, so logged in
    return <NavMenu user={user} />;
  } else {
    //user is undefined
    return (
      <div>
        <Button
          variant="success"
          onClick={() => {
            window.location.replace("/login");
          }}
        >
          Log In
        </Button>{" "}
      </div>
    );
  }
}
