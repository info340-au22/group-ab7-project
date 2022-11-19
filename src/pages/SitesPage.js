import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import states from "../data/states.json";

const typeFilter = ["Cultural", "Natural"];

export default function SitesPage() {
  const [stateFilter, setStateFilter] = useState([]);
  function updateFilter(filter) {
    setStateFilter(filter);
  }

  function statesFilterClicked(event) {
    event.currentTarget.classList.toggle("selected");
    event.currentTarget.children[0].children[1].classList.toggle("not-shown");
    console.log(event.currentTarget.key);
    updateFilter(stateFilter.concat([event.currentTarget.filtername]));
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="content-area">
        <section className="page-search">
          <div className="page-search-bar">
            <input type="text" placeholder="Search.." />
            <button type="submit">
              <img
                className="page-search-icon"
                src="img/search.png"
                alt="submit"
              />
            </button>
          </div>
        </section>

        <section className="filter-box">
          <h3>Filters:</h3>
          <div className="filter">
            <h4>State:</h4>
            <ul>
              {states.map((element) => (
                <li
                  key={element.name}
                  filtername={element.short}
                  className="unselected"
                  onClick={statesFilterClicked}
                >
                  <div>
                    <span>{element.name} </span>
                    <span className="cancel not-shown">×</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter">
            <h4>Type:</h4>
            <ul>
              {typeFilter.map((element) => (
                <li
                  key={element}
                  filtername={element.toLowerCase()}
                  className="unselected"
                  onClick={statesFilterClicked}
                >
                  <div>
                    <span>{element} </span>
                    <span className="cancel not-shown">×</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <h3 className="sub-title">Sites of this State</h3>
        <SitesBox filterStates={stateFilter} />
      </div>
      <Footer></Footer>
    </div>
  );
}
