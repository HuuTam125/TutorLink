import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
<h1 className="text-3xl font-bold text-red-600 underline">
  Kiểm tra Tailwind CSS
</h1>
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Hàm login trong AuthContext trả về dữ liệu user (bao gồm role)
      const userData = await login(email, password);

      toast.success('Đăng nhập thành công!');

      // 2. Kiểm tra Role để điều hướng (Routing Logic)
      if (userData.role === 'admin') {
        navigate('/admin'); // Admin thì vào trang quản trị
      } else {
        navigate('/'); // Người thường thì ra trang chủ
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  const formStyle = { maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' };
  const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center' }}>Đăng Nhập</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Mật khẩu"
          onChange={onChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={{ ...inputStyle, background: '#28a745', color: 'white', cursor: 'pointer' }}>
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;