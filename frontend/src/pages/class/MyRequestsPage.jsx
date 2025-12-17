import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh sách của chính mình
  const fetchMyRequests = async () => {
    try {
      const res = await axiosClient.get('/requests/my-requests');
      setRequests(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // Hàm xử lý xóa
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này không?')) {
      try {
        await axiosClient.delete(`/requests/${id}`);
        toast.success('Đã xóa thành công');
        // Load lại danh sách sau khi xóa
        fetchMyRequests();
      } catch (error) {
        toast.error('Xóa thất bại');
        console.error(error);
      }
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Đang tải...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <h2>📋 Danh sách lớp tôi đang tìm</h2>
      <Link to="/post-request" style={{ color: 'green', fontWeight: 'bold' }}>+ Đăng bài ngay</Link>

      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Bạn chưa đăng bài tìm gia sư nào.</p>
        </div>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px', backgroundColor: '#fff', position: 'relative' }}>
            {/* Nút xóa ở góc phải */}
            <button
              onClick={() => handleDelete(req._id)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Xóa bài
            </button>

            <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{req.subject} - {req.grade}</h3>
            <p><strong>Trạng thái:</strong> {req.status === 'pending' ? 'Đang chờ duyệt' : req.status === 'approved' ? 'Đã duyệt' : req.status}</p>
            <p><strong>Yêu cầu:</strong> {req.description}</p>
            <p><strong>Ngân sách:</strong> {req.budget.toLocaleString()} đ/buổi</p>
            <p style={{ fontSize: '0.9em', color: '#888' }}>Ngày đăng: {new Date(req.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequestsPage;