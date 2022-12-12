import React, { useState, useEffect, useMemo } from "react";
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { useSearchParams } from "react-router-dom";
//import Select from 'react-select'
import { Select } from "react-select";
import Form from "react-bootstrap/Form";
import SiteCard from "../components/SiteCard";
import { showSubmit } from "../components/showSubmit";
import {
  editSiteInfo,
  toggleSiteStatus,
  editSiteDetail,
} from "../components/EditSiteInfo";

const optionsState = [
  { value: "WA", label: "Washington" },
  { value: "CA", label: "California" },
  { value: "NV", label: "Nevada" },
  { value: "ID", label: "Idaho" },
  { value: "OR", label: "Oregon" },
];

const optionsType = [
  { value: "natural", label: "Natural" },
  { value: "cultural", label: "Cultural" },
];

export default function EditSitePage(props) {
  const [searchParams] = useSearchParams();
  let siteName = searchParams.get("siteName");

  const [sitePublishedStatus, setSitePublishedStatus] = useState(false);
  const [data, setData] = useState({});
  const [detail, setDetail] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(true);

  const [currentGalleryImage, setCurrentGalleryImage] = useState("");

  const [siteInfoForm, setSiteInfoForm] = useState({
    state: "",
    siteType: "",
    siteLocation: "",
    siteFact: "",
    imgSrc: "",
  });

  const [siteDetailForm, setSiteDetailForm] = useState({
    intro: [],
    mapName: "",
    stateFull: "",
    bannerImg: "",
    location: "",
    gallery: [],
  });

  const [siteGallery, setSiteGallery] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    //console.log(siteInfoForm);
  }

  const handleChange = (event) => {
    setSiteInfoForm({
      ...siteInfoForm,
      [event.target.name]: event.target.value,
      imgAlt: "image of " + siteName,
    });
  };

  function handleSubmitDetail(event) {
    event.preventDefault();
    //console.log(siteDetailForm);
  }

  const handleChangeDetail = (event) => {
    if (event.target.name === "intro") {
      let introPart = event.target.value;
      while (introPart.indexOf("\n\n") !== -1) {
        introPart = introPart.replace(/\n\n/g, "\n");
      }
      let introSplited = introPart.split("\n");
      setSiteDetailForm({ ...siteDetailForm, intro: introSplited });
    } else {
      setSiteDetailForm({
        ...siteDetailForm,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const cardsRef = ref(db);
    get(child(cardsRef, "sitesInfo/" + siteName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((siteData) => {
        setData(siteData);
        setSiteInfoForm(siteData);
        setSitePublishedStatus(siteData.published);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error(error);
      });
    get(child(cardsRef, "sitesDetail/" + siteName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
        setLoadingDetail(false);
      })
      .then((siteData) => {
        setDetail(siteData);
        setSiteDetailForm(siteData);
        setSiteGallery(siteData.gallery === undefined ? [] : siteData.gallery);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div
        className="site-page-header"
        style={{ backgroundImage: `url(${siteDetailForm.bannerImg})` }}
      >
        <div className="site-page-title-box">
          <h1 className="site-page-title">{"Edit " + data.title}</h1>{" "}
        </div>
      </div>
      <div class="site-info">
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <div>
            <h3>Basic Info</h3>
          </div>

          <h5>State</h5>
          <Form.Select
            name="state"
            value={siteInfoForm.state}
            onChange={(event) => {
              let select = event.currentTarget;
              setSiteDetailForm({
                ...siteDetailForm,
                stateFull: select.options[select.selectedIndex].innerHTML,
              });
            }}
          >
            {siteInfoForm.state === "" ? (
              <option value="">Select State...</option>
            ) : (
              ""
            )}
            {optionsState.map((element) => {
              return (
                <option key={element.value} value={element.value}>
                  {element.label}
                </option>
              );
            })}
          </Form.Select>
          <h5>Type</h5>
          <Form.Select name="siteType" value={siteInfoForm.siteType}>
            {siteInfoForm.siteType === "" ? (
              <option value="">Select Type...</option>
            ) : (
              ""
            )}
            {optionsType.map((element) => {
              return (
                <option key={element.value} value={element.value}>
                  {element.label}
                </option>
              );
            })}
          </Form.Select>
          <label>
            <h5>Site Location</h5>
            <input
              type="text"
              name="siteLocation"
              placeholder="eg. Seattle, WA"
              value={siteInfoForm.siteLocation}
            />
          </label>
          <label>
            <h5>Site Fact</h5>
            <input
              type="text"
              name="siteFact"
              placeholder="SiteFact"
              value={siteInfoForm.siteFact}
            />
          </label>
          <label>
            <h5>Card Image Link</h5>
            <input
              type="text"
              name="imgSrc"
              placeholder="Input image link here"
              value={siteInfoForm.imgSrc}
            />
          </label>
        </form>
        <div class="preview-card">
          <h3>Card Preview:</h3>
          <SiteCard
            clickable="false"
            singleSiteData={{
              ...siteInfoForm,
              title: siteName,
              siteName: siteName,
            }}
          />
          <button
            onClick={(event) => {
              editSiteInfo(data.title, siteInfoForm);
              let button = event.currentTarget;
              showSubmit(button, "Submitted");
            }}
          >
            Submit Info Change
          </button>
        </div>
      </div>
      <div className="map-info" id="site-map">
        <div className="location-info">
          <h4>Detailed Location</h4>
          <h5>State</h5>
          <p class="no-margin">{siteDetailForm.stateFull}</p>
          <form onSubmit={handleSubmitDetail} onChange={handleChangeDetail}>
            <label>
              <h5>Site Detailed Location</h5>
              <input name="location" value={siteDetailForm.location}></input>
            </label>
            <label>
              <h5>Map location</h5>
              <input name="mapName" value={siteDetailForm.mapName}></input>
            </label>
          </form>
        </div>
        <iframe
          referrerPolicy="no-referrer-when-downgrade"
          src={
            "https://www.google.com/maps/embed/v1/place?key=AIzaSyCOj2Uhxker2xOnU5VMLKLqIhkBIoyTBQ0&q=" +
            siteDetailForm.mapName
          }
          allowFullScreen
        ></iframe>
      </div>
      <div class="site-info">
        <h4>Data for site page</h4>
        <form onSubmit={handleSubmitDetail} onChange={handleChangeDetail}>
          <label>
            <h5>Site Introduction</h5>
            <textarea
              name="intro"
              value={convert(siteDetailForm.intro)}
            ></textarea>
          </label>
          <label>
            <h5>Site Detail Banner Image Link</h5>
            <input
              name="bannerImg"
              value={siteDetailForm.bannerImg}
              placeholder="Input image link here"
            ></input>
          </label>
        </form>
        <label>
          <h5>Upload new image to gallery</h5>
          <input id="gallery-input" placeholder="Input image link here"></input>
        </label>
        <button
          onClick={() => {
            if (document.getElementById("gallery-input").value !== "") {
              setSiteGallery([
                ...siteGallery,
                document.getElementById("gallery-input").value,
              ]);
              document.getElementById("gallery-input").value = "";
            } else {
              alert("no image");
            }
          }}
        >
          Upload this image
        </button>
        <h5>Site Gallery</h5>
        <h6>Click below to preview the image!</h6>
        <select
          id="gallery-image-select"
          size="5"
          onChange={(event) => {
            setCurrentGalleryImage(event.currentTarget.value);
            document.getElementById("preview-img").classList.remove("hidden");
          }}
        >
          {siteGallery.map((element) => (
            <option>{element}</option>
          ))}
        </select>
        <div className="hidden" id="preview-img">
          <img className="demo-img" src={currentGalleryImage}></img>
          <button
            onClick={() => {
              setSiteGallery(
                siteGallery.filter(
                  (element) =>
                    element !==
                    document.getElementById("gallery-image-select").value
                )
              );
              document.getElementById("preview-img").classList.add("hidden");
            }}
          >
            Delete this image
          </button>
        </div>
        <button
          onClick={(event) => {
            editSiteDetail(data.title, {
              ...siteDetailForm,
              gallery: siteGallery,
            });
            let button = event.currentTarget;
            showSubmit(button, "Submitted");
          }}
        >
          Submit Detail Change
        </button>
      </div>
      <div className="site-info">
        <h3>
          Currently, this page is{" "}
          <span
            className={
              sitePublishedStatus
                ? "page-status-published"
                : "page-status-retracted"
            }
          >
            {sitePublishedStatus ? "PUBLISHED" : "RETRACTED"}
          </span>
        </h3>
        <button
          onClick={(event) => {
            toggleSiteStatus(data.title);
            setTimeout(() => {
              setSitePublishedStatus(!sitePublishedStatus);
            }, 200);
            showSubmit(
              event.currentTarget,
              !sitePublishedStatus ? "PUBLISHED" : "RETRACTED"
            );
          }}
        >
          {"Publish/Retract" + " the site"}
        </button>
      </div>
    </div>
  );
}

function convert(strings) {
  if (strings === undefined) {
    return "";
  } else {
    return strings
      .reduce((result, element) => result + element + "\n\n", "")
      .slice(0, -2);
  }
}
