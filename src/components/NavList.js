import React from "react";
import { Link } from "react-router-dom";

export default function NavList() {
   
    const navNames = ["States", "Sites", "Saved Sites"];
    const navLiArray = navNames.map((current) => {
        let navNameNoSpace = current.replace(/\s+/g, '');
        navNameNoSpace = navNameNoSpace.toLowerCase();      
        return (
            <li className="nav-options" key={navNameNoSpace}><Link to={"/" + navNameNoSpace}>{current}</Link></li>
        );
    });
    return(navLiArray);
}
