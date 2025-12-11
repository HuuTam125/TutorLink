import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostRequestPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    description: '',
    sessionsPerWeek: 2,
    budget: 0,
    address: ''
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/requests', formData);
      toast.success('Đăng yêu cầu tìm gia sư thành công!');
      navigate('/');
    } catch (error) {
      toast.error('Có lỗi xảy ra');
      console.error(error);
    }
  };

  // Styles (Tương tự trang trên)
  const containerStyle = { maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' };
  const inputGroup = { marginBottom: '15px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' };
  const inputStyle = { width: '100%', padding: '8px', boxSizing: 'border-box' };

  return (
    <div style={containerStyle}>
      <h2>📝 Đăng lớp tìm Gia sư</h2>
      <p>Mô tả nhu cầu học tập để kết nối với gia sư phù hợp.</p>

      <form onSubmit={onSubmit}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Môn học</label>
            <input type="text" name="subject" value={formData.subject} onChange={onChange} required style={inputStyle} placeholder="Tiếng Anh" />
          </div>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Lớp</label>
            <input type="text" name="grade" value={formData.grade} onChange={onChange} required style={inputStyle} placeholder="Lớp 6" />
          </div>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Yêu cầu chi tiết</label>
          <textarea name="description" value={formData.description} onChange={onChange} rows="3" required style={inputStyle} placeholder="Cần tìm gia sư nữ, giọng miền Nam..." />
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Địa chỉ / Khu vực học</label>
          <input type="text" name="address" value={formData.address} onChange={onChange} required style={inputStyle} placeholder="Đường ABC, Quận XYZ" />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Số buổi/tuần</label>
            <input type="number" name="sessionsPerWeek" value={formData.sessionsPerWeek} onChange={onChange} required style={inputStyle} />
          </div>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Ngân sách/buổi (VNĐ)</label>
            <input type="number" name="budget" value={formData.budget} onChange={onChange} required style={inputStyle} />
          </div>
        </div>

        <button type="submit" style={{ ...inputStyle, background: '#28a745', color: 'white', padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Đăng Bài Ngay
        </button>
      </form>
    </div>
  );
};

export default PostRequestPage;