import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import React, { useState, useEffect } from "react";
import SiteCard from "../components/SiteCard";
import BookmarkBox from "../components/BookmarkBox";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, onValue, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { getSiteBrief } from "../components/EditSiteInfo";

export default function SavedSites(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = props.user;

  useEffect(() => {
    console.log(currentUser);
    if (currentUser !== null) {
      getBookMarks(currentUser.uid).then((element) => {
        console.log(element);
        getSiteBrief(element).then((result) => {
          setBookmarks(result);
        });
      });
      setLoading(false);
    }
  }, [currentUser]);

  if (currentUser !== null) {
    let view;
    if (bookmarks.length !== 0) {
      view = // BookmarkBox returns <section>
        <BookmarkBox bookmarks={bookmarks}></BookmarkBox>;
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
  } else {
    return (
      <div>
        <div className="site-info">
          <p>
            You are not <a href="/login">Logged In</a>!
          </p>
        </div>
      </div>
    );
  }
}

async function getBookMarks(userId) {
  const db = getDatabase();
  const cardsRef = ref(db);
  let bookmarks = [];
  await get(child(cardsRef, "users/" + userId + "/bookmarks"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let tmp = snapshot.val();
        for (const [key, value] of Object.entries(tmp)) {
          if (value === true) {
            bookmarks = [...bookmarks, key];
          }
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return bookmarks;
}
