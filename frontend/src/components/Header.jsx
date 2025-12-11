import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // CSS inline đơn giản để chia bố cục
  const navStyle = { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#eee' };
  const linkStyle = { margin: '0 10px', textDecoration: 'none', color: 'black' };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ fontWeight: 'bold', ...linkStyle }}>GIA SU VN</Link>
      </div>
      <div>
        <Link to="/" style={linkStyle}>Trang chủ</Link>

        {user ? (
          <>
            <span style={{ marginRight: '15px', fontWeight: 'bold' }}>Chào, {user.fullName}</span>
            {/* Logic hiển thị nút theo Role */}
            {user.role === 'tutor' && (
              <Link to="/tutor-profile" style={{ ...linkStyle, color: 'blue' }}>Hồ sơ dạy học</Link>
            )}
            {user.role === 'student' && (
              <>
                <Link to="/post-request" style={{ ...linkStyle, color: 'green' }}>Đăng tìm gia sư</Link>
                {/* Thêm dòng dưới đây */}
                <Link to="/my-requests" style={{ ...linkStyle, color: '#d63384' }}>Lớp đã đăng</Link>
              </>
            )}

            <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer' }}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Đăng nhập</Link>
            <Link to="/register" style={linkStyle}>Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;