import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDKVx7j0JxuJjUdeb4o3y4gYxqKEj9YaSc",
  authDomain: "social-geathering-app.firebaseapp.com",
  projectId: "social-geathering-app",
  storageBucket: "social-geathering-app.appspot.com",
  messagingSenderId: "298776888303",
  appId: "1:298776888303:web:9ab6b34ffa2a7aa8d52c1a",
  measurementId: "G-QQ22T4K7PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };