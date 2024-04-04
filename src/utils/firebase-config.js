import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDcJaVCAZ2giqgR8BQsCPMZVerwapVivGU",
  authDomain: "flixxit-b9788.firebaseapp.com",
  projectId: "flixxit-b9788",
  storageBucket: "flixxit-b9788.appspot.com",
  messagingSenderId: "390190830193",
  appId: "1:390190830193:web:efa1ee9fc11b5560cb81d0",
  measurementId: "G-0ZEQS6JYTW"
};
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);