// Import // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// eslint-disable-next-line no-unused-vars
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDY3pyV5d_MjSt6zW98WIJh6aeaswV9bSQ",
  authDomain: "ai-trip-planner-47406.firebaseapp.com",
  projectId: "ai-trip-planner-47406",
  storageBucket: "ai-trip-planner-47406.appspot.com",
  messagingSenderId: "254281812722",
  appId: "1:254281812722:web:7a9faa533ae101ae6dde6b",
  measurementId: "G-1Q1TX4B7HX"
};


// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 // eslint-disable-next-line no-undef
 export const db=getFirestore(app)
// const analytics = getAnalytics(app);