import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const TutorDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL (ví dụ: /tutor/123 -> id = 123)
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axiosClient.get(`/tutors/${id}`);
        setTutor(res.data);
      } catch (error) {
        console.error('Lỗi lấy chi tiết:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Đang tải thông tin...</div>;
  if (!tutor) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Không tìm thấy gia sư này.</div>;

  // Styles
  const containerStyle = { maxWidth: '800px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };
  const headerStyle = { display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' };
  const avatarStyle = { width: '100px', height: '100px', borderRadius: '50%', background: '#007bff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' };
  const sectionStyle = { marginBottom: '15px' };
  const labelStyle = { fontWeight: 'bold', color: '#555' };
  const btnStyle = { background: '#28a745', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'inline-block' };

  return (
    <div style={containerStyle}>
      <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>← Quay lại danh sách</Link>

      {/* Header Info */}
      <div style={headerStyle}>
        <div style={avatarStyle}>
          {tutor.user?.fullName?.charAt(0)}
        </div>
        <div>
          <h1 style={{ margin: 0 }}>{tutor.user?.fullName}</h1>
          <p style={{ color: '#777', margin: '5px 0' }}>{tutor.area}</p>
          <span style={{ background: '#e3f2fd', color: '#0d47a1', padding: '5px 10px', borderRadius: '15px', fontSize: '0.9em' }}>
            {tutor.teachingMethod === 'online' ? 'Dạy Online' : tutor.teachingMethod === 'offline' ? 'Dạy Tại nhà' : 'Online & Tại nhà'}
          </span>
        </div>
      </div>

      {/* Details */}
      <div style={sectionStyle}>
        <h3 style={{ borderLeft: '4px solid #007bff', paddingLeft: '10px' }}>Giới thiệu</h3>
        <p style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>{tutor.bio}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <p><span style={labelStyle}>Môn dạy:</span> {tutor.subjects.join(', ')}</p>
          <p><span style={labelStyle}>Khối lớp:</span> {tutor.grades.join(', ')}</p>
          <p><span style={labelStyle}>Kinh nghiệm:</span> {tutor.experience}</p>
        </div>
        <div>
          <p><span style={labelStyle}>Học phí tham khảo:</span> <span style={{ color: '#d63384', fontSize: '1.2em', fontWeight: 'bold' }}>{tutor.hourlyRate.toLocaleString()} đ/giờ</span></p>
          <p><span style={labelStyle}>Liên hệ:</span> {tutor.user?.email}</p>
          <p><span style={labelStyle}>Điện thoại:</span> {tutor.user?.phone}</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href={`mailto:${tutor.user?.email}`} style={btnStyle}>📧 Gửi Email liên hệ</a>
      </div>
    </div>
  );
};

export default TutorDetailPage;