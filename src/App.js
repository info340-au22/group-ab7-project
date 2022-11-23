import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StatesPage from "./pages/StatesPage";
import SitesPage from "./pages/SitesPage";
import Site from "./pages/Site";
import SavedSites from "./pages/savedsites";
import React, { useState, Component } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import allSites from "./data/allSites.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = new Set();
  }

  render() {
    //const [bookmarks, setBookmarks] = useState(new Set());

    console.log(this.state);
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
          <Route path="" element={<StatesPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="states" element={<StatesPage />} />
          <Route
            path="sites"
            element={
              <SitesPage setBookmarks={this.setState} bookmarks={this.state} />
            }
          />
          {siteLink}
          <Route
            path="savedsites"
            element={<SavedSites savedSites={this.state}></SavedSites>}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
