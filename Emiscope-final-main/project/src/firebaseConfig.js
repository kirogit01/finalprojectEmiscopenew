// src/firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDX4VPtZVVQacTheDwlT18iL0a3_hTYC2E",
  authDomain: "emiscope-test.firebaseapp.com",
  databaseURL: "https://emiscope-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "emiscope-test",
  storageBucket: "emiscope-test.appspot.com",
  messagingSenderId: "529715981891",
  appId: "1:529715981891:web:e546ce4c46ebc8f988aef6"
};

// Only initialize if no app exists, otherwise get existing one
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Reuse the existing one
}

// Now get the database from the initialized app
const database = getDatabase(app);

export { database, ref, onValue };
