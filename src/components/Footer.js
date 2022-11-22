import React from 'react';
import footerData from "../data/authors.json";

export default function Footer() {
const footerDataArray = footerData;

let columnMap = footerDataArray.map((element) => {
    return (
        <div className="containers">
        <div className="row">
            <div className="col-4 padding-zero">
            {element.columnName !== undefined ? <p className="bolded footer-header">{element.columnName}</p> : ""}
            <p key={element.AuthorData} class="padding-zero">{element.AuthorData}</p>
            </div>

            <div className="col-4 padding-zero">
            {element.columnName2 !== undefined ? <p className="bolded footer-header">{element.columnName2}</p> : ""}
            <p key={element.AuthorData} className="padding-zero"><a href={"mailto:" + element.AuthorData2}>{element.AuthorData2}</a></p>
            </div>

            <div className="col-4 padding-zero">
            {element.columnName3 !== undefined ? <p className="bolded footer-header">{element.columnName3}</p> : ""}
            <p key={element.AuthorData} class="padding-zero"><a href={"tel:" + element.AuthorData3}>{element.AuthorData3}</a></p>
            </div>

            <form></form>
        </div>
        </div>
    );
});


return(
    <footer>
       {columnMap}

        <p className="text-center m-0 pt-3">Subscribe to our Email!</p>
        <div className="centering">
        <form>

            <label className="p-3 " htmlFor="email_input ">Email:</label>
            <input id="email_input " type="email " name="email
            " placeholder="email@domain.com "/>
            <button type="button ">Submit</button>

        </form>
        </div>
        <p className="copyrighted centered "> &copy;2022 West Coast Tourist Recommendations</p>
    </footer>);
}

