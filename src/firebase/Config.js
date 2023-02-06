import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQLRJYr_h10dyPkgev2BIewO9WrlcFluk",
  authDomain: "mystoreweb.firebaseapp.com",
  projectId: "mystoreweb",
  storageBucket: "mystoreweb.appspot.com",
  messagingSenderId: "675981393147",
  appId: "1:675981393147:web:217d7995453e46e5e7445e",
};

const app = initializeApp(firebaseConfig);
// const google = new GoogleAuthProvider();
// const facebook = new FacebookAuthProvider();
const db = getFirestore(app);

export {
  app,
  //  google, facebook,
  db,
};
