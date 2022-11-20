import React, { useState } from "react";
import reactDOM from 'react-dom/client';

const handleClick = function(event) {
    console.log("bookmarked!");
    console.log(event.target.parentNode);
}

export default function SiteCard(props) {
    const singleSiteData = props.singleSiteData;
    const [bookmarked, setBookmark] = useState(false);
    let imgSrc;
    if (bookmarked) {
        imgSrc = "./img/bookmark-filled.png";

    } else {
        imgSrc = "./img/bookmark.png";
    }


    return(
        <div className="card-container" data-state={singleSiteData.state} data-type=        {singleSiteData.siteType}>
                <div className="site-card">
                    <img src={singleSiteData.imgSrc} alt={singleSiteData.imgAlt}/>
                    <input type="image" src={imgSrc} className="bookmark" onClick={handleClick}/>
                    <h2>{singleSiteData.siteName}</h2>
                    <h3>{singleSiteData.siteFact}</h3>
                    <p>{singleSiteData.siteLocation}</p>
                </div>
        </div>
    );
}