import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import {
  FaUserCircle, FaCaretDown, FaSignOutAlt, FaIdCard, FaBars, FaTimes,
  FaChalkboardTeacher, FaBookOpen, FaHome
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Để active link

  // State
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ref
  const menuRef = useRef();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    navigate('/login');
  };

  // Helper để kiểm tra link đang active
  const isActive = (path) => location.pathname === path ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600 font-medium";

  // --- MENU ITEMS DATA ---
  const NAV_LINKS = [
    { name: 'Trang chủ', path: '/', icon: <FaHome className="mb-0.5" /> },
    { name: 'Tìm gia sư', path: '/tutors', icon: <FaChalkboardTeacher className="mb-0.5" /> },
    { name: 'Lớp mới', path: '/classes', icon: <FaBookOpen className="mb-0.5" /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white border-b border-gray-100 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* 1. LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
            T
          </div>
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Tutor<span className="text-blue-600">Link</span>
          </span>
        </Link>

        {/* 2. DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-sm transition-colors ${isActive(link.path)}`}
            >
              {/* {link.icon} Chỉ hiện icon nếu muốn */}
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. USER ACTIONS (Login/Register or User Dropdown) */}
        <div className="hidden md:flex items-center gap-4" ref={menuRef}>
          {user ? (
            <div className="relative">
              {/* User Toggle Button */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full border border-gray-200 hover:shadow-md transition-all bg-white"
              >
                {/* Avatar hoặc Icon mặc định */}
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                )}
                <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">{user.fullName}</span>
                <FaCaretDown className={`text-gray-400 text-xs transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up origin-top-right overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-xs text-gray-500 uppercase font-bold">Tài khoản</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <FaIdCard /> Hồ sơ cá nhân
                  </Link>

                  {/* Thêm các link khác nếu cần: Lớp đã lưu, Lịch dạy... */}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                  >
                    <FaSignOutAlt /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 font-bold text-sm px-4 py-2 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-blue-600/30 transition-transform transform hover:-translate-y-0.5"
              >
                Đăng ký ngay
              </Link>
            </div>
          )}
        </div>

        {/* 4. MOBILE MENU BUTTON (Hamburger) */}
        <button
          className="md:hidden text-gray-600 text-2xl p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 5. MOBILE MENU CONTENT (Dropdown full width) */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute top-full left-0 w-full px-4 py-4 flex flex-col gap-4 animate-slide-down">
          {/* Mobile Nav Links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setShowMobileMenu(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${location.pathname === link.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {link.icon} {link.name}
            </Link>
          ))}

          <div className="border-t border-gray-100 my-1"></div>

          {/* Mobile User Actions */}
          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2">
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full" />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-300" />
                )}
                <div>
                  <p className="font-bold text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link to="/profile" onClick={() => setShowMobileMenu(false)} className="px-4 py-2 text-gray-600 hover:text-blue-600">Hồ sơ cá nhân</Link>
              <button onClick={handleLogout} className="px-4 py-2 text-red-600 text-left font-medium">Đăng xuất</button>
            </>
          ) : (
            <div className="flex flex-col gap-3 px-4 pb-2">
              <Link to="/login" onClick={() => setShowMobileMenu(false)} className="w-full py-3 text-center border border-gray-200 rounded-xl font-bold text-gray-700">Đăng nhập</Link>
              <Link to="/register" onClick={() => setShowMobileMenu(false)} className="w-full py-3 text-center bg-blue-600 text-white rounded-xl font-bold shadow-md">Đăng ký ngay</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;