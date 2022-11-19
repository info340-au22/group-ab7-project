import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StatesPage from './pages/StatesPage';
import SitesPage from './pages/SitesPage';
import siteData from './data/sites.json';

export default function App() {
    return (<div>
        {/* <HomePage></HomePage> */}
       <StatesPage siteData={siteData}/>
       {/* <SitesPage /> */}
    </div>);
}