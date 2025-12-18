// src/components/user/UserSidebar.js

const UserSidebar = ({ activeTab, setActiveTab, user }) => {
  const menuStyle = (tabName) => ({
    padding: '12px 15px',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '5px',
    backgroundColor: activeTab === tabName ? '#e0f2fe' : 'transparent',
    color: activeTab === tabName ? '#0284c7' : '#334155',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    display: 'block',
    textDecoration: 'none'
  });

  return (
    <div style={{ width: '250px', flexShrink: 0 }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

        {/* Avatar & Name */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ccc', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', color: 'white' }}>
            {user?.fullname?.charAt(0)}
          </div>
          <strong>{user?.fullname}</strong>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
            {user?.role === 'tutor' ? 'Gia sư' : 'Học viên'}
          </p>
        </div>

        {/* Menu Items */}
        <nav>
          <div onClick={() => setActiveTab('info')} style={menuStyle('info')}>
            Thông tin cá nhân
          </div>

          {/* Chỉ hiện cho Gia sư */}
          {user?.role === 'tutor' && (
            <>
              <div onClick={() => setActiveTab('tutor-profile')} style={menuStyle('tutor-profile')}>
                Hồ sơ dạy học
              </div>
              <div onClick={() => setActiveTab('wallet')} style={menuStyle('wallet')}>
                Ví của tôi
              </div>
              {/* (Optional) Tab xem lịch sử ứng tuyển */}
              <div onClick={() => setActiveTab('my-applications')} style={menuStyle('my-applications')}>
                Lịch sử ứng tuyển
              </div>

            </>
          )}

          {/* Chỉ hiện cho Học viên/Phụ huynh */}
          {(user?.role === 'student' || !user?.role) && (
            <div onClick={() => setActiveTab('my-requests')} style={menuStyle('my-requests')}>
              Lớp đã đăng
            </div>
          )}

          <div onClick={() => setActiveTab('password')} style={menuStyle('password')}>
            Đổi mật khẩu
          </div>

          <div onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/login';
          }} style={{ ...menuStyle('logout'), color: 'red', marginTop: '20px', borderTop: '1px solid #eee' }}>
            Đăng xuất
          </div>
        </nav>
      </div>
    </div>
  );
};

export default UserSidebar;