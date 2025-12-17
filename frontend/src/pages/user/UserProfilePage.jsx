import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import UserSidebar from '../../components/user/UserSidebar';
import UserInfoTab from '../../components/user/UserInfoTab';
import TutorProfileTab from '../../components/user/TutorProfileTab';

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

      {/* 2. Content Area */}
      <div style={contentStyle}>
        {activeTab === 'info' && <UserInfoTab user={user} />}

        {activeTab === 'tutor-profile' && user?.role === 'tutor' && (
          <TutorProfileTab />
        )}

        {activeTab === 'schedule' && (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
            <h3>Chức năng Lịch dạy đang được xây dựng...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;