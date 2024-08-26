
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkpAY0YQWQG603LVCm5H93d_ae09fGnaU",
  authDomain: "planificador-de-viajes-final.firebaseapp.com",
  projectId: "planificador-de-viajes-final",
  storageBucket: "planificador-de-viajes-final.appspot.com",
  messagingSenderId: "399950622200",
  appId: "1:399950622200:web:10cd071e951c58bef2fa0d"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, 'ai-trip-planner');
