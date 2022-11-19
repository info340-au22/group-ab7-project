import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StatesPage from './components/StatesPage';
import SitesPage from './components/SitesPage';
import siteData from './data/sites.json';

export default function App() {
    return (<div>
        {/* <HomePage></HomePage> */}
       <StatesPage siteData={siteData}/>
       {/* <SitesPage /> */}
    </div>);
}