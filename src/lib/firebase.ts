import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  projectId: "riko-backend",
  appId: "1:587113211834:web:ea229ecd99bdef309b5f83",
  databaseURL: "https://riko-backend-default-rtdb.firebaseio.com",
  storageBucket: "riko-backend.firebasestorage.app",
  apiKey: "AIzaSyBk8fJTrwaUHknczoICpEqImzkh_zXR6O4",
  authDomain: "riko-backend.firebaseapp.com",
  messagingSenderId: "587113211834",
  measurementId: "G-7X6FY3B53Y"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
