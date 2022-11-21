import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SitesBox from '../components/SitesBox'
import React, {useState} from 'react';
import SiteCard from "../components/SiteCard";
import siteData from "../data/sites.json";

export default function SavedSites(props) {
    const [bookmarkedSites, setBookmarked] = useState([]);
    const bookmarks = props.savedSites;
    let view;

    if (bookmarks.size === 0) {
        view = <p> You have no saved sites </p>;
    } else {
        view = bookmarks;
    }
    return (
        <div>
            <NavBar></NavBar>
            <h1> Your Saved Sites </h1>
                {view}
            <Footer></Footer>
            </div>
    );
}