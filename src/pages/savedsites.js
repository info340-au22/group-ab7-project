import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SitesBox from '../components/SitesBox'
import React, {useState} from 'react';
import SiteCard from "../components/SiteCard";
import siteData from "../data/sites.json";

export default function SavedSites(props) {
    return (
        <div>
            <NavBar></NavBar>
            <h1> Your Saved Sites </h1>
            <SitesBox></SitesBox>
            <Footer></Footer>
        
            </div>
    );
}