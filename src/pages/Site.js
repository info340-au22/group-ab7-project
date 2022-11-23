import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import allSites from "../data/allSites.json";
import {
  RateStars,
  Stars,
  StarDistribution,
  calcRating,
} from "../components/Stars";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function jumpTo(target) {
  window.location.replace("#" + target);
}

export default function HomePage(props) {
  let data = allSites[props.site];
  return (
    <div>
      <NavBar></NavBar>
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
          <SiteComment />
        </div>
        <SideBarRight />
        <div class="balancer"></div>
      </div>

      <Footer></Footer>
    </div>
  );
}

function SideBarLeft(props) {
  return (
    <div class="index-bar side-bar">
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
  return (
    <div id="site-gallery">
      <Carousel className="gallery">
        {data.gallery.map((element) => {
          console.log("/img/" + data.title + "/" + element);
          return (
            <div>
              <img src={"/img/" + data.title + "/" + element} />
            </div>
          );
        })}
      </Carousel>
    </div>
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
    <div class="operation-bar side-bar">
      <ul>
        <li
          tabindex="0"
          class="popover-content"
          role="button"
          data-toggle="popover"
          data-trigger="focus"
          title="Add to Bookmark"
        >
          <i class="fa-regular fa-bookmark"></i>
        </li>
        <li
          tabindex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Share"
        >
          <i class="fa-solid fa-share-from-square"></i>
        </li>
        <li
          tabindex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Print"
        >
          <i class="fa-solid fa-print"></i>
        </li>
        <li
          tabindex="0"
          role="button"
          data-toggle="popover"
          data-trigger="hover"
          title="Add to Calendar"
        >
          <i class="fa-regular fa-calendar-plus"></i>
        </li>
      </ul>
    </div>
  );
}

function SiteComment(props) {
  return (
    <div className="site-info" id="site-comment">
      <h2>Write a review</h2>
      <div className="write-review">
        <textarea placeholder="Write a review..."></textarea>

        <RateStars />
      </div>
    </div>
  );
}
