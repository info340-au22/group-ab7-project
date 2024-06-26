import React, { useState, Component } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import states from "../data/states.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";

const typeFilter = ["Cultural", "Natural"];

export default function SitesPage(props) {
  const [searchParams] = useSearchParams();
  let searchContent =
    searchParams.get("search") === null ? "" : searchParams.get("search");
  const [stateFilter, setStateFilter] = useState([]);
  const [siteTypeFilter, setSiteTypeFilter] = useState([]);
  const [titleSearchContent, setTitleSearchContent] = useState(searchContent);

  function statesFilterClicked(event) {
    event.currentTarget.classList.toggle("card-selected");
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
    event.currentTarget.classList.toggle("card-selected");
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
    /*
    window.location.href =
      "/sites?search=" + document.getElementById("title-search").value;*/
  }
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <p>Loading user data</p>
  }

  if(error) {
    return <p>There is an error: {error}</p>
  }

  if (user) {
    return (
      <div>
        <main>
          <div className="content-area">
            <section className="page-search">
              <div className="page-search-bar">
                <input
                  id="title-search"
                  type="text"
                  defaultValue={searchContent}
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
                  <FontAwesomeIcon
                    className="page-search-icon"
                    icon={faMagnifyingGlass}
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
                      className="uncard-selected"
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
                      className="uncard-selected"
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
              <SitesBox // SitesBox returns a <section>
                filterStates={stateFilter}
                filterType={siteTypeFilter}
                titleSearch={titleSearchContent}
                setState={props.setState}
                state={props.state}
              />
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <main>
          <div className="content-area">
            <section className="page-search">
              <div className="page-search-bar">
                <input
                  id="title-search"
                  type="text"
                  defaultValue={searchContent}
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
                  <FontAwesomeIcon
                    className="page-search-icon"
                    icon={faMagnifyingGlass}
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
                      className="uncard-selected"
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
                      className="uncard-selected"
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
              <p> Note: Bookmarking feature is for signed in users </p>
              <SitesBox // SitesBox returns a <section>
                filterStates={stateFilter}
                filterType={siteTypeFilter}
                titleSearch={titleSearchContent}
                setState={props.setState}
                state={props.state}
              />
          </div>
        </main>
      </div>
    );
  }
  
  }
  