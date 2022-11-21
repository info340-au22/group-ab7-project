import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import allSites from "../data/allSites.json";

export default function HomePage(props) {
  let data = allSites[props.site];
  console.log(data);
  return (
    <div>
      <NavBar></NavBar>
      <div
        className="site-page-header"
        style={{ backgroundImage: `url(${data.bannerImg})` }}
      >
        <div class="site-page-title-box">
          <h1 class="site-page-title">{data.title}</h1>{" "}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
