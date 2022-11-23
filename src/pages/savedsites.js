import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import React, { useState } from "react";
import SiteCard from "../components/SiteCard";
import BookmarkBox from "../components/BookmarkBox";


export default function SavedSites(props) {
  //console.log(props.state);
  const stateArray = Object.values(props.state);
  //console.log(stateArray);
  const bookmarkedArray = stateArray.filter((currentObj) => {
    return currentObj.bookmarked;
  });

  return (
    <div>
      <NavBar></NavBar>
      <h1> Your Saved Sites </h1>
       <BookmarkBox bookmarks={bookmarkedArray}></BookmarkBox>
      <Footer></Footer>
    </div>
  );
}