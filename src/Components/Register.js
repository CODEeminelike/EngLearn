// src/Components/Register.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // THÊM DÒNG NÀY

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Đăng ký thành công:", userCredential.user);
      // setSuccessMessage(`Tài khoản ${userCredential.user.email} đã được tạo thành công! Vui lòng đăng nhập.`);
      // Thay vì chỉ hiện thông báo, chúng ta sẽ chuyển hướng
      
      setEmail('');
      setPassword('');

      // CHUYỂN HƯỚNG VỀ TRANG ĐĂNG NHẬP SAU KHI ĐĂNG KÝ THÀNH CÔNG
      alert(`Tài khoản ${userCredential.user.email} đã được tạo thành công! Bạn sẽ được chuyển đến trang đăng nhập.`); // Thông báo nhanh
      navigate('/login'); // << THÊM DÒNG NÀY

    } catch (err) {
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
        {/* Input fields (giữ nguyên) */}
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
        {/* successMessage có thể không cần thiết nữa nếu chúng ta chuyển hướng ngay */}
        {/* {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>} */}
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