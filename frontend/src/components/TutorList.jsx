import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Link } from 'react-router-dom';

const TutorList = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axiosClient.get('/tutors');
        setTutors(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách gia sư:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Đang tải danh sách gia sư...</p>;

  // Style Card đơn giản
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div>
      <h3>👩‍🏫 Danh sách Gia sư nổi bật</h3>
      {tutors.length === 0 ? (
        <p>Chưa có gia sư nào.</p>
      ) : (
        tutors.map((tutor) => (
          <div key={tutor._id} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* Avatar placeholder nếu không có ảnh */}
              <div style={{ width: '50px', height: '50px', background: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {tutor.user?.fullName?.charAt(0)}
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>
                  <Link to={`/tutor/${tutor._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                    {tutor.user?.fullName}
                  </Link>
                </h4>
                <p style={{ margin: 0, color: '#666' }}>{tutor.subjects.join(', ')} - {tutor.area}</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>{tutor.bio.substring(0, 100)}...</p>
                <strong style={{ color: '#28a745' }}>{tutor.hourlyRate.toLocaleString()} đ/giờ</strong>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TutorList;