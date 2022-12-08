import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import Fade from "react-bootstrap/Fade";

export default function NavMenu(props) {
  //  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Dropdown /*
      onMouseLeave={() => {
        setShowDropdown(false);
      }}
      onMouseOver={() => {
        setShowDropdown(true);
      }}*/
    >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <div>
          <img className="avatar" src="/img/ava.jpg" alt="avatar" />
          <p id="nav-username">{props.userName}</p>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu /*show={showDropdown}*/>
        <Dropdown.Item href="/newSite">
          <FontAwesomeIcon icon={faCloudArrowUp} />
          New Site
        </Dropdown.Item>
        <Dropdown.Item href="/bookmarks">Bookmarks</Dropdown.Item>
        <Dropdown.Item>Dark Mode</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Personal settings</Dropdown.Item>
        <Dropdown.Item
          href="#/action-4"
          onClick={() => {
            const auth = getAuth();
            signOut(auth).catch((err) => console.log(err));
          }}
        >
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
