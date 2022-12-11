import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import allSites from "../data/allSites.json";
import { getDatabase, ref, child, get, set} from "firebase/database";
import { getAuth } from "firebase/auth";
import { commentSite } from "../components/EditSiteInfo";
import { useAuthState } from "react-firebase-hooks/auth"


import {
  RateStars,
  Stars,
  StarDistribution,
  calcRating,
} from "../components/Stars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSearchParams } from "react-router-dom";

function jumpTo(target) {
  window.location.replace("#" + target);
}

export default function HomePage(props) {

  const [searchParams] = useSearchParams();
  let siteName = searchParams.get("siteName");
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const cardsRef = ref(db);
    get(child(cardsRef, "sitesDetail/" + siteName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
        console.log("sitesDetail/" + siteName);
      })
      .then((siteData) => {
        setData(siteData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    console.log(data.bannerImg);
    return (
      <div>
        <div
          className="site-page-header"
          style={{ backgroundImage: `url(${data.bannerImg})` }}
        >
          <div className="site-page-title-box">
            <h1 className="site-page-title">{data.title}</h1>{" "}
          </div>
        </div>
        <div className="sites-info-container">
          <SideBarLeft />
          <div>
            <SiteIntro text={data.intro} />
            <SiteGallery data={data} />
            <SiteMap data={data} />
            <SiteRating ratings={data.ratings} />
            <SiteComment siteName={data.title} />
          </div>
          <SideBarRight />
          <div className="balancer"></div>
        </div>
      </div>
    );
  }
}

function SideBarLeft(props) {
  return (
    <div className="index-bar side-bar">
      <ul>
        <li
          onClick={() => {
            jumpTo("site-introduction");
          }}
        >
          Introduction
        </li>
        <li
          onClick={() => {
            jumpTo("site-gallery");
          }}
        >
          Gallery
        </li>
        <li
          onClick={() => {
            jumpTo("site-map");
          }}
        >
          Location
        </li>
        <li
          onClick={() => {
            jumpTo("site-rating");
          }}
        >
          Ratings
        </li>
      </ul>
    </div>
  );
}

function SiteIntro(props) {
  return (
    <div className="site-info" id="site-introduction">
      <h2>Introduction</h2>
      {props.text.map((element, index) => (
        <p key={"paragraph" + index}>{element}</p>
      ))}
    </div>
  );
}

function SiteGallery(props) {
  const data = props.data;

  return data.gallery !== undefined ? (
    <div id="site-gallery">
      <Carousel className="gallery">
        {data.gallery.map((element, index) => {
          return (
            <div key={"img" + index}>
              <img src={"/img/" + data.title + "/" + element} />
            </div>
          );
        })}
      </Carousel>
    </div>
  ) : (
    <div></div>
  );
}

function SiteMap(props) {
  const data = props.data;
  return (
    <div className="map-info" id="site-map">
      <div className="location-info">
        <h3>State</h3>
        <p>{data.stateFull}</p>
        <h3>Location</h3>
        <p>{data.location}</p>
      </div>
      <iframe
        referrerPolicy="no-referrer-when-downgrade"
        src={
          "https://www.google.com/maps/embed/v1/place?key=AIzaSyCOj2Uhxker2xOnU5VMLKLqIhkBIoyTBQ0&q=" +
          data.mapName
        }
        allowFullScreen
      ></iframe>
    </div>
  );
}

function SiteRating(props) {
  const ratings = props.ratings;
  return (
    <div className="site-info" id="site-rating">
      <div className="rating">
        <div className="rating-brief">
          <h3>Rating</h3>
          {calcRating(ratings).toFixed(1) + "" !== "NaN" ? (
            <h4>
              <span className="rating-score">
                {calcRating(ratings).toFixed(1)}
              </span>
              /5
            </h4>
          ) : (
            <h3>No rating</h3>
          )}
          <Stars starCount={calcRating(ratings)} />
          <p>
            {ratings.reduce((element, total) => (total += element))} Reviews
          </p>
        </div>
        <div className="rating-detail">
          <StarDistribution stars={ratings} />
        </div>
      </div>
    </div>
  );
}

function SideBarRight(props) {
  return (
    <div className="operation-bar side-bar">
      <ul>
        <li
          tabIndex="0"
          className="popover-content"
          role="button"
          data-toggle="popover"
          data-trigger="focus"
          title="Add to Bookmark"
        >
          <i className="fa-regular fa-bookmark"></i>
        </li>
        <li
          tabIndex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Share"
        >
          <i className="fa-solid fa-share-from-square"></i>
        </li>
        <li
          tabIndex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Print"
        >
          <i className="fa-solid fa-print"></i>
        </li>
        <li
          tabIndex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Add to Calendar"
        >
          <i className="fa-regular fa-calendar-plus"></i>
        </li>
      </ul>
    </div>
  );
}

function SiteComment(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [comment, setComment] = useState("")
  const db = getDatabase()
  const userID = getAuth().currentUser.uid;
  const users = ref(db, 'comments/' + userID);
  set(users, 'test to see if creating the subfolder works for now')
  let starCount;
  //const handleClick = (event) => {
    //setComment(true);
    //event.preventDefault();
  //}
 
  function setStarCount(count) {
    starCount = count;
  }
  return (
    <div className="site-info" id="site-comment">
      <h2>Write a review</h2>
      <div className="write-review">
      <textarea onChange= {(e)=> {setComment(e.target.value)}} placeholder="Write a review..."></textarea>

        <RateStars setStarCount={setStarCount} />
        <button
          onClick={() => {
            

            if (starCount !== 0) {
              commentSite(props.siteName, starCount);
            }
            if(!user) {
              <p>Error you must log in</p>
            }

          }}
        >
          Submit!
        </button>
      </div>
    </div>
  );
}
