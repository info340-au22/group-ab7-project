import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { useSearchParams } from "react-router-dom";
import Select from 'react-select'
import Form from 'react-bootstrap/Form';


const optionsState = [
  { value: 'WA', label: 'Washington' },
  { value: 'CA', label: 'California' },
  { value: 'NV', label: 'Nevada' },
  { value: 'ID', label: 'Idaho' },
  { value: 'OR', label: 'Oregon' }
]

const optionsType = [
  { value: 'Natural', label: 'Natural' },
  { value: 'Cultural', label: 'Cultural' }]

export default function EditSitePage(props) {
  const [searchParams] = useSearchParams();
  let siteName = searchParams.get("siteName");

  let [data, setData] = useState({});
  let [detail, setDetail] = useState({});
  let [loadingData, setLoadingData] = useState(true);
  let [loadingDetail, setLoadingDetail] = useState(true);

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [siteInfoForm, setSiteInfoForm] = useState({
    state: "",
    name: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(siteInfoForm);
  }

  const handleChange = (event) => {
    setSiteInfoForm({ ...siteInfoForm, [event.target.name]: event.target.value });
    console.log(event.target.value);
    console.log(siteInfoForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          <h3>Edit Site</h3>
        </div>
        <h4>Site Name: {data.title}</h4>
        <Form.Select aria-label="Default select example" name="state">
          <option>Select State...</option>
          {optionsState.map((element) => {
            return <option key={element.value} value={element.value}>{element.label}</option>
          })}
        </Form.Select>
        <label>
          Type
          <Select options={optionsType} />
        </label>
        <label>
          <div>
            Name:

            <input type="text" name="name" placeholder="Name" /></div>
        </label>

        <div>
          <button>Submit Contact</button>
        </div>
      </form>
    </div>
  );
}
