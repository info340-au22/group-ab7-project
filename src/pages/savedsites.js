import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import React, { useState } from "react";
import SiteCard from "../components/SiteCard";

export default function SavedSites(props) {
  const [bookmarkedSites, setBookmarked] = useState([]);
  const bookmarks = props.savedSites;
  let view;
  //console.log(bookmarks);
  /* const bookmarkedCards = bookmarks.map((currentObj) => {
    return currentObj.innerHTML;
  }); */

  //console.log(bookmarkedCards);

  if (bookmarks.size === 0) {
    view = <p> You have no saved sites </p>;
  } else {
    view = bookmarks;
  }
  console.log(view);
  return (
    <div>
      <NavBar></NavBar>
      <h1> Your Saved Sites </h1>
      {view}
      <Footer></Footer>
    </div>
  );
}

/*
<div
      className="card-container"
      data-state={singleSiteData.state}
      data-type={singleSiteData.siteType}
    >
      <div className="site-card">
        <img src={singleSiteData.imgSrc} alt={singleSiteData.imgAlt} />
        <input
          type="image"
          src={imgSrc}
          className="bookmark"
          onClick={handleClick}
        />
        <h2>{singleSiteData.siteName}</h2>
        <h3>{singleSiteData.siteFact}</h3>
        <p>{singleSiteData.siteLocation}</p>
      </div>
    </div>
    */