import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Thông tin cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBJcYuGr2Z7RbKEoyLumnECtQ5Ozf1uhzE",
  authDomain: "elearning-d77d8.firebaseapp.com",
  projectId: "elearning-d77d8",
  storageBucket: "elearning-d77d8.appspot.com",
  messagingSenderId: "69651394872",
  appId: "1:69651394872:web:c1e0f4c133b437606151cd",
  measurementId: "G-DPLE038X5G",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Analytics
const analytics = getAnalytics(app);

// Khởi tạo và export Firebase Authentication
export const auth = getAuth(app);

// Khởi tạo và export Firestore
export const db = getFirestore(app);

// Export default app
export default app;