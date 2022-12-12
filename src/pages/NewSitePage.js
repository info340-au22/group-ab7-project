import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleSiteStatus, createSite } from "../components/EditSiteInfo";
import { getAuth } from "firebase/auth";

export default function NewSitePage(props) {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [newSiteInfo, setNewSiteInfo] = useState({
    name: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    createSite(newSiteInfo.name, user.uid);
    navigate("/editSite?siteName=" + newSiteInfo.name);
  }

  const handleChange = (event) => {
    setNewSiteInfo({ ...newSiteInfo, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div class="site-info">
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <div>
            <h3>Add A New Site</h3>
          </div>{" "}
          <label>
            Site Name:
            <input name="name"></input>
          </label>
          <button>Go edit the site</button>
        </form>
      </div>
    </div>
  );
}
