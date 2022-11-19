import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SitesBox from "../components/SitesBox";

export default function SitesPage() {
  return (
    <div>
      <NavBar></NavBar>
      <h3 className="sub-title">Sites of this State</h3>
      <SitesBox />
      <Footer></Footer>
    </div>
  );
}
