import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDjsD4D38Q2PtTCGtJSW439lmNW9ZeKis8",
  authDomain: "e-commerce-react-117f3.firebaseapp.com",
  projectId: "e-commerce-react-117f3",
  storageBucket: "e-commerce-react-117f3.firebasestorage.app",
  messagingSenderId: "737780147789",
  appId: "1:737780147789:web:f46029b1f4e482b4221e04"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
