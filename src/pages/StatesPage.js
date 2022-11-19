import React, { useState } from "react";
import NavBar from "../components/NavBar";
import StatesInfo from "../components/StatesInfo";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";

export default function StatesPage(props) {
  const [stateFilter, setStateFilter] = useState(null);
  function updateFilter(filter) {
    setStateFilter(filter);
  }
  return (
    <div>
      <NavBar></NavBar>
      <title>States</title>
      <StatesInfo callBackFilterStates={updateFilter}/>

      <h3 className="sub-title">Sites of this State</h3>
      <SitesBox filterStates={[stateFilter]} />
      <Footer></Footer>
    </div>
  );
}
