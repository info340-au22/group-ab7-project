import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";
import states from "../data/states.json";

const typeFilter = ["Cultural", "Natural"];

export default function SitesPage() {
  function statesFilterClicked(event, filterType) {
    event.currentTarget.classList.toggle("selected");
    event.currentTarget.children[0].children[1].classList.toggle("not-shown");
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

        <seciton className="filter-box">
          <h3>Filters:</h3>
          <div className="filter">
            <h4>State:</h4>
            <ul>
              {states.map((element) => (
                <li
                  key={element.name}
                  filterName={element.short}
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
                  filterName={element.toLowerCase()}
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
        </seciton>
        <h3 className="sub-title">Sites of this State</h3>
        <SitesBox filterStates={["WA"]}/>
      </div>
      <Footer></Footer>
    </div>
  );
}
