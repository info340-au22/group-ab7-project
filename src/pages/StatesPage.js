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
      <title>States</title>
      <main>
        <section>
          <StatesInfo callBackFilterStates={updateFilter}/>
        </section>

        <section>
        <h3 className="sub-title">Sites of this State</h3>
        <SitesBox filterStates={[stateFilter]} setState={props.setState}state={props.state} />
        </section>
      </main>
    </div>
  );
}
