import React, { useState } from "react";
import SiteCard from "../components/SiteCard";
import allSites from "../data/allSites.json";
//import siteData from "../data/sites.json";

export default function SitesBox(props) {
  //  console.log(props.filterStates);
  //  console.log(props.filterType);
  let siteData = [];

  for (const [key, value] of Object.entries(allSites)) {
    siteData.push(value);
  }
  const siteCardArray = siteData
    .filter((element) => {
      if (props.titleSearch !== undefined && props.titleSearch !== "") {
        return element.siteName
          .toLowerCase()
          .includes(props.titleSearch.toLowerCase());
      } else {
        return true;
      }
    })
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
    .filter((element) => {
      if (
        props.filterType !== undefined &&
        props.filterType[0] !== null &&
        props.filterType.length !== 0
      ) {
        return props.filterType.reduce(
          (accumulator, currentValue) =>
            accumulator || element.siteType === currentValue,
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
          setBookmarks={props.setBookmarks}
          bookmarks={props.bookmarks}
        ></SiteCard>
      );
    });
//console.log(siteCardArray);
  return (
    <section className="sites-box">
      {siteCardArray.length !== 0 ? (
        siteCardArray
      ) : (
        <h4>Sorry, no matching site was found...</h4>
      )}
    </section>
  );
}
