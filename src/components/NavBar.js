
export default function NavBar(props) {
    return(
        <header>
      <nav>
        <div className="titlecore">
          <div>
            <ul>
              <li className="title">
                <a href="home"><img className="page-icon" src="img/icon.png" alt="Website Icon"/></a>
              </li>
              <li className="nav-option"><a href="states">States</a></li>
              <li className="nav-option"><a href="sites">Sites</a></li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="search-bar">
              <input type="text" placeholder="Search.."/>
              <button type="submit"><img className="search-icon" src="img/search.png" alt="search glass"/></button>
            </div>
            <img className="avatar" src="img/ava.jpg" alt="avatar"/>
          </div>
        </div>
      </nav>
    </header>
    );
}