import {
  FiHome, FiUserCheck, FiUser, FiBriefcase, FiLayers,
  FiBookOpen, FiLogOut, FiCheckCircle, FiAlertTriangle, FiDollarSign, FiCpu,
  FiMenu, FiMessageSquare
} from 'react-icons/fi';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CẤU HÌNH THEME: GREEN SOFT (Minimalist 2025) ---
const THEMES = {
  greenSoft: {
    // 1. Nền & Viền
    bg: "bg-white",
    border: "border-slate-200",

    // 2. Chữ (Typography)
    text: "text-slate-500 font-medium",
    textHover: "text-slate-900",
    textActive: "text-emerald-700 font-bold",

    // 3. States
    hover: "hover:bg-slate-50 hover:text-slate-900",
    activeItem: "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm",

    // Icon
    iconActive: "text-emerald-500",

    // 4. Các thành phần khác
    badge: "bg-emerald-100 text-emerald-600",
    badgeRed: "bg-rose-50 text-rose-500",
    logoBg: "bg-emerald-500",
    toggleBtn: "bg-white text-slate-400 border-slate-200 hover:text-emerald-600 hover:border-emerald-200 shadow-sm",

    // 🔥 UPDATED: Thay class cũ bằng class custom 'custom-scrollbar'
    scrollbar: "custom-scrollbar",
  },
};

const currentTheme = THEMES.greenSoft;

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

  const sidebarVariants = {
    expanded: { width: "17rem" },
    collapsed: { width: "4.5rem" }
  };

  return (
    <>
      {/* 🎨 CSS CUSTOM SCROLLBAR (Minimalist Green Soft Style) 
        Bạn có thể chuyển phần này vào file index.css global nếu muốn tái sử dụng 
      */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px; /* Độ rộng siêu mỏng */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Nền trong suốt */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent; /* Ẩn khi không hover */
          border-radius: 20px; /* Bo tròn hoàn toàn */
          transition: background-color 0.3s ease;
        }
        /* Chỉ hiện màu xám nhạt khi hover vào vùng Sidebar */
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #e2e8f0; /* slate-200 */
        }
        /* Khi đang kéo thanh scroll thì chuyển màu xanh nhẹ (theo theme) */
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background-color: #a7f3d0; /* green-200 */
        }
      `}</style>

      <motion.aside
        initial={false}
        animate={expanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
        className={`h-screen flex flex-col shadow-[2px_0_20px_-10px_rgba(0,0,0,0.05)] relative z-50 font-sans border-r 
          ${theme.bg} ${theme.border}
        `}
      >
        {/* --- TOGGLE BUTTON --- */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setExpanded(!expanded)}
          className={`absolute -right-3 top-8 w-6 h-6 rounded-full flex items-center justify-center border z-50 focus:outline-none transition-all duration-200
            ${theme.toggleBtn}
          `}
        >
          <FiMenu size={12} />
        </motion.button>

        {/* --- HEADER --- */}
        <div className={`h-20 flex items-center border-b ${theme.border} flex-shrink-0`}>
          <motion.div
            layout
            className={`flex items-center gap-3 w-full ${expanded ? 'px-6' : 'justify-center'}`}
          >
            <div className={`min-w-[36px] h-9 rounded-lg flex items-center justify-center shadow-md shadow-emerald-200/50 ${theme.logoBg}`}>
              <FiCpu size={18} className="text-white" />
            </div>

            <AnimatePresence mode='wait'>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <h1 className="text-base font-bold text-slate-900 tracking-tight">TUTOR ADMIN</h1>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Management</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- MENU (Áp dụng class custom-scrollbar) --- */}
        <nav className={`flex-1 overflow-y-auto overflow-x-hidden py-6 space-y-6 ${theme.scrollbar}`}>
          {menuGroups.map((group, index) => (
            <div key={index}>
              <AnimatePresence>
                {expanded && (
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 select-none"
                  >
                    {group.groupLabel}
                  </motion.h3>
                )}
              </AnimatePresence>

              {!expanded && index !== 0 && <div className={`mx-auto w-6 border-t mb-4 ${theme.border}`} />}

              <div className="px-3 space-y-1">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      layout
                      onClick={() => setActiveTab(item.id)}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative flex items-center w-full p-2.5 rounded-lg border transition-all duration-200
                        ${expanded ? 'justify-start gap-3' : 'justify-center'}
                        ${isActive
                          ? `${theme.activeItem}`
                          : `border-transparent ${theme.text} ${theme.hover}`
                        }`}
                    >
                      <span className={`text-lg z-10 transition-colors duration-200 
                        ${isActive ? theme.iconActive : 'text-slate-400 group-hover:text-slate-600'}`}>
                        {item.icon}
                      </span>

                      <AnimatePresence mode='popLayout'>
                        {expanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-sm whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {item.badge && (
                        <div className="ml-auto z-10">
                          {expanded ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ml-2
                                ${item.badgeColor === 'red' ? theme.badgeRed : theme.badge}`}
                            >
                              {item.badge}
                            </motion.span>
                          ) : (
                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ring-2 ring-white
                               ${item.badgeColor === 'red' ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            />
                          )}
                        </div>
                      )}

                      {!expanded && (
                        <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg pointer-events-none">
                          {item.label}
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
            whileHover={{ backgroundColor: "#fef2f2" }}
            className={`flex items-center w-full p-2.5 rounded-lg group transition-colors
              ${expanded ? 'justify-start gap-3 px-3' : 'justify-center'}
            `}
          >
            <FiLogOut className="min-w-[18px] text-slate-400 group-hover:text-rose-500 transition-colors" />
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium text-slate-500 group-hover:text-rose-600 whitespace-nowrap overflow-hidden"
                >
                  Đăng xuất
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;