import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';

const TutorProfilePage = () => {
  const [loading, setLoading] = useState(true);

  // State lưu trạng thái duyệt của hồ sơ (để hiện thông báo)
  const [approvalStatus, setApprovalStatus] = useState(null);

  const [formData, setFormData] = useState({
    bio: '',
    subjects: '',
    grades: '',
    area: '',
    teachingMethod: 'both',
    hourlyRate: 0,
    experience: ''
  });

  // 1. Load dữ liệu hồ sơ ngay khi vào trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get('/tutors/me');
        if (res.data) {
          // Fill dữ liệu từ server vào form
          setFormData({
            bio: res.data.bio,
            subjects: res.data.subjects.join(', '), // Mảng -> Chuỗi
            grades: res.data.grades.join(', '),     // Mảng -> Chuỗi
            area: res.data.area,
            teachingMethod: res.data.teachingMethod,
            hourlyRate: res.data.hourlyRate,
            experience: res.data.experience || ''
          });
          // Lưu trạng thái duyệt
          setApprovalStatus(res.data.isApproved);
        }
      } catch (error) {
        // Nếu lỗi 404 (chưa có hồ sơ - trường hợp hiếm do logic mới đã tạo khi đăng ký)
        // Thì form vẫn giữ nguyên giá trị rỗng để user nhập mới
        console.log("Chưa tìm thấy hồ sơ, vui lòng tạo mới.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/tutors', formData);
      toast.success('Cập nhật hồ sơ thành công!');
      // Không cần navigate đi đâu, ở lại để user thấy đã cập nhật
      // Có thể gọi lại fetchProfile nếu muốn chắc chắn
    } catch (error) {
      toast.error('Lỗi cập nhật hồ sơ');
      console.error(error);
    }
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải thông tin...</div>;

  // --- STYLES ---
  const containerStyle = { maxWidth: '700px', margin: '30px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' };
  const inputGroup = { marginBottom: '15px' };
  const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' };
  const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc' };

  // Style cho thông báo trạng thái
  const statusAlertStyle = {
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: approvalStatus ? '#d4edda' : '#fff3cd', // Xanh nếu true, Vàng nếu false
    color: approvalStatus ? '#155724' : '#856404',
    border: `1px solid ${approvalStatus ? '#c3e6cb' : '#ffeeba'}`
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#007bff' }}>✏️ Quản lý Hồ sơ Gia sư</h2>

      {/* PHẦN HIỂN THỊ TRẠNG THÁI DUYỆT */}
      <div style={statusAlertStyle}>
        {approvalStatus === true ? (
          <span>Hồ sơ của bạn ĐÃ ĐƯỢC DUYỆT và đang hiển thị công khai.</span>
        ) : (
          <span>Hồ sơ đang CHỜ DUYỆT. Vui lòng đợi Admin kiểm tra để được hiển thị.</span>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div style={inputGroup}>
          <label style={labelStyle}>Giới thiệu bản thân (Bio)</label>
          <textarea name="bio" value={formData.bio} onChange={onChange} rows="4" required style={inputStyle} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Môn dạy (ngăn cách dấu phẩy)</label>
            <input type="text" name="subjects" value={formData.subjects} onChange={onChange} required style={inputStyle} />
          </div>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Lớp dạy (ngăn cách dấu phẩy)</label>
            <input type="text" name="grades" value={formData.grades} onChange={onChange} required style={inputStyle} />
          </div>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Khu vực dạy</label>
          <input type="text" name="area" value={formData.area} onChange={onChange} required style={inputStyle} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Học phí/giờ (VNĐ)</label>
            <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={onChange} required style={inputStyle} />
          </div>
          <div style={{ ...inputGroup, flex: 1 }}>
            <label style={labelStyle}>Hình thức dạy</label>
            <select name="teachingMethod" value={formData.teachingMethod} onChange={onChange} style={inputStyle}>
              <option value="online">Online</option>
              <option value="offline">Tại nhà (Offline)</option>
              <option value="both">Cả hai</option>
            </select>
          </div>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Kinh nghiệm</label>
          <input type="text" name="experience" value={formData.experience} onChange={onChange} style={inputStyle} />
        </div>

        <button type="submit" style={{ ...inputStyle, background: '#007bff', color: 'white', padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Lưu Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default TutorProfilePage;