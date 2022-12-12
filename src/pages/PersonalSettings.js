import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import Form from "react-bootstrap/Form";
import { showSubmit } from "../components/showSubmit";

export default function EditUserInfo(props) {
  const user = props.user;
  const [userInfoForm, setUserInfoForm] = useState({
    avatar: "",
    displayName: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log("!");
    updateProfile(user, {
      displayName: userInfoForm.displayName,
      photoURL: userInfoForm.avatar,
    });
    const db = getDatabase();
    update(ref(db, `users/${user.uid}`), {
      name: userInfoForm.displayName,
      avatar: userInfoForm.avatar,
    });
  }

  function handleChange(event) {
    setUserInfoForm({
      ...userInfoForm,
      [event.target.name]: event.target.value,
    });
  }
  useEffect(() => {
    if (user !== null) {
      setUserInfoForm({ avatar: user.photoURL, displayName: user.displayName });
    }
  }, [user]);

  if (user !== null) {
    return (
      <div>
        <div className="site-info personal-settings">
          <h3>Edit personal info</h3>
          <div>
            <img
              src={
                userInfoForm.avatar === ""
                  ? "/img/default-avatar.jpg"
                  : userInfoForm.avatar
              }
            ></img>
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <label>
                Link for avatar
                <input
                  name="avatar"
                  defaultValue={userInfoForm.avatar}
                  placeholder="http://"
                ></input>
              </label>
              <label>
                DisplayName
                <input
                  name="displayName"
                  defaultValue={userInfoForm.displayName}
                  placeholder="John Doe"
                ></input>
              </label>
              <button
                onClick={(event) => {
                  showSubmit(event.currentTarget, "Submitted");
                  handleSubmit(event);
                }}
              >
                Submit Change
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="site-info">
          <p>
            Please <a href="/login">Logd In</a>!
          </p>
        </div>
      </div>
    );
  }
}
