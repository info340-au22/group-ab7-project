import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StatesPage from "./pages/StatesPage";
import SitesPage from "./pages/SitesPage";
import Site from "./pages/Site";
import SavedSites from "./pages/savedsites";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import allSites from "./data/allSites.json";

export default function App(card) {
  const [bookmarks, setBookmarks] = useState(new Set());

  console.log(bookmarks);
  //  console.log(allSites);
  //function setBookmarks() {
  //setBookmarkSetter("hello");

  // }
  let siteLink = [];
  for (const [key, value] of Object.entries(allSites)) {
    siteLink.push(
      <Route
        key={key}
        path={"site/" + value.title}
        element={<Site site={value.title} />}
      />
    );
  }

  return (
    <div>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="states" element={<StatesPage />} />
        <Route
          path="sites"
          element={
            <SitesPage setBookmarks={setBookmarks} bookmarks={bookmarks} />
          }
        />
        {siteLink}
        <Route
          path="savedsites"
          element={<SavedSites savedSites={bookmarks}></SavedSites>}
        />
      </Routes>
    </div>
  );
}
