
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8PxESOZDO73KkX0snNDEblF6yxjpjvfA",
  authDomain: "frejun-3fcff.firebaseapp.com",
  projectId: "frejun-3fcff",
  storageBucket: "frejun-3fcff.appspot.com",
  messagingSenderId: "523091290950",
  appId: "1:523091290950:web:2956e4c24172d72c211347",
  measurementId: "G-B1YCEW9B7R"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};