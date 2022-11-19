import React, { useState } from "react";
import SiteCard from "../components/SiteCard";
import siteData from "../data/sites.json";

export default function SitesBox(props) {
  const siteCardArray = siteData
    .filter((element) => {
      if (props.filterStates !== undefined && props.filterStates !== null) {
        return element.state === props.filterStates;
      } else {
        return true;
      }
    })
    .map((singleSiteData) => {
      return (
        <SiteCard
          singleSiteData={singleSiteData}
          key={singleSiteData.imgSrc}
        ></SiteCard>
      );
    });
  return <div className="sites-box">{siteCardArray}</div>;
}
