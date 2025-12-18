import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axiosClient from '../../../api/axiosClient';

const MyApplicationsTab = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Để chuyển trang nếu cần nạp tiền

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axiosClient.get('applications/my-applications');
      setApps(res.data);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thanh toán
  const handlePayFee = async (appId, budget) => {
    const fee = budget * 0.15; // Tính lại phí để hiện thông báo cho chắc

    if (!window.confirm(`Phí nhận lớp này là ${fee.toLocaleString()}đ (15% học phí).\nBạn có chắc chắn muốn thanh toán để lấy thông tin liên hệ không?`)) {
      return;
    }

    try {
      const res = await axiosClient.post('/wallet/pay-class-fee', { applicationId });

      // Nếu thành công -> Hiện thông tin ngay lập tức
      alert(`Thanh toán thành công!\n\nTHÔNG TIN PHỤ HUYNH:\n- Họ tên: ${res.data.contactInfo.hoTen}\n- SĐT: ${res.data.contactInfo.phoneNumber}\n- Email: ${res.data.contactInfo.email}\n\nHãy liên hệ ngay nhé!`);

      // Tải lại danh sách để cập nhật trạng thái 'paid'
      loadData();

    } catch (error) {
      // Xử lý lỗi thông minh
      const message = error.response?.data?.message || "Lỗi thanh toán";

      if (message.includes("Số dư không đủ")) {
        if (window.confirm(`${message}\n\nBạn có muốn đến trang Nạp tiền ngay không?`)) {
          // Chuyển hướng user sang tab Wallet (Cách này hơi thủ công vì ta đang ở trong UserProfilePage, 
          // cách tốt nhất là dùng props setActiveTab nếu component này là con trực tiếp, 
          // nhưng ở đây dùng reload hoặc alert đơn giản trước).
          // Tạm thời alert hướng dẫn:
          alert("Vui lòng chọn tab 'Ví của tôi' ở menu bên trái để nạp thêm tiền.");
        }
      } else {
        alert("Lỗi: " + message);
      }
    }
  };

  // Hàm hiện lại thông tin (nếu đã thanh toán rồi mà quên)
  // Lưu ý: Backend API 'getMyApplications' CẦN phải trả về thông tin user của classRequest nếu paymentStatus là 'paid'.
  // Nếu chưa có, ta tạm thời alert "Vui lòng kiểm tra email" hoặc chỉ hiện "Đã thanh toán".
  const showContactAgain = (app) => {
    // Đây là chỗ cần backend hỗ trợ thêm. Nếu classRequest trong app có populate user, ta hiển thị luôn.
    // Giả sử API getMyApplications của bạn ĐÃ populate 'classRequest' nhưng CHƯA populate 'classRequest.user'.
    // Tạm thời thông báo đơn giản:
    alert("Bạn đã thanh toán lớp này. Vui lòng kiểm tra Email hoặc liên hệ Admin nếu quên số điện thoại.");
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', color: '#2563eb' }}>Lịch sử Ứng tuyển Gia sư</h3>

      {apps.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>Bạn chưa ứng tuyển lớp nào.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f3f4f6', color: '#6b7280' }}>
              <th style={{ padding: '10px' }}>Lớp học</th>
              <th style={{ padding: '10px' }}>Trạng thái</th>
              <th style={{ padding: '10px' }}>Thanh toán</th>
              <th style={{ padding: '10px' }}>Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px' }}>
                  <Link to={`/class/${app.classRequest?._id}`} style={{ fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>
                    {app.classRequest?.subject}
                  </Link>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    HP: {app.classRequest?.budget?.toLocaleString()}đ
                  </div>
                </td>

                <td style={{ padding: '10px' }}>
                  {app.status === 'approved' ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Được duyệt</span>
                  ) : app.status === 'rejected' ? (
                    <span style={{ color: 'red' }}>Từ chối</span>
                  ) : (
                    <span style={{ color: '#d97706' }}>Chờ duyệt</span>
                  )}
                </td>

                <td style={{ padding: '10px' }}>
                  {/* CHỈ HIỆN NÚT THANH TOÁN KHI: Status Approved VÀ Chưa đóng tiền */}
                  {app.status === 'approved' && app.paymentStatus === 'unpaid' && (
                    <button
                      onClick={() => handlePayFee(app._id, app.classRequest?.budget)}
                      style={{ padding: '6px 12px', background: '#e11d48', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Đóng phí nhận lớp
                    </button>
                  )}

                  {/* Đã đóng tiền */}
                  {app.paymentStatus === 'paid' && (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Đã thanh toán</span>
                  )}

                  {/* Bị từ chối hoặc đang chờ -> Không cần đóng tiền */}
                  {app.status !== 'approved' && <span style={{ color: '#ccc' }}>---</span>}
                </td>

                <td style={{ padding: '10px' }}>
                  {app.paymentStatus === 'paid' ? (
                    <button
                      onClick={() => showContactAgain(app)}
                      style={{ padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Xem Liên Hệ
                    </button>
                  ) : (
                    <small style={{ color: '#999' }}>Chưa có thông tin</small>
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

export default MyApplicationsTab;