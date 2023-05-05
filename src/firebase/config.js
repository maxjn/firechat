// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCImNlOyFHeIvBoim_AYv528pa-N15fEvM",

  authDomain: "firechat-cf757.firebaseapp.com",

  projectId: "firechat-cf757",

  storageBucket: "firechat-cf757.appspot.com",

  messagingSenderId: "912657192422",

  appId: "1:912657192422:web:bfccffa70dbce267fd3227",
};

// Initialize Firebase

export default app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
