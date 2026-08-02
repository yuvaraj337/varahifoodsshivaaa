import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDma03fVgWoEA_BBb4ndlgCDhP3UJrbXg",
  authDomain: "varahi-eat-fit-fb6fa.firebaseapp.com",
  projectId: "varahi-eat-fit-fb6fa",
  storageBucket: "varahi-eat-fit-fb6fa.firebasestorage.app",
  messagingSenderId: "314737068245",
  appId: "1:314737068245:web:0826c637783eb44a4eba5c"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);