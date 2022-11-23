import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import React, { useState } from "react";
import SiteCard from "../components/SiteCard";
import BookmarkBox from "../components/BookmarkBox";


export default function SavedSites(props) {
  const stateArray = Object.values(props.state);
  const bookmarkedArray = stateArray.filter((currentObj) => {
    return currentObj.bookmarked;
  });
  let view;

  if (bookmarkedArray.length !== 0) {
    view = <BookmarkBox bookmarks={bookmarkedArray}></BookmarkBox>;
  } else {
    view = ( <>
      <p>You currently have no saved sites.</p>
      <img src="img/WestCoast.png" alt="United States with West Coast highlighted in red"></img>
      <p>In order to get started, select sites that you want to bookmark under the "Sites" tab.</p>
      </>
    );
  }

  return ( <>
      <NavBar></NavBar>
      <div className="bookmark-view">
        <h1> Your Saved Sites: </h1>
        {view}
       </div>
      <Footer></Footer>
      </>
  );
}