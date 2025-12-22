import {
  FiHome, FiUserCheck, FiUser, FiBriefcase, FiLayers,
  FiBookOpen, FiLogOut, FiCheckCircle, FiAlertTriangle, FiDollarSign, FiCpu,
  FiMenu, FiMessageSquare
} from 'react-icons/fi';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

const THEMES = {
  dark: {
    bg: "bg-[#0f172a]",
    text: "text-slate-400",
    textActive: "text-white",
    border: "border-slate-800",
    hover: "hover:bg-slate-800/50 hover:text-white border-transparent",
    activeItem: "bg-blue-600 text-white shadow-lg shadow-blue-900/20 border-transparent",
    iconActive: "text-white",
    badge: "bg-blue-500/20 text-blue-400",
    badgeRed: "bg-red-500/20 text-red-400",
    logoBg: "bg-gradient-to-tr from-blue-600 to-indigo-600",
    toggleBtn: "bg-blue-600 text-white border-[#0f172a] hover:bg-blue-500",
    scrollbar: "scrollbar-dark",
  },
};

const currentTheme = THEMES.dark;

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const theme = currentTheme;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuGroups = [
    {
      groupLabel: 'Tổng quan',
      items: [{ id: 'dashboard', label: 'Dashboard', icon: <FiHome /> }]
    },
    {
      groupLabel: 'Kiểm duyệt',
      items: [
        { id: 'pending', label: 'Duyệt Gia sư', icon: <FiUserCheck />, badge: 3 },
        { id: 'pending_requests', label: 'Duyệt Lớp mới', icon: <FiLayers />, badge: 12 },
      ]
    },
    {
      groupLabel: 'Quản lý',
      items: [
        { id: 'tutors', label: 'DS Gia sư', icon: <FiBriefcase /> },
        { id: 'parents', label: 'Phụ huynh / HS', icon: <FiUser /> },
        { id: 'requests', label: 'Tất cả lớp học', icon: <FiBookOpen /> },
        { id: 'matched', label: 'Lớp đã kết nối', icon: <FiCheckCircle /> },
        { id: 'messages', label: 'Tin nhắn Hỗ trợ', icon: <FiMessageSquare /> },
      ]
    },
    {
      groupLabel: 'Tài chính',
      items: [
        { id: 'transactions', label: 'Doanh thu & Ví', icon: <FiDollarSign /> },
        { id: 'reports', label: 'Khiếu nại', icon: <FiAlertTriangle />, badge: 1, badgeColor: 'red' },
      ]
    }
  ];

  // Config animation cho sidebar
  const sidebarVariants = {
    expanded: { width: "18rem" }, // w-72 equivalent
    collapsed: { width: "5rem" }  // w-20 equivalent
  };

  return (
    <motion.aside
      initial={false}
      animate={expanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 28,
        mass: 1.2
      }}
      className={`h-screen flex flex-col shadow-xl relative z-50 font-sans border-r 
        ${theme.bg} ${theme.border}
      `}
    >

      {/* --- TOGGLE BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setExpanded(!expanded)}
        className={`absolute -right-3 top-9 w-6 h-6 rounded-full flex items-center justify-center shadow-md border z-50 focus:outline-none
          ${theme.toggleBtn}
        `}
      >
        <FiMenu size={14} />
      </motion.button>

      {/* --- HEADER --- */}
      <div className={`h-20 flex items-center border-b ${theme.border} flex-shrink-0`}>
        {/* Dùng motion.div layout để căn giữa tự động mượt mà */}
        <motion.div
          layout
          className={`flex items-center gap-3 w-full ${expanded ? 'px-6' : 'justify-center'}`}
        >
          <div className={`min-w-[40px] h-10 rounded-xl flex items-center justify-center shadow-sm ${theme.logoBg}`}>
            <FiCpu size={20} className="text-white animate-spin-slow" />
          </div>

          <AnimatePresence mode='wait'>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className={`text-lg font-bold ${theme === THEMES.light ? 'text-slate-800' : 'text-white'}`}>ADMIN CP</h1>
                <p className="text-[10px] text-blue-500 font-medium">System Manager</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- MENU --- */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-6 ${theme.scrollbar}`}>
        {menuGroups.map((group, index) => (
          <div key={index}>
            <AnimatePresence>
              {expanded && (
                <motion.h3
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 select-none whitespace-nowrap overflow-hidden"
                >
                  {group.groupLabel}
                </motion.h3>
              )}
            </AnimatePresence>

            {/* Đường kẻ phân cách khi thu nhỏ */}
            {!expanded && index !== 0 && <div className={`mx-auto w-8 border-t my-4 ${theme.border}`} />}

            <div className="px-3 space-y-1">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    layout // Giúp button co giãn mượt mà
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className={`group relative flex items-center w-full p-3 rounded-xl border focus:outline-none
                      ${expanded ? 'justify-start gap-3' : 'justify-center'}
                      ${isActive
                        ? theme.activeItem
                        : `${theme.text} ${theme.hover}`
                      }`}
                  >
                    {/* ICON */}
                    <span className={`text-xl z-10 ${isActive ? theme.iconActive : ''}`}>
                      {item.icon}
                    </span>

                    {/* LABEL */}
                    <AnimatePresence mode='popLayout'>
                      {expanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="text-sm font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* BADGE */}
                    {item.badge && (
                      <div className="ml-auto z-10">
                        {expanded ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm whitespace-nowrap
                            ${item.badgeColor === 'red' ? theme.badgeRed : theme.badge}`}
                          >
                            {item.badge}
                          </motion.span>
                        ) : (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 
                             ${theme === THEMES.light ? 'border-white' : 'border-[#0f172a]'}
                             ${item.badgeColor === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}
                          />
                        )}
                      </div>
                    )}

                    {/* TOOLTIP (Khi thu nhỏ) */}
                    {!expanded && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max bg-slate-800 text-white text-xs font-medium px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                        {item.label}
                        <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-1 border-4 border-transparent border-r-slate-800"></div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* --- FOOTER --- */}
      <div className={`p-3 border-t ${theme.border} ${theme.bg}`}>
        <motion.button
          layout
          onClick={handleLogout}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center w-full p-2 rounded-xl border group focus:outline-none
            ${theme === THEMES.light ? 'border-slate-200' : 'border-slate-700'}
            ${expanded ? 'justify-start gap-3 px-3' : 'justify-center'}
          `}
        >
          <FiLogOut className={`min-w-[20px] ${theme.text} group-hover:text-red-500 transition-colors`} />

          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className={`text-sm font-medium whitespace-nowrap overflow-hidden ${theme.text} group-hover:text-red-500`}
              >
                Đăng xuất
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;