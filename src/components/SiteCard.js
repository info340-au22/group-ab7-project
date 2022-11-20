import React, { useState } from "react";
import reactDOM from 'react-dom/client';

export default function SiteCard(props) {

    const bookmarks = props.bookmarks;
    const setBookmarks = props.setBookmarks;
   
    //console.log(bookmarks);

    const singleSiteData = props.singleSiteData;
    const [bookmarked, setBookmarked] = useState(false);

    const handleClick = function(event) {
        const bookmarkedCard = event.target.parentNode;
        //console.log(bookmarkedCard);
        const bookmarksCopy = [...bookmarks];

        if (bookmarksCopy.includes) {
            bookmarksCopy.splice(bookmarkedCard);
        } else {
            bookmarksCopy.push(bookmarkedCard);
        }
        //console.log(bookmarkCopy);
        setBookmarks(bookmarksCopy);
        setBookmarked(!bookmarked);
    }

    

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