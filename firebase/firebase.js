// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDywYri-v_BhhpmTM3PNTD64rYZcLm8ZGk",
  authDomain: "maxgradesi.firebaseapp.com",
  projectId: "maxgradesi",
  storageBucket: "maxgradesi.firebasestorage.app",
  messagingSenderId: "105199601256",
  appId: "1:105199601256:web:8ae6ba8cc45f3501155ddd",
  measurementId: "G-LPWC5LCHFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };