import React, { useState, useEffect } from "react";
import SiteCard from "../components/SiteCard";
import allSites from "../data/allSites.json";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

//import siteData from "../data/sites.json";

export default function SitesBox(props) {
  //  console.log(allSites);
  //  console.log(props.filterStates);
  //  console.log(props.filterType);

  let [siteData, setSiteData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const cardsRef = ref(db);
    get(child(cardsRef, `sitesInfo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
        let tmpSiteData = [];
        for (const [key, value] of Object.entries(data)) {
          tmpSiteData.push(value);
        }
        setSiteData(tmpSiteData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const siteCardArray = siteData
    .filter((element) => element.published)
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
          setState={props.setState}
          state={props.state}
        ></SiteCard>
      );
    });
  console.log(siteCardArray);
  if (loading) {
    return (
      <section className="sites-box">
        <h4>Loading Data...</h4>
      </section>
    );
  } else {
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
}
