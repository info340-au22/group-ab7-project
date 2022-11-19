import React from 'react';
import reactDOM from 'react-dom/client';

export default function SiteCard(props) {
    const singleSiteData = props.singleSiteData;
    return(
        <div className="card-container" data-state={singleSiteData.state} data-type=        {singleSiteData.siteType}>
                <div className="site-card">
                    <img src={singleSiteData.imgSrc} alt={singleSiteData.imgAlt}/>
                    <h2>{singleSiteData.siteName}</h2>
                    <h3>{singleSiteData.siteFact}</h3>
                    <p>{singleSiteData.siteLocation}</p>
                </div>
        </div>
    );
}