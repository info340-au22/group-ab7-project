import React, { useState, useEffect, useMemo } from "react";
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { useSearchParams } from "react-router-dom";
//import Select from 'react-select'
import { Select } from "react-select";
import Form from "react-bootstrap/Form";
import SiteCard from "../components/SiteCard";
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
  { value: "Natural", label: "Natural" },
  { value: "Cultural", label: "Cultural" },
];

export default function EditSitePage(props) {
  const [searchParams] = useSearchParams();
  let siteName = searchParams.get("siteName");

  let [data, setData] = useState({});
  let [detail, setDetail] = useState({});
  let [loadingData, setLoadingData] = useState(true);
  let [loadingDetail, setLoadingDetail] = useState(true);

  const [siteInfoForm, setSiteInfoForm] = useState({
    state: "",
    type: "",
    siteLocation: "",
    siteFact: "",
    imgSrc: "",
  });

  const [siteDetailForm, setSiteDetailForm] = useState({
    intro: [],
    mapName: "",
    stateFull: "",
    bannerImg: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(siteInfoForm);
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
    console.log(siteDetailForm);
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(siteInfoForm);
  return (
    <div>
      <div className="m-3">
        <label className="mx-3">Choose file: </label>
        <input type="file" id="fileInput" />
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            console.log(document.getElementById("fileInput").value);
          }}
        >
          Upload
        </button>
      </div>

      <SiteCard
        clickable="false"
        singleSiteData={{
          ...siteInfoForm,
          title: siteName,
          siteName: siteName,
        }}
      />
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          <h3>Edit Site</h3>
        </div>
        <h4>Site Name: {data.title}</h4>

        <label>State</label>
        <Form.Select name="state" value={siteInfoForm.state}>
          <option value="">Select State...</option>
          {optionsState.map((element) => {
            return (
              <option key={element.value} value={element.value}>
                {element.label}
              </option>
            );
          })}
        </Form.Select>
        <label>Type</label>
        <Form.Select name="type" value={siteInfoForm.type}>
          <option value="">Select Type...</option>
          {optionsType.map((element) => {
            return (
              <option key={element.value} value={element.value}>
                {element.label}
              </option>
            );
          })}
        </Form.Select>
        <label>
          Site Location:{" "}
          <input
            type="text"
            name="siteLocation"
            placeholder="eg. Seattle, WA"
            value={siteInfoForm.siteLocation}
          />
        </label>
        <label>
          Site Fact:{" "}
          <input
            type="text"
            name="siteFact"
            placeholder="SiteFact"
            value={siteInfoForm.siteFact}
          />
        </label>
        <label>
          Card Image Link:{" "}
          <input
            type="text"
            name="imgSrc"
            placeholder="http://"
            value={siteInfoForm.imgSrc}
          />
        </label>
        <div>
          <button>Submit Site Info</button>
        </div>
      </form>
      <button
        onClick={() => {
          editSiteInfo(data.title, siteInfoForm);
        }}
      >
        Submit Info Change
      </button>

      <form onSubmit={handleSubmitDetail} onChange={handleChangeDetail}>
        <label>
          <textarea name="intro" value={siteDetailForm.intro}></textarea>
        </label>
        <label>
          Map location
          <input name="mapName" value={siteDetailForm.mapName}></input>
        </label>
        <label>
          State Full Name
          <input name="stateFull" value={siteDetailForm.stateFull}></input>
        </label>
        <label>
          Site Detail Banner Image
          <input name="bannerImg" value={siteDetailForm.bannerImg}></input>
        </label>
        <button>Log Site Detail</button>
      </form>
      <button
        onClick={() => {
          editSiteDetail(data.title, siteDetailForm);
        }}
      >
        Submit Detail Change
      </button>
      <button
        onClick={() => {
          toggleSiteStatus(data.title);
        }}
      >
        Publish/Retract the site
      </button>
    </div>
  );
}
