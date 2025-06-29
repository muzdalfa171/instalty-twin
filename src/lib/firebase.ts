import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXbXbKOXKh3FYOHzqvhJZdwVJHDw_RLXM",
  authDomain: "geekfox-8297b.firebaseapp.com",
  projectId: "geekfox-8297b",
  storageBucket: "geekfox-8297b.appspot.com",
  messagingSenderId: "105765461015",
  appId: "1:105765461015:web:5997f8dc915ac08b232274"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;