import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserCircle, FaCaretDown, FaSignOutAlt, FaIdCard, FaBars, FaTimes,
  FaChalkboardTeacher, FaBookOpen, FaHome, FaGraduationCap, FaPhoneAlt
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  const menuRef = useRef();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync hovered path
  useEffect(() => {
    setHoveredPath(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    setShowDropdown(false);
    setShowMobileMenu(false);
    logout();
    navigate('/login');
  };

  const NAV_LINKS = [
    { name: 'Trang chủ', path: '/', icon: <FaHome /> },
    { name: 'Tìm gia sư', path: '/tutors', icon: <FaChalkboardTeacher /> },
    { name: 'Lớp mới', path: '/classes', icon: <FaBookOpen /> },
    { name: 'Liên hệ', path: '/contact', icon: <FaPhoneAlt /> }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      // Khi scroll: Nền trắng mờ, Border Navy nhạt
      className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
        ? 'bg-white/90 backdrop-blur-lg border-[#193366]/10 shadow-sm py-3'
        : 'bg-[#f9f9f6]/80 backdrop-blur-sm border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* 1. LOGO (Navy Theme) */}
        <Link to="/" className="flex items-center gap-2 group relative z-20">
          <div className="w-10 h-10 bg-[#193366] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-[#193366]/20 group-hover:rotate-12 transition-transform duration-300">
            <FaGraduationCap />
          </div>
          <span className="text-2xl font-extrabold text-[#193366] tracking-tight">
            Tutor<span className="text-[#193366]/70">Link</span>
          </span>
        </Link>

        {/* 2. DESKTOP MENU (Magic Motion) */}
        <div className="hidden md:flex items-center gap-2 bg-white/50 p-1 rounded-full border border-[#193366]/5 backdrop-blur-md" onMouseLeave={() => setHoveredPath(location.pathname)}>
          {NAV_LINKS.map((link) => {
            const isActive = hoveredPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                className={`relative px-5 py-2 rounded-full text-sm font-bold transition-colors duration-200 z-10 flex items-center gap-2
                  ${isActive ? 'text-[#193366]' : 'text-gray-500 hover:text-[#193366]'}
                `}
              >
                {/* Background Sliding Effect */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-[#193366]/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {link.icon} {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* 3. USER ACTIONS */}
        <div className="hidden md:flex items-center gap-4" ref={menuRef}>
          {user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-[#193366]/10 hover:border-[#193366]/30 hover:shadow-md transition-all bg-white group"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full object-cover ring-2 ring-white" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#193366]/5 flex items-center justify-center text-[#193366]/50 group-hover:bg-[#193366]/10 group-hover:text-[#193366] transition-colors">
                    <FaUserCircle size={20} />
                  </div>
                )}
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold text-[#193366] leading-tight max-w-[100px] truncate">{user.fullName}</span>
                  <span className="text-[10px] text-gray-400 font-medium leading-tight">Member</span>
                </div>
                <FaCaretDown className={`text-gray-400 text-xs transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-4 w-60 bg-white rounded-2xl shadow-xl shadow-[#193366]/10 border border-[#193366]/10 overflow-hidden origin-top-right z-50"
                  >
                    <div className="px-5 py-4 border-b border-gray-50 bg-[#f9f9f6]">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Đang đăng nhập</p>
                      <p className="text-sm font-bold text-[#193366] truncate">{user.email}</p>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-[#193366]/5 hover:text-[#193366] transition-colors"
                      >
                        <FaIdCard className="text-[#193366]/60" /> Hồ sơ cá nhân
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <FaSignOutAlt className="text-red-400" /> Đăng xuất
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-600 hover:text-[#193366] font-bold text-sm px-4 py-2 transition-colors">
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-[#193366] hover:bg-[#193366]/90 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-[#193366]/20 hover:shadow-[#193366]/30 transition-all transform hover:-translate-y-0.5"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>

        {/* 4. MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-[#193366] text-2xl p-2 rounded-xl hover:bg-[#193366]/5 transition-colors z-20"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 5. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-[70px] bg-white z-10 overflow-hidden flex flex-col"
          >
            <div className="flex flex-col p-6 space-y-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-bold transition-colors ${location.pathname === link.path
                      ? 'bg-[#193366]/5 text-[#193366]'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <span className="text-xl">{link.icon}</span> {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="border-t border-gray-100 my-4"></div>

              {user ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-4 px-4 mb-4">
                    {user.avatar ? (
                      <img src={user.avatar} alt="User" className="w-12 h-12 rounded-full" />
                    ) : (
                      <div className="w-12 h-12 bg-[#193366]/5 rounded-full flex items-center justify-center text-[#193366]/50">
                        <FaUserCircle size={24} />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-[#193366] text-lg">{user.fullName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <Link to="/profile" onClick={() => setShowMobileMenu(false)} className="block w-full py-3 px-4 bg-[#f9f9f6] rounded-xl text-center font-bold text-[#193366] mb-2">
                    Quản lý hồ sơ
                  </Link>
                  <button onClick={handleLogout} className="block w-full py-3 px-4 border border-red-100 text-red-600 rounded-xl text-center font-bold hover:bg-red-50">
                    Đăng xuất
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-3 mt-4"
                >
                  <Link to="/login" onClick={() => setShowMobileMenu(false)} className="w-full py-3.5 text-center border-2 border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50">
                    Đăng nhập
                  </Link>
                  <Link to="/register" onClick={() => setShowMobileMenu(false)} className="w-full py-3.5 text-center bg-[#193366] text-white rounded-2xl font-bold shadow-lg shadow-[#193366]/30">
                    Đăng ký ngay
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;