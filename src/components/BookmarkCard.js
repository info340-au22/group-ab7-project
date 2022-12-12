import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import React, { useState, Component, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';


export default function BookmarkCard(props) {
    const data = props.data;
    const name = data.siteName;
    function handleClick(stateFull) {
        console.log(stateFull);
        if (stateFull === "Washington") {
            stateFull += " state";
        }
        const url = "https://www.google.com";
        console.log(url);
        window.open('http://google.com/search?q=' + stateFull + " flights", "_blank");
      }
    return (
            <div className="card bookmark-card">
                    <img src={data.imgSrc} className="card-img-top bookmarkImg" alt={data.imgAlt}></img>
                <div className="card-body">
                    <h2 className="bookmark-heading">{data.siteName}</h2>
                    <button className="findFlights" onClick={() => handleClick(data.stateFull)}>Find Flights</button>
                </div>
            </div>
    );
}
// <img src={sitesInfo[name].imgSrc} 
/*
<div
      className="card-container"
      data-state={singleSiteData.state}
      data-type={singleSiteData.siteType}
    >
      <div className="site-card">
        <img src={singleSiteData.imgSrc} alt={singleSiteData.imgAlt} />
        <input
          type="image"
          src={imgSrc}
          className="bookmark"
          onClick={handleClick}
        />
        <h2>{singleSiteData.siteName}</h2>
        <h3>{singleSiteData.siteFact}</h3>
        <p>{singleSiteData.siteLocation}</p>
      </div>
    </div>
    */