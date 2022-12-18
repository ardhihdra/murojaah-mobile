// const admin = require("firebase-admin");
// Import the functions you need from the SDKs you need
// const firebaseAnalytics = require("firebase/analytics")
import { getFirestore } from "firebase/firestore"
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// const serviceAccount = require("../credentials/murojaah-firebase-adminsdk.json");

import {
  firebase_apiKey,
  firebase_authDomain,
  firebase_projectId,
  firebase_storageBucket,
  firebase_messagingSenderId,
  firebase_appId,
  firebase_measurementId
} from '@env'

// let env;
// if (__DEV__) {
//   env = getEnvVars({ path: './.env.development' });
// } else {
//   env = getEnvVars({ path: './.env.production' });
// }
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebase_apiKey,
  authDomain: firebase_authDomain,
  projectId: firebase_projectId,
  storageBucket: firebase_storageBucket,
  messagingSenderId: firebase_messagingSenderId,
  appId: firebase_appId,
  measurementId: firebase_measurementId
};

// const adminApp = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://murojaah-159bb.firebasio.com"
// });
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = firebaseAnalytics.getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const firestoreDb = getFirestore(app);
// const db = adminApp.firestore();

const auth = getAuth(app);

export {
  auth,
  firestoreDb,
}