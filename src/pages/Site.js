import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import allSites from "../data/allSites.json";
import { Stars, StarDistribution, calcRating } from "../components/Stars";

export default function HomePage(props) {
  let data = allSites[props.site];
  console.log(calcRating(data.ratings).toFixed(1));
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
        <div className="site-info">
          <h2>Introduction</h2>
          {data.intro.map((element, index) => (
            <p key={"paragraph" + index}>{element}</p>
          ))}
        </div>
      </div>
      <div className="sites-info-container">
        <div className="map-info">
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
      </div>
      <div className="sites-info-container">
        <div className="site-info">
          <div className="rating">
            <div className="rating-brief">
              <h3>Rating</h3>
              {calcRating(data.ratings).toFixed(1) + "" !== "NaN" ? (
                <h4>
                  <span className="rating-score">
                    {calcRating(data.ratings).toFixed(1)}
                  </span>
                  /5
                </h4>
              ) : (
                <h3>No rating</h3>
              )}
              <Stars starCount={calcRating(data.ratings)} />
              <p>
                {data.ratings.reduce((element, total) => (total += element))}{" "}
                Reviews
              </p>
            </div>
            <div className="rating-detail">
              <StarDistribution stars={data.ratings} />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
