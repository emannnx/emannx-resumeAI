// Firebase SDK configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnn7808vJATKVnyycsaTULt4LSiDcXIvc",
  authDomain: "sky-app-4306c.firebaseapp.com",
  projectId: "sky-app-4306c",
  storageBucket: "sky-app-4306c.appspot.com",
  messagingSenderId: "877566270218",
  appId: "1:877566270218:web:ca0dc617decebb5e1138f3",
  measurementId: "G-M8LMJG8FDP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
