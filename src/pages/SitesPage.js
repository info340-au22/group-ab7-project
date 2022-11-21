import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import states from "../data/states.json";

const typeFilter = ["Cultural", "Natural"];

export default function SitesPage(props) {
  const [stateFilter, setStateFilter] = useState([]);
  const [siteTypeFilter, setSiteTypeFilter] = useState([]);
  const [titleSearchContent, setTitleSearchContent] = useState("");

  function statesFilterClicked(event) {
    event.currentTarget.classList.toggle("selected");
    event.currentTarget.children[0].children[1].classList.toggle("not-shown");
    let filter = event.currentTarget.dataset.filterName;
    if (stateFilter.indexOf(filter) === -1) {
      setStateFilter(stateFilter.concat([filter]));
    } else {
      setStateFilter(
        stateFilter
          .slice(0, stateFilter.indexOf(filter))
          .concat(stateFilter.slice(stateFilter.indexOf(filter) + 1))
      );
    }
  }

  function siteFilterClicked(event) {
    event.currentTarget.classList.toggle("selected");
    event.currentTarget.children[0].children[1].classList.toggle("not-shown");
    let filter = event.currentTarget.dataset.filterName.toLowerCase();
    if (siteTypeFilter.indexOf(filter) === -1) {
      setSiteTypeFilter(siteTypeFilter.concat([filter]));
    } else {
      setSiteTypeFilter(
        siteTypeFilter
          .slice(0, siteTypeFilter.indexOf(filter))
          .concat(siteTypeFilter.slice(siteTypeFilter.indexOf(filter) + 1))
      );
    }
  }

  function search() {
    setTitleSearchContent(document.getElementById("title-search").value);
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="content-area">
        <section className="page-search">
          <div className="page-search-bar">
            <input
              id="title-search"
              type="text"
              placeholder="Search.."
              onKeyDown={(event) => {
                if (event.which === 13) {
                  search();
                }
              }}
              onChange={(event) => {
                if (event.target.value === "") {
                  search();
                }
              }}
            />
            <button type="submit" onClick={search}>
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
                  data-filter-name={element.short}
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
                  data-filter-name={element.toLowerCase()}
                  className="unselected"
                  onClick={siteFilterClicked}
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
        <SitesBox
          filterStates={stateFilter}
          filterType={siteTypeFilter}
          titleSearch={titleSearchContent}
          setBookmarks={props.setBookmarks}
          bookmarks={props.bookmarks}
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
