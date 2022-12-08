import React, { useState } from "react"; import { useNavigate } from "react-router-dom";
import { toggleSiteStatus, createSite } from "../components/EditSiteInfo";

export default function NewSitePage(props) {
  const navigate = useNavigate();
  const [newSiteInfo, setNewSiteInfo] = useState({
    name: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    createSite(newSiteInfo.name);
    navigate("/editSite?siteName=" + newSiteInfo.name);
  }

  const handleChange = (event) => {
    setNewSiteInfo({ ...newSiteInfo, [event.target.name]: event.target.value });
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          <h3>Add New Site</h3>
        </div>{" "}
        <label>
          Site Name:
          <input type="text" name="name" placeholder="Name" />
        </label>
        <button>Go edit the site</button>
      </form>
    </div>
  );
}
