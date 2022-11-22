import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import allSites from "../data/allSites.json";

export default function HomePage(props) {
  let data = allSites[props.site];
  console.log(data);
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
          {data.intro.map((element) => <p>{element}</p>)}
        </div>
      </div>
      <div className="sites-info-container">
        <div className="map-info">
          <div class="location-info">
            <h3>State</h3>
            <p>{data.state}</p>
            <h3>Location</h3>
            <p>{data.location}</p>
          </div>
          <iframe referrerpolicy="no-referrer-when-downgrade"
            src=
            {"https://www.google.com/maps/embed/v1/place?key=AIzaSyCOj2Uhxker2xOnU5VMLKLqIhkBIoyTBQ0&q=" + data.mapName}
            allowfullscreen>
          </iframe>
        </div>
      </div>
      <div className="sites-info-container">
        <div className="site-info">
          <h3>
            Rating
          </h3>
          <h1>
            {calcRating(data.ratings).toFixed(1)}
          </h1>
          <p>{data.ratings.reduce((element, total) => total += element)} Reviews</p>
        </div>
      </div>

      <Footer></Footer>
    </div >
  );
}

function calcRating(ratings) {
  let total = 0, totalCount = 0;
  for (let i = 1; i <= 5; i++) {
    total += ratings[i - 1] * i;
    totalCount += ratings[i - 1];
  }
  return total / totalCount;
}