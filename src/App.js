import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StatesPage from "./pages/StatesPage";
import SitesPage from "./pages/SitesPage";
import siteData from "./data/sites.json";
import SavedSites from "./pages/savedsites";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="states" element={<StatesPage />} />
        <Route path="sites" element={<SitesPage />} />
        <Route path="savedsites" element={<SavedSites></SavedSites>} />
      </Routes>
    </div>
  );
}
