// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2BcSb3-Ur0I4mKo1ItlFsD2SZQeVkOIs",
  authDomain: "oprint3dsocialweb.firebaseapp.com",
  projectId: "oprint3dsocialweb",
  storageBucket: "oprint3dsocialweb.firebasestorage.app",
  messagingSenderId: "514182306491",
  appId: "1:514182306491:web:2c624d193accb5342de79e",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
