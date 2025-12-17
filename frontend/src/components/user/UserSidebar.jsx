import { FaUser, FaChalkboardTeacher, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserSidebar = ({ activeTab, setActiveTab, user }) => {
  const navigate = useNavigate();

  const menuBtnStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '12px 20px', width: '100%', border: 'none', background: isActive ? '#e3f2fd' : 'white',
    color: isActive ? '#007bff' : '#333', cursor: 'pointer', textAlign: 'left', fontWeight: isActive ? 'bold' : 'normal',
    borderLeft: isActive ? '4px solid #007bff' : '4px solid transparent', transition: '0.2s', marginBottom: '5px'
  });

  return (
    <div style={{ width: '250px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: 'fit-content', padding: '10px 0' }}>
      <button style={menuBtnStyle(activeTab === 'info')} onClick={() => setActiveTab('info')}>
        <FaUser /> Thông tin cơ bản
      </button>

      {user?.role === 'tutor' && (
        <button style={menuBtnStyle(activeTab === 'tutor-profile')} onClick={() => setActiveTab('tutor-profile')}>
          <FaChalkboardTeacher /> Hồ sơ gia sư
        </button>
      )}

      <button style={menuBtnStyle(activeTab === 'schedule')} onClick={() => alert('Tính năng đang phát triển')}>
        <FaCalendarAlt /> Lịch dạy
      </button>

      {user?.role === 'student' && (
        <button style={menuBtnStyle(activeTab === 'my-classes')} onClick={() => navigate('/my-requests')}>
          <FaClipboardList /> Lớp đã đăng
        </button>
      )}
    </div>
  );
};

export default UserSidebar;