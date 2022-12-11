import React, { useEffect } from "react";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
//import reactDOM from "react-dom/client";
import { Link } from "react-router-dom";

import { Stars, calcRating } from "../components/Stars";

export default function SiteCard(props) {
  const singleSiteData = props.singleSiteData;
  if (singleSiteData.ratings === undefined) {
    singleSiteData.ratings = [0, 0, 0, 0, 0];
  }
  const state = props.state;
  const name = props.singleSiteData.siteName;

  let cardName;

  const handleClick = function (event) {
    const stateCopy = { ...props.state };
    /*
    if (!stateCopy[name].bookmarked) {
      console.log("bookmarked");
      stateCopy[name].bookmarked = true;
    } else {
        stateCopy[name].bookmarked = false;
        console.log("not bookmarked");
    } */
    stateCopy[name].bookmarked = !stateCopy[name].bookmarked;
    props.setState(stateCopy);
  };

  let imgSrc;
  if (state[name] === undefined) {
    //console.log("!!!" + name);
  } else {
    if (props.state[name].bookmarked) {
      imgSrc = "./img/bookmark-filled.png";
    } else {
      imgSrc = "./img/bookmark.png";
    }
  }

  /* if (state[name] === undefined) {
    //console.log("!!!" + name);
  } else {
    if (state[name].bookmarked) {
      imgSrc = "./img/bookmark-filled.png";
    } else {
      imgSrc = "./img/bookmark.png";
    }
  } */
  let nameNoSpace = singleSiteData.title.replace(/\s+/g, '-');
  //console.log(nameNoSpace);
  let nameWithSpace = singleSiteData.title.replace('-', ' ');
  //console.log(props.state);
  //console.log(nameWithSpace);
  return (
    <div
      className="card-container"
      data-state={singleSiteData.state}
      data-type={singleSiteData.siteType}
    >
      <div
        className="site-card"
        onClick={(event) => {
          if (!event.target.classList.contains("bookmark")) {
            window.location.href = "/site?siteName=" + singleSiteData.title;
          }
        }}
      >
        <img src={singleSiteData.imgSrc} alt={singleSiteData.imgAlt} />
        <input
          id="bookmark-button"
          type="image"
          src={imgSrc}
          className="bookmark"
          onClick={handleClick}
          aria-label="bookmark button"
        />
        <h2>{singleSiteData.siteName}</h2>
        <h3>{singleSiteData.siteFact}</h3>
        <p>{singleSiteData.siteLocation}</p>
        <div className="card-rating">
          <Stars starCount={calcRating(singleSiteData.ratings)} />
          <h3>
            {calcRating(singleSiteData.ratings).toFixed(1) + "" !== "NaN"
              ? calcRating(singleSiteData.ratings).toFixed(1) + "/5"
              : "No rating"}
          </h3>
        </div>
      </div>
    </div>
  );
}
