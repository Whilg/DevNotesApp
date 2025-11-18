// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8V2E1fRTeigFawJ63iPLr8GCUZ3G-FKA",
  authDomain: "devnotes-a4c7c.firebaseapp.com",
  projectId: "devnotes-a4c7c",
  storageBucket: "devnotes-a4c7c.firebasestorage.app",
  messagingSenderId: "997189456452",
  appId: "1:997189456452:web:55530f9dc19095f2d22211",
  measurementId: "G-0Z6SJZ2VNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;