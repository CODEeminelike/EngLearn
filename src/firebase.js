// src/firebase.js



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // << QUAN TRỌNG: Đảm bảo dòng này có để import getAuth

// Thông tin cấu hình Firebase của bạn
const firebaseConfig = { 
  apiKey: "AIzaSyBJcYuGr2Z7RbKEoyLumnECtQ5Ozf1uhzE", 
  authDomain: "elearning-d77d8.firebaseapp.com", 
  projectId: "elearning-d77d8", 
  storageBucket: "elearning-d77d8.appspot.com", // Kiểm tra lại đuôi .appspot.com nếu cần
  messagingSenderId: "69651394872", 
  appId: "1:69651394872:web:c1e0f4c133b437606151cd", 
  measurementId: "G-DPLE038X5G" 
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// (Tùy chọn) Khởi tạo Analytics nếu bạn muốn sử dụng
const analytics = getAnalytics(app);

// Khởi tạo và EXPORT Firebase Authentication service
export const auth = getAuth(app); // << QUAN TRỌNG: Dòng này phải có và không bị comment

// Bạn vẫn có thể giữ default export nếu muốn
export default app;