import React, { useState } from "react";
import reactDOM from "react-dom/client";

import { Stars, calcRating } from "../components/Stars";

export default function SiteCard(props) {
  const bookmarks = props.bookmarks;
  const setBookmarks = props.setBookmarks;

  //console.log(bookmarks);

  const singleSiteData = props.singleSiteData;
  const [bookmarked, setBookmarked] = useState(false);

  const handleClick = function (event) {
    const bookmarkedCard = event.target.parentNode;
    console.log(bookmarkedCard);
    const bookmarksCopy = new Set(...bookmarks);
    const bookmarksArr = [...bookmarks];

    if (bookmarksCopy.has(bookmarkedCard)) {
      bookmarksCopy.delete(bookmarkedCard);
    } else {
      bookmarksCopy.add(bookmarkedCard);
    }

    if (bookmarksArr.includes(bookmarkedCard)) {
      bookmarksArr.pop(bookmarkedCard);
    } else {
      bookmarksArr.push(bookmarkedCard);
    }
    //console.log(bookmarksCopy);
    //console.log("below is array");
    //console.log(bookmarksArr);
    //console.log(bookmarkCopy);
    setBookmarks(bookmarksCopy);
    setBookmarked(!bookmarked);
  };

  let imgSrc;
  if (bookmarked) {
    imgSrc = "./img/bookmark-filled.png";
  } else {
    imgSrc = "./img/bookmark.png";
  }

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
            window.location.href = "/site/" + singleSiteData.title;
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
