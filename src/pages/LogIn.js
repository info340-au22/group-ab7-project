import React, { useState } from "react";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

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
  const auth = getAuth();
  return (
    <div class="page-center">
      <h1>Please sign-in:</h1>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  );
}
