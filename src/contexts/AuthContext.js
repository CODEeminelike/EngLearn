// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import auth từ file firebase.js của bạn
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái chờ kiểm tra auth ban đầu

  useEffect(() => {
    // Lắng nghe sự thay đổi trạng thái đăng nhập từ Firebase
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // user sẽ là null nếu chưa đăng nhập, hoặc là object user nếu đã đăng nhập
      setLoading(false); // Kết thúc trạng thái chờ
    });

    // Cleanup subscription khi component unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
    // Bạn có thể thêm các hàm login, logout, register vào đây để quản lý tập trung
  };

  // Chỉ render children khi không còn ở trạng thái loading (đã kiểm tra auth xong)
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}