import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const ClassRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosClient.get('/requests');
        setRequests(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách lớp:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Đang tải danh sách lớp...</p>;

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div>
      <h3>📚 Các lớp mới cần tìm Gia sư</h3>
      {requests.length === 0 ? (
        <p>Chưa có lớp học nào đang tìm gia sư.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={cardStyle}>
            <h4 style={{ margin: '0 0 5px 0', color: '#d63384' }}>{req.subject} - {req.grade}</h4>
            <p style={{ margin: '5px 0' }}>📍 Khu vực: {req.address}</p>
            <p style={{ margin: '5px 0' }}>📝 Yêu cầu: {req.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <strong>💰 {req.budget.toLocaleString()} đ/buổi</strong>
              <span style={{ fontStyle: 'italic', fontSize: '0.9em' }}>
                Đăng bởi: {req.user?.fullName}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ClassRequestList;