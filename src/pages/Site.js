import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import allSites from "../data/allSites.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

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
              <h4>
                <span className="rating-score">
                  {calcRating(data.ratings).toFixed(1)}
                </span>
                /5
              </h4>
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

export function Stars(props) {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (props.starCount - i >= -0.3) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarSolid}
          className="star"
          key={"star-" + i}
        />
      );
    } else if (props.starCount - i >= -0.7) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          className="star"
          key={"star-" + i}
        />
      );
    } else if (props.showBlank !== "false") {
      stars.push(
        <FontAwesomeIcon icon={faStar} className="star" key={"star-" + i} />
      );
    }
  }
  return <div>{stars}</div>;
}

export function StarDistribution(props) {
  let body = [];
  let starMax = props.stars.reduce((max, cur) => Math.max(max, cur), 0);
  console.log(props.stars);
  for (let i = props.stars.length; i >= 1; i--) {
    body.push(
      <tr key={i + 1 + "-stars"} className="rating-tr">
        <td className="rating-stars">
          <Stars starCount={i} showBlank="false" />
        </td>
        <td className="rating-bar">
          <div className="star-count-bar">
            <div
              className="star-count-bar-content"
              style={{
                paddingLeft: (props.stars[i - 1] / starMax) * 100 + "%",
              }}
            ></div>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <table>
      <tbody>{body}</tbody>
    </table>
  );
}

function calcRating(ratings) {
  let total = 0,
    totalCount = 0;
  for (let i = 1; i <= 5; i++) {
    total += ratings[i - 1] * i;
    totalCount += ratings[i - 1];
  }
  return total / totalCount;
}
