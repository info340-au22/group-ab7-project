import React, { useState } from "react";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const firebaseUIConfig = {
  signInOptions: [
    //array of sign in options supported
    //array can include just "Provider IDs", or objects with the IDs and options
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: "popup", //don't redirect to authenticate
  credentialHelper: "none", //don't show the email account chooser
  callbacks: {
    //"lifecycle" callbacks
    signInSuccessWithAuthResult: () => {
      return false; //don't redirect after authentication
    },
  },
};

export default function LogInPage(props) {
  return (
    <div class="page-center">
      <UserSignIn />
    </div>
  );
}

function UserSignIn() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    //still waiting
    return <p>Initializing user</p>;
  }

  if (error) {
    //error logging in
    return <p>Error: {error}</p>;
  }

  if (user) {
    //user is defined, so logged in
    setTimeout(() => {
      navigate(-1);
    }, 1000);
    return (
      <div>
        <h3>Welcome, {user.displayName} !</h3>
        <h4>Taking you back...</h4>
      </div>
    );
  } else {
    //user is undefined
    return (
      <div>
        <h1>Please sign-in:</h1>
        <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
      </div>
    );
  }
}
