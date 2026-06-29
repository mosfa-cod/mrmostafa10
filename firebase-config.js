 // firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMvIzV131KdAjuHS8B6tCUBsmaGgloLUY",
  authDomain: "mostafa-acdemy-2645a.firebaseapp.com",
  projectId: "mostafa-acdemy-2645a",
  storageBucket: "mostafa-acdemy-2645a.firebasestorage.app",
  messagingSenderId: "371101699494",
  appId: "1:371101699494:web:3e79c870941afef5179367"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
