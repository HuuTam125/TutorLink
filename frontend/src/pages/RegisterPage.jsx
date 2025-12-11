import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', phone: '', role: 'student',
    // Các trường dành riêng cho Gia sư
    bio: '', subjects: '', grades: '', area: '', teachingMethod: 'both', hourlyRate: 0, experience: ''
  });

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validate cơ bản nếu là gia sư
    if (formData.role === 'tutor' && (!formData.subjects || !formData.area)) {
      return toast.error("Gia sư vui lòng nhập Môn dạy và Khu vực!");
    }

    try {
      await register(formData);
      toast.success('Đăng ký thành công!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  const inputStyle = { width: '100%', padding: '10px', margin: '5px 0', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' };
  const labelStyle = { fontWeight: 'bold', marginTop: '10px', display: 'block' };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Đăng Ký Tài Khoản</h2>

      <form onSubmit={onSubmit}>
        {/* --- PHẦN CHUNG CHO TẤT CẢ --- */}
        <label style={labelStyle}>Họ tên</label>
        <input type="text" name="fullName" onChange={onChange} required style={inputStyle} />

        <label style={labelStyle}>Email</label>
        <input type="email" name="email" onChange={onChange} required style={inputStyle} />

        <label style={labelStyle}>Mật khẩu</label>
        <input type="password" name="password" onChange={onChange} required style={inputStyle} />

        <label style={labelStyle}>Số điện thoại</label>
        <input type="text" name="phone" onChange={onChange} required style={inputStyle} />

        <label style={labelStyle}>Bạn là:</label>
        <select name="role" value={formData.role} onChange={onChange} style={inputStyle}>
          <option value="student">Học viên / Phụ huynh</option>
          <option value="tutor">Gia sư (Giáo viên / Sinh viên)</option>
        </select>

        {/* --- PHẦN RIÊNG: CHỈ HIỆN KHI LÀ GIA SƯ --- */}
        {formData.role === 'tutor' && (
          <div style={{ background: '#f8f9fa', padding: '15px', marginTop: '15px', borderRadius: '8px', border: '1px dashed #007bff' }}>
            <h4 style={{ marginTop: 0, color: '#007bff' }}>Thông tin Hồ sơ dạy học</h4>

            <label style={labelStyle}>Khu vực dạy (Quận/Huyện)</label>
            <input type="text" name="area" onChange={onChange} placeholder="Ví dụ: Cầu Giấy, Hà Nội" required style={inputStyle} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Môn dạy (ngăn cách dấu phẩy)</label>
                <input type="text" name="subjects" onChange={onChange} placeholder="Toán, Lý" required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Lớp dạy (ngăn cách dấu phẩy)</label>
                <input type="text" name="grades" onChange={onChange} placeholder="Lớp 10, 11" required style={inputStyle} />
              </div>
            </div>

            <label style={labelStyle}>Giới thiệu ngắn (Bio)</label>
            <textarea name="bio" onChange={onChange} rows="3" required style={inputStyle} placeholder="Kinh nghiệm, trường đang học..."></textarea>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Học phí mong muốn/giờ</label>
                <input type="number" name="hourlyRate" onChange={onChange} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Hình thức</label>
                <select name="teachingMethod" onChange={onChange} style={inputStyle}>
                  <option value="both">Cả hai</option>
                  <option value="online">Online</option>
                  <option value="offline">Tại nhà</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {/* ------------------------------------------- */}

        <button type="submit" style={{ ...inputStyle, background: '#28a745', color: 'white', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>
          Đăng Ký Ngay
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;