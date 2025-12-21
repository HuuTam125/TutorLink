import { useState, useEffect } from 'react';
import axiosClient from '../../../api/axiosClient';

const InviteModal = ({ tutor, onClose }) => {
  const [myClasses, setMyClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy danh sách lớp của phụ huynh khi mở modal
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Tái sử dụng API lấy lớp của tôi
        const res = await axiosClient.get('/requests/my-requests');
        // Chỉ lấy lớp đang hoạt động (approved) để mời
        const activeClasses = res.data.filter(c => c.status === 'approved');
        setMyClasses(activeClasses);
        if (activeClasses.length > 0) setSelectedClass(activeClasses[0]._id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClasses();
  }, []);

  const handleInvite = async () => {
    if (!selectedClass) return alert("Bạn chưa có lớp nào đang tìm gia sư!");

    setLoading(true);
    try {
      await axiosClient.post('/invitations', {
        tutorId: tutor.user._id,
        classRequestId: selectedClass
      });
      alert("Đã gửi lời mời thành công!");
      onClose();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
        <h3>Mời gia sư: {tutor.hoTen}</h3>

        {myClasses.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p style={{ color: 'red' }}>Bạn chưa có lớp học nào đang hoạt động.</p>
            <a href="/post-request" style={{ color: 'blue' }}>Đăng lớp mới ngay</a>
          </div>
        ) : (
          <div style={{ margin: '15px 0' }}>
            <label>Chọn lớp muốn mời:</label>
            <select
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {myClasses.map(cls => (
                <option key={cls._id} value={cls._id}>
                  {cls.subject} - {cls.grade} ({cls.budget.toLocaleString()}đ)
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>Hủy</button>
          {myClasses.length > 0 && (
            <button
              onClick={handleInvite}
              disabled={loading}
              style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {loading ? 'Đang gửi...' : 'Gửi lời mời'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteModal;