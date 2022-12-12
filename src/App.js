import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StatesPage from "./pages/StatesPage";
import SitesPage from "./pages/SitesPage";
import Site from "./pages/Site";
import SavedSites from "./pages/SavedSites";
import React, { useState, Component, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import allSites from "./data/allSites.json";
import LogInPage from "./pages/LogIn";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EditUserInfo from "./pages/PersonalSettings";
import NewSitePage from "./pages/NewSitePage";
import EditSitePage from "./pages/EditSitePage";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import _ from "lodash";

export default function App() {
  const [state, setState] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const sitesDetail = ref(db, "sitesDetail");

    // when database is updated, set state to change the state to match
    const unregisterFunction = onValue(sitesDetail, (snapshot) => {
      const changedValue = snapshot.val();
      //console.log(changedValue);
      setState(changedValue);
    });

    function cleanup() {
      unregisterFunction();
    }
    return cleanup;
  }, []);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);

    //returns a function that will "unregister" (turn off) the listener
    const unregisterFunction = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        //firebaseUser defined: is logged in
        //console.log("logged in", firebaseUser.displayName);
        //do something with firebaseUser (e.g. assign to a state variable)
      } else {
        //firebaseUser is undefined: is not logged in
        //console.log("logged out");
      }
    });

    //cleanup function for when component is removed
    function cleanup() {
      unregisterFunction(); //call the unregister function
    }
    return cleanup; //effect hook callback returns the cleanup function
  });

  return (
    <div>
      <div id="page-main">
        <NavBar></NavBar>
        <Routes>
          <Route
            path=""
            element={<StatesPage setState={setState} state={state} />}
          />
          <Route path="home" element={<HomePage />} />
          <Route
            path="states"
            element={<StatesPage setState={setState} state={state} />}
          />
          <Route path="login" element={<LogInPage />} />
          <Route path="newSite" element={<NewSitePage />} />
          <Route path="site" element={<Site />} />
          <Route path="editSite" element={<EditSitePage />} />
          <Route path="settings" element={<EditUserInfo user={user} />} />
          <Route
            path="sites"
            element={<SitesPage setState={setState} state={state} />}
          />
          <Route
            path="bookmarks"
            element={<SavedSites state={state} user={user}></SavedSites>}
          />
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}
