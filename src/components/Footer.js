import React from 'react';
import footerData from "../data/authors.json";

export default function Footer() {
const footerDataArray = footerData;
let AuthorMap = footerDataArray.map((element) => {
                return (
                <p key={element.AuthorData}>{element.AuthorData}</p>
                );
});
let EmailMap = footerDataArray.map((element) => {
    return (
        <p key={element.AuthorData}><a href={"mailto:" + element.AuthorData2}>{element.AuthorData2}</a></p>
    );
});
let PhoneMap = footerDataArray.map((element) => {
    return (
        <p key={element.AuthorData}><a href={"tel:" + element.AuthorData3}>{element.AuthorData3}</a></p>
    );
});
return(
    <footer>
        <div className="container">
        <div className="row">
            <div className="col-4 pt-3">
            <p className="bolded">Authors</p>
           {AuthorMap}
            </div>

            <div className="col-4 pt-3">
            <p className="bolded">Email</p>
            {EmailMap}
            </div>

            <div className="col-4 pt-3">
            <p className="bolded">Phone Number</p>
            {PhoneMap}
            </div>

            <form></form>
        </div>
        </div>

        <p className="text-center m-0">Subscribe to our Email!</p>
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

