import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyTYxPctOQXbBpgkpVgLjIN6OZpwdiO9o",
  authDomain: "telegram-19cb7.firebaseapp.com",
  databaseURL: "https://telegram-19cb7-default-rtdb.firebaseio.com",
  projectId: "telegram-19cb7",
  storageBucket: "telegram-19cb7.firebasestorage.app",
  messagingSenderId: "169993109301",
  appId: "1:169993109301:web:43701ec49ee62d3665d67c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
