import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9An9LiN5LQwFo_1PCnIFdGN1Y_aUHRNA",
    authDomain: "spius-net.firebaseapp.com",
    projectId: "spius-net",
    storageBucket: "spius-net.firebasestorage.app",
    messagingSenderId: "666035609005",
    appId: "1:666035609005:web:fe18302b7ecd6743f29524",
    measurementId: "G-QEPFLPHJH7"
  };

// Check if Firebase is already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
