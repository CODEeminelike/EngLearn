// src/Components/Register.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Import auth từ file firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import hàm đăng ký

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault(); // Ngăn form submit theo cách truyền thống
    setError(null); // Reset lỗi cũ
    setSuccessMessage(''); // Reset thông báo thành công cũ

    // Kiểm tra mật khẩu đơn giản (Firebase cũng sẽ kiểm tra phía server)
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    try {
      // Gọi hàm của Firebase để tạo người dùng mới
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Đăng ký thành công
      console.log("Đăng ký thành công:", userCredential.user);
      setSuccessMessage(`Tài khoản ${userCredential.user.email} đã được tạo thành công!`);
      
      // Xóa form sau khi đăng ký
      setEmail('');
      setPassword('');

      // Tại đây bạn có thể làm thêm:
      // - Tự động đăng nhập người dùng (Firebase đã làm điều này mặc định sau khi đăng ký thành công)
      // - Chuyển hướng người dùng đến trang dashboard hoặc trang chủ
      // - Gửi email xác thực (xem tài liệu Firebase để biết thêm)

    } catch (err) {
      // Xử lý lỗi từ Firebase
      console.error("Lỗi đăng ký:", err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError("Địa chỉ email này đã được sử dụng. Vui lòng chọn email khác.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Địa chỉ email không hợp lệ.");
      } else if (err.code === 'auth/weak-password') {
        setError("Mật khẩu quá yếu. Mật khẩu phải có ít nhất 6 ký tự.");
      } else {
        setError("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Đăng Ký Tài Khoản Mới</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="register-email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập địa chỉ email"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="register-password" style={{ display: 'block', marginBottom: '5px' }}>Mật khẩu:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}
        <button 
          type="submit" 
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Đăng Ký
        </button>
      </form>
    </div>
  );
};

export default Register;