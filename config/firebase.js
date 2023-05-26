// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBlWKjwywlluQRciaiDNn2OOc0DtqPrvOI",
  authDomain: "habit-tracker-6b20a.firebaseapp.com",
  projectId: "habit-tracker-6b20a",
  storageBucket: "habit-tracker-6b20a.appspot.com",
  messagingSenderId: "320214587775",
  appId: "1:320214587775:web:5ea6bcea7727aabea2224a",
  measurementId: "G-TXPV23F1N0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export { firebase }