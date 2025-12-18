import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import UserSidebar from '../../components/user/profile/UserSidebar';
import UserInfoTab from '../../components/user/profile/UserInfoTab';
import TutorProfileTab from '../../components/user/profile/TutorProfileTab';
import MyRequestsTab from '../../components/user/profile/MyRequestsTab';
import MyApplicationsTab from '../../components/user/profile/MyApplicationsTab';
import WalletTab from '../../components/user/profile/WalletTab';

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  // Bảo vệ route
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Layout styles
  const layoutStyle = { display: 'flex', minHeight: '80vh', maxWidth: '1200px', margin: '30px auto', gap: '30px', padding: '0 20px' };
  const contentStyle = { flex: 1 };

  return (
    <div style={layoutStyle}>
      {/* 1. Sidebar */}
      <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      <div style={contentStyle}>
        {/* Tab 1: Thông tin chung */}
        {activeTab === 'info' && <UserInfoTab user={user} />}

        {/* Tab 2: Hồ sơ Gia sư (Chỉ Tutor) */}
        {activeTab === 'tutor-profile' && user?.role === 'tutor' && (
          <TutorProfileTab />
        )}

        {/* Tab 3: Lớp đã đăng (Chỉ Student) - MỚI */}
        {activeTab === 'my-requests' && (
          <MyRequestsTab />
        )}

        {/* Tab 4: Lịch sử ứng tuyển (Chỉ Tutor) - ĐÃ CẬP NHẬT */}
        {activeTab === 'my-applications' && user?.role === 'tutor' && (
          <MyApplicationsTab />
        )}

        {/* Tab 5: Đổi mật khẩu */}
        {activeTab === 'password' && (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>Đổi mật khẩu</h3>
            <p>Form đổi mật khẩu sẽ đặt ở đây...</p>
          </div>
        )}

        {activeTab === 'wallet' && user?.role === 'tutor' && (
          <WalletTab />
        )}
      </div>
    </div>
  );
};
export default UserProfilePage;