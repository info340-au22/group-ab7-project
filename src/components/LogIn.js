//import auth functions and variables from Firebase
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

//import the component -- pick one!
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"; //install option 1
import StyledFirebaseAuth from "./StyledFirebaseAuth"; //install option 2

//an object of configuration values
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

//the React compnent to render
export default function SignIn() {
  const auth = getAuth(); //access the "authenticator"
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  );
}
