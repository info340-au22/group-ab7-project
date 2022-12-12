import React, { useEffect } from "react";
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
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

  const userID = getAuth().currentUser.uid;
  //const db = getDatabase();
  //const sitesDetail = ref(db, "sitesDetail");

  // perhaps have an effect hook here
  useEffect(() => {
    const db = getDatabase();
    const singleSiteDetailRef = ref(db, "sitesDetail/" + name);
    
    const unregisterFunction = onValue(singleSiteDetailRef, (snapshot) => {
      const changedValue = snapshot.val();
      
      const valueObjectKeys = Object.keys(changedValue);
      if (!valueObjectKeys.includes("usersBookmarked")) {
        console.log("Doesn't have it!");
        //valueObjectKeys.push("usersBookmarked");
        //console.log(changedValue);
        //set(singleSiteDetailRef, );
      }
      //console.log(valueObjectKeys);



      //console.log(changedValue);
      //setState(changedValue);
    })

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, [])









  const handleClick = function (event) {
    const stateCopy = { ...props.state };
    
    // some testing to do...
    // if the site object doesn't have usersBookmarked obj, give it one
    // also has to put user id??? 



    const userID = getAuth().currentUser.uid;
    const db = getDatabase();
    const bookmarkRef = ref(db, "sitesDetail/" + name + "/usersBookmarked/" + "/" + userID);
    stateCopy[name].bookmarked = !stateCopy[name].bookmarked;



      if (stateCopy[name].usersBookmarked === undefined || stateCopy[name].usersBookmarked[userID] === false) {
        stateCopy[name].usersBookmarked[userID] = true;
      } else if (props.state[name].usersBookmarked[userID] === true) {
        stateCopy[name].usersBookmarked[userID] = false;
      }
      
      props.setState(stateCopy);
      set(bookmarkRef, stateCopy[name].usersBookmarked[userID]);
  };

  let imgSrc;
  
  if (
    props.state[name].usersBookmarked === undefined ||
    props.state[name].usersBookmarked[userID] === false
  ) {
    imgSrc = "./img/bookmark.png";
  } else if (props.state[name].usersBookmarked[userID] === true) {
    imgSrc = "./img/bookmark-filled.png";
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
          if (
            props.clickable !== "false" &&
            !event.target.classList.contains("bookmark")
          ) {
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
