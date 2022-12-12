import React, { useEffect } from "react";
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
//import reactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Stars, calcRating } from "../components/Stars";

export default function SiteCard(props) {
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <p>Loading user data</p>
  }

  if(error) {
    return <p>There is an error: {error}</p>
  }

  const singleSiteData = props.singleSiteData;
  const state = props.state;
  const name = props.singleSiteData.siteName;
  
  if (singleSiteData.ratings === undefined) {
    singleSiteData.ratings = [0, 0, 0, 0, 0];
  }
  
  let imgSrc;
  let handleClick;
  if (user) {
    const userID = getAuth().currentUser.uid;

    let handleClick = function (event) {
      console.log("clicked");
      const stateCopy = { ...props.state };
      const userID = getAuth().currentUser.uid;
      const db = getDatabase();
      const bookmarkRef = ref(db, "sitesDetail/" + name + "/usersBookmarked/" + "/" + userID);
      stateCopy[name].bookmarked = !stateCopy[name].bookmarked;
        if (stateCopy[name].usersBookmarked === undefined || stateCopy[name].usersBookmarked[userID] === false) {
          stateCopy[name].usersBookmarked[userID] = true;
          console.log("hello");
        } else if (props.state[name].usersBookmarked[userID] === true) {
          stateCopy[name].usersBookmarked[userID] = false;
          console.log("Hello");
        }
        props.setState(stateCopy);
        set(bookmarkRef, stateCopy[name].usersBookmarked[userID]);
    }

      if (
        //props.state === undefined ||
        //props.state[name] === undefined ||
        props.state[name].usersBookmarked === undefined ||
        props.state[name].usersBookmarked[userID] === false
      ) {
        imgSrc = "./img/bookmark.png";
      } else if (props.state[name].usersBookmarked[userID] === true || props.state[name].bookmarked) {
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
  } else {
    const handleClick = function (event) {
    
      const stateCopy = {...props.state};
     
     stateCopy[name].bookmarked = !stateCopy[name].bookmarked;
      props.setState(stateCopy);
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
}
