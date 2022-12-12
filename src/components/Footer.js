import React from "react";
import footerData from "../data/authors.json";

export default function Footer(props) {
  const footerDataArray = footerData;
  

  let columnMap = footerDataArray.map((element, index) => {
    return (
      <div className="containers" key={"container-" + index}>
        <div className="row">
          <div className="col-4 padding-zero">
            {element.columnName !== undefined ? (
              <p className="bolded footer-header">{element.columnName}</p>
            ) : (
              ""
            )}
            <p key={element.AuthorData + index} className="padding-zero pb-4">
              {element.AuthorData}
            </p>
          </div>

          <div className="col-4 padding-zero">
            {element.columnName2 !== undefined ? (
              <p className="bolded footer-header">{element.columnName2}</p>
            ) : (
              ""
            )}
            <p key={element.AuthorData + index} className="padding-zero pb-4">
              <a href={"mailto:" + element.AuthorData2}>
                {element.AuthorData2}
              </a>
            </p>
          </div>

          <div className="col-4 padding-zero">
            {element.columnName3 !== undefined ? (
              <p className="bolded footer-header">{element.columnName3}</p>
            ) : (
              ""
            )}
            <p key={element.AuthorData + index} className="padding-zero pb-4">
              <a href={"tel:" + element.AuthorData3}>{element.AuthorData3}</a>
            </p>
          </div>

          <form></form>
        </div>
      </div>
    );
  });

  return (
    <footer>
      {columnMap}

      <p className="text-center m-0 pt-3">Subscribe to our Email!</p>
      <div className="centering">
        <form>
          <label className="email-footer p-3 " htmlFor="email_input">
            Email:
          </label>
          <input
            id="email_input "
            type="email "
            name="email"
            placeholder="email@domain.com "
          />
          <button className= "submit-foot" type="button ">Submit</button>
        </form>
      </div>
      <p className="copyrighted centered ">
        {" "}
        &copy;2022 West Coast Tourist Recommendations
      </p>
    </footer>
  );
}
