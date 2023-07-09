import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlA2mEsxng2uXFhhNCE7ISw8Tt7zHfllw",
  authDomain: "xbotix-leaderboard.firebaseapp.com",
  projectId: "xbotix-leaderboard",
  storageBucket: "xbotix-leaderboard.appspot.com",
  messagingSenderId: "214823294093",
  appId: "1:214823294093:web:590c5640d78eed130d3ec4",
  databaseURL:
    "https://xbotix-leaderboard-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

const firebase_auth = getAuth(app);
const firebase_database = getDatabase(app);

export { firebase_auth, firebase_database };
