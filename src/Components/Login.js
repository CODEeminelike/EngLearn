// src/Components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Import auth từ file firebase.js
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Import các hàm cần thiết

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false); // Trạng thái cho việc gửi email reset

  // Xử lý sự kiện đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');
    setResetEmailSent(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Đăng nhập thành công
      console.log("Đăng nhập thành công:", userCredential.user);
      setSuccessMessage(`Chào mừng trở lại, ${userCredential.user.email}!`);
      // setEmail(''); // Bạn có thể không muốn xóa email và pass sau khi đăng nhập thành công
      // setPassword('');
      
      // Tại đây bạn có thể:
      // - Lưu trạng thái đăng nhập của người dùng (ví dụ: dùng Context API hoặc Redux)
      // - Chuyển hướng người dùng đến trang dashboard hoặc trang chủ
    } catch (err) {
      // Xử lý lỗi từ Firebase
      console.error("Lỗi đăng nhập:", err.code, err.message);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Địa chỉ email không hợp lệ.");
      } else {
        setError("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
      }
    }
  };

  // Xử lý sự kiện quên mật khẩu
  const handlePasswordReset = async () => {
    setError(null); // Xóa lỗi đăng nhập cũ
    setSuccessMessage('');
    if (!email) {
      setError("Vui lòng nhập địa chỉ email của bạn vào ô Email để đặt lại mật khẩu.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setError(null); // Xóa lỗi nếu có
    } catch (err) {
      console.error("Lỗi gửi email đặt lại mật khẩu:", err.code, err.message);
      if (err.code === 'auth/user-not-found') {
        // Vẫn hiển thị thông báo thành công để không tiết lộ email nào đã đăng ký
        setResetEmailSent(true); 
      } else if (err.code === 'auth/invalid-email') {
        setError("Địa chỉ email không hợp lệ để gửi yêu cầu đặt lại mật khẩu.");
      } else {
        setError("Đã xảy ra lỗi khi gửi email đặt lại mật khẩu. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="login-email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập địa chỉ email"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="login-password" style={{ display: 'block', marginBottom: '5px' }}>Mật khẩu:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}
        {resetEmailSent && !error && ( // Chỉ hiển thị khi không có lỗi nghiêm trọng nào khác
          <p style={{ color: 'blue', marginBottom: '10px' }}>
            Nếu địa chỉ email của bạn tồn tại trong hệ thống, một liên kết đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn (bao gồm cả thư mục spam).
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            type="submit" 
            style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Đăng Nhập
          </button>
          <button 
            type="button" // Quan trọng: type="button" để không submit form
            onClick={handlePasswordReset}
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline', padding: '0' }}
          >
            Quên mật khẩu?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;