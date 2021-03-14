import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAulzTN-rYhtSHISrnQ7QteFAmrbCF0P-w",
    authDomain: "bt3103-week.firebaseapp.com",
    projectId: "bt3103-week",
    storageBucket: "bt3103-week.appspot.com",
    messagingSenderId: "371776241797",
    appId: "1:371776241797:web:6b0ca9feb74e0ba2f9e9ec",
    measurementId: "G-3H24WRJWX8"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;