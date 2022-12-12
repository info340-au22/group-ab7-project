import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import React, { useState } from "react";
import SiteCard from "../components/SiteCard";
import BookmarkBox from "../components/BookmarkBox";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SavedSites(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div>
        <main>
        <p>Loading user data</p>
        </main>
        </div>
    );
  }

  if(error) {
    return (
      <div>
        <main>
        <p>There is an error: </p>
        </main>
        </div>
    );
  }

  const userID = getAuth().currentUser.uid;
  const stateArray = Object.values(props.state);
  const bookmarkedArray = stateArray.filter((currentObj) => {
    //console.log(currentObj);
    console.log(currentObj.siteName);
    return currentObj.usersBookmarked[userID];
  });

    //const userID = getAuth().currentUser.uid;
    //console.log(userID);
    //console.log(props.state);
    //console.log(stateArray);


  let view;
  //console.log(getAuth().currentUser);
  //const userID = getAuth().currentUser.uid;
  //const userID = getAuth().currentUser.uid;
  //console.log(userID);




  if (bookmarkedArray.length !== 0) {
    view = // BookmarkBox returns <section>
      <BookmarkBox bookmarks={bookmarkedArray}></BookmarkBox>;
  } else {
    view = (
      <section>
        <p>You currently have no saved sites.</p>
        <img
          src="img/WestCoast.png"
          className="map-image"
          alt="United States with West Coast highlighted in red"
        ></img>
        <p>To get started, select sites to bookmark under the "Sites" tab.</p>
      </section>
    );
  }

  return (
    <div>
      <main>
        <div className="bookmark-view">
          <h1> Your Saved Sites: </h1>
          {view}
        </div>
      </main>
    </div>
  );
}
