import React, { useState } from "react";

export default function NewSitePage(props) {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(contactInfo);
  }

  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          <h3>Add New Site</h3>
        </div>
        <div>
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div>
          <input type="email" name="email" placeholder="Email" />
        </div>
        <div>
          <input type="number" name="phonenumber" placeholder="Phone Number" />
        </div>
        <div>
          <button>Submit Contact</button>
        </div>
      </form>
    </div>
  );
}
