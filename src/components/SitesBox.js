import React, { useState } from "react";
import SiteCard from "../components/SiteCard";
import siteData from "../data/sites.json";

export default function SitesBox(props) {
  console.log(props.filterStates);
  const siteCardArray = siteData
    .filter((element) => {
      if (
        props.filterStates !== undefined &&
        props.filterStates[0] !== null &&
        props.filterStates.length !== 0
      ) {
        return props.filterStates.reduce(
          (accumulator, currentValue) =>
            accumulator || element.state === currentValue,
          false
        );
      } else {
        return true;
      }
    })
    .map((singleSiteData) => {
      return (
        <SiteCard
          singleSiteData={singleSiteData}
          key={singleSiteData.siteName}
        ></SiteCard>
      );
    });
  return <div className="sites-box">{siteCardArray}</div>;
}
