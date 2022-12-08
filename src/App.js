import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StatesPage from "./pages/StatesPage";
import SitesPage from "./pages/SitesPage";
import Site from "./pages/Site";
import SavedSites from "./pages/SavedSites";
import React, { useState, Component } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import allSites from "./data/allSites.json";
import LogInPage from "./pages/LogIn";

export default function App() {
  const [state, setState] = useState(allSites);

  //console.log(this.state);
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
      <div id="page-main">
        <NavBar></NavBar>
        <Routes>
          <Route path="" element={<StatesPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="states" element={<StatesPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route
            path="sites"
            element={<SitesPage setState={setState} state={state} />}
          />
          {siteLink}
          <Route
            path="savedsites"
            element={<SavedSites state={state}></SavedSites>}
          />
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}
