import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SiteCard from '../components/SiteCard';

export default function StatesPage(props) {
  const siteData = props.siteData;
  const siteCardArray = siteData.map((singleSiteData) => {
    return <SiteCard singleSiteData={singleSiteData} key={singleSiteData.imgSrc}></SiteCard>
    });
    return(
        <div>
        <NavBar></NavBar>
        <title>States</title>

        <section className="centering">
      <div className="state-card-container">
        <div className="state-card washington">
          <img src="img/seal-wa.png" alt="Washington"/>
        </div>
        <div className="state-card oregon">
          <img src="img/seal-or.png" alt="Oregon"/>
        </div>
        <div className="state-card california">
          <img src="img/seal-ca.png" alt="California"/>
        </div>
        <div className="state-card nevada">
          <img src="img/seal-nv.png" alt="Nevada"/>
        </div>
        <div className="state-card idaho">
          <img src="img/seal-id.png" alt="Idaho"/>
        </div>
      </div>
    </section>

    <section className="state-info-container">
      <div className="state-info hidden washington-info">
        <h1>Washington</h1>
        <p>
          Washington is a coastal state bordering canada with a lot of mountains
          and greenery. It has a population of 7.7 million. It's capital
          city is Olympia.
        </p>
      </div>
      <div className="state-info hidden oregon-info">
        <h1>Orgeon</h1>
        <p> Oregon is a coastal city in the pacific northwest in between Washington
          and California. It has a population of 4 million. It's capital
          is Salem
        </p>
      </div>
      <div className="state-info hidden california-info">
        <h1>California</h1>
        <p>
          California is a coastal city that borders Mexico. It has a population of
          40 million. It's capital is Sacramento
        </p>
      </div>
      <div className="state-info hidden idaho-info">
        <h1>Idaho</h1>
        <p>
          Idaho is a landlocked state on the west coast. It is known as the Gem state
          because it produces 72 semi-precious stones. It has a population
          of 1.8 million with a capital city of Boise
        </p>
      </div>
      <div className="state-info hidden nevada-info">
        <h1>Nevada</h1>
        <p>
          Nevada is a landlocked state on the west coast. It is famous for casinos
          and no income tax. It's capital city is Carson City and the population
          of the state is 3 million
        </p>
      </div>
    </section>

    <h3 className="sub-title">
      Sites of this State
    </h3>

    <section className="sites-box">
      {siteCardArray}
    </section>
    <Footer></Footer>
    </div>
    );
}