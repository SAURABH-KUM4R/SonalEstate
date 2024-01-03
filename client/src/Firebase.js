// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sonal-estate.firebaseapp.com",
  projectId: "sonal-estate",
  storageBucket: "sonal-estate.appspot.com",
  messagingSenderId: "424825987250",
  appId: "1:424825987250:web:47526c6251b9d03db0e9ab",
  measurementId: "G-NSBGCCMKBQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);