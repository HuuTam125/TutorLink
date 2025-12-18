// src/components/user/MyRequestsTab.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';

const MyRequestsTab = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await axiosClient.get('/requests/my-requests');
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa yêu cầu này?")) return;
    try {
      await axiosClient.delete(`http://localhost:5000/api/requests/${id}`);
      // Xóa xong thì lọc bỏ khỏi danh sách hiển thị
      setRequests(requests.filter(req => req._id !== id));
      alert("Đã xóa thành công");
    } catch (error) {
      alert("Lỗi xóa: " + error.message);
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      pending: '#f59e0b',   // Cam
      approved: '#3b82f6',  // Xanh dương (Đang tìm gia sư)
      matched: '#10b981',   // Xanh lá (Đã có gia sư)
      closed: '#ef4444'     // Đỏ
    };
    const labels = {
      pending: 'Chờ duyệt',
      approved: 'Đang tìm GS',
      matched: 'Đã xong',
      closed: 'Đã đóng'
    };
    return (
      <span style={{ backgroundColor: colors[status], color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
        {labels[status] || status}
      </span>
    );
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Lớp học tôi cần tìm Gia sư</h3>

      {requests.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          Bạn chưa đăng yêu cầu tìm gia sư nào. <br />
          <Link to="/post-request" style={{ color: 'blue' }}>Đăng ngay</Link>
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f3f4f6', color: '#6b7280' }}>
              <th style={{ padding: '10px' }}>Môn học</th>
              <th style={{ padding: '10px' }}>Yêu cầu</th>
              <th style={{ padding: '10px' }}>Ngân sách</th>
              <th style={{ padding: '10px' }}>Trạng thái</th>
              <th style={{ padding: '10px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px' }}>
                  <strong>{req.subject}</strong><br />
                  <small>{req.grade}</small>
                </td>
                <td style={{ padding: '10px', maxWidth: '200px' }} className="truncate">
                  {req.sessionsPerWeek} buổi/tuần <br />
                  <small style={{ color: '#888' }}>{req.address}</small>
                </td>
                <td style={{ padding: '10px', color: '#059669', fontWeight: 'bold' }}>
                  {req.budget.toLocaleString()}đ
                </td>
                <td style={{ padding: '10px' }}>
                  {getStatusBadge(req.status)}
                </td>
                <td style={{ padding: '10px' }}>
                  <Link to={`/class/${req._id}`} style={{ marginRight: '10px', color: '#2563eb', textDecoration: 'none' }}>Xem</Link>
                  {req.status === 'pending' && (
                    <button onClick={() => handleDelete(req._id)} style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer' }}>
                      Hủy
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRequestsTab;