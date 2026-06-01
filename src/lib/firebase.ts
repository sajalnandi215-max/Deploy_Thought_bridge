import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCroA2QxCef9msqBZRQMnHF9ROy_VBWQwU",
  authDomain: "thoughtbridge-25673.firebaseapp.com",
  projectId: "thoughtbridge-25673",
  storageBucket: "thoughtbridge-25673.firebasestorage.app",
  messagingSenderId: "695905535161",
  appId: "1:695905535161:web:738950ad69337103e9c768",
  measurementId: "G-YWQHM935VE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();