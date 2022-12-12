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

  //let cardName;

  //firebase work
  // how to get userID for their own bookmark node
  const userID =
    getAuth().currentUser !== null ? getAuth().currentUser.uid : "";
  const db = getDatabase();
  const sitesDetail = ref(db, "sitesDetail");

  /* useEffect(() => {
    const db = getDatabase();
    const sitesDetail = ref(db, "sitesDetail/" + name);

    const unregisterFunction = onValue(sitesDetail, (snapshot) => {
      const changedValue = snapshot.val();
      //console.log(changedValue);
      //setState(changedValue);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, []);

  /*useEffect(() => {
    const db = getDatabase();
    const sitesUserRef = ref(db, "sitesDetail");
    
    const unregisterFunction = onValue(sitesDetail, (snapshot) => {
      const changedValue = snapshot.val();
      //set(sitesUserRef, props.state);
      //props.setState(changedValue);
      set(sitesUserRef, changedValue);
    })

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, []) */

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
    const userID = getAuth().currentUser.uid;
    const db = getDatabase();
    const bookmarkRef = ref(
      db,
      "sitesDetail/" + name + "/usersBookmarked/" + "/" + userID
    );
    stateCopy[name].bookmarked = !stateCopy[name].bookmarked;

    /*if (stateCopy[name].usersBookmarked === undefined) {
      stateCopy[name].usersBookmarked = {userID : false};
    } */

    set(bookmarkRef, stateCopy[name].usersBookmarked[userID]);
    if (
      stateCopy[name].usersBookmarked === undefined ||
      stateCopy[name].usersBookmarked[userID] === false
    ) {
      stateCopy[name].usersBookmarked[userID] = true;
    } else if (props.state[name].usersBookmarked[userID] === true) {
      stateCopy[name].usersBookmarked[userID] = false;
    }
    //stateCopy[name].bookmarked = !stateCopy[name].bookmarked;

    //const bookmarkedBoolean = get(bookmarkRef);
    props.setState(stateCopy);
  };

  let imgSrc;
  //console.log(userID);
  //console.log(props.state[name].usersBookmarked === undefined);
  if (
    props.state === undefined ||
    props.state[name] === undefined ||
    props.state[name].usersBookmarked === undefined ||
    props.state[name].usersBookmarked[userID] === false
  ) {
    imgSrc = "./img/bookmark.png";
  } else if (props.state[name].usersBookmarked[userID] === true) {
    imgSrc = "./img/bookmark-filled.png";
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
  let nameNoSpace = singleSiteData.title.replace(/\s+/g, "-");
  //console.log(nameNoSpace);
  let nameWithSpace = singleSiteData.title.replace("-", " ");
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
