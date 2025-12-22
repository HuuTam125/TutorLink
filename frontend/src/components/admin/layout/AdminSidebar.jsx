import {
  FiHome, FiUserCheck, FiUser, FiBriefcase, FiLayers,
  FiBookOpen, FiLogOut, FiCheckCircle, FiAlertTriangle, FiDollarSign, FiCpu,
  FiMenu, FiMessageSquare
} from 'react-icons/fi';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

// --- CẤU HÌNH THEME (Đã sửa lỗi viền đen & thanh cuộn) ---
const THEMES = {
  light: {
    bg: "bg-white",
    text: "text-slate-500",
    textActive: "text-blue-700",
    border: "border-slate-200",
    // Thêm border-transparent để tránh nhảy layout, thêm focus:outline-none để bỏ viền đen
    hover: "hover:bg-slate-50 hover:text-slate-900 border-transparent",
    activeItem: "bg-blue-50 text-blue-700 font-semibold shadow-sm border-blue-100", // border màu xanh nhạt
    iconActive: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    badgeRed: "bg-red-100 text-red-600",
    logoBg: "bg-blue-600",
    toggleBtn: "bg-white text-slate-500 border-slate-200 hover:text-blue-600 hover:bg-slate-50",
    scrollbar: "scrollbar-light", // Dùng class CSS scrollbar sáng
  },

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
    scrollbar: "scrollbar-dark", // Dùng class CSS scrollbar tối
  },
};

// 👉 Chọn Theme tại đây
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

  return (
    <aside className={`h-screen flex flex-col shadow-xl transition-all duration-300 ease-in-out relative z-50 font-sans
      ${theme.bg} ${theme.border} border-r
      ${expanded ? 'w-72' : 'w-20'} 
    `}>

      {/* --- TOGGLE BUTTON --- */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`absolute -right-3 top-9 w-6 h-6 rounded-full flex items-center justify-center shadow-md border z-50 transition-all focus:outline-none focus:ring-0
          ${theme.toggleBtn}
        `}
      >
        {expanded ? <FiMenu size={14} /> : <FiMenu size={14} />}
      </button>

      {/* --- HEADER --- */}
      <div className={`h-20 flex items-center ${expanded ? 'px-6' : 'justify-center'} border-b ${theme.border} transition-all`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`min-w-[40px] h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${theme.logoBg}`}>
            <FiCpu size={20} className="text-white animate-spin-slow" />
          </div>

          <div className={`transition-all duration-300 ${expanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
            <h1 className={`text-lg font-bold whitespace-nowrap ${theme === THEMES.light ? 'text-slate-800' : 'text-white'}`}>ADMIN CP</h1>
            <p className="text-[10px] text-blue-500 font-medium whitespace-nowrap">System Manager</p>
          </div>
        </div>
      </div>

      {/* --- MENU (Áp dụng class theme.scrollbar) --- */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-6 ${theme.scrollbar}`}>
        {menuGroups.map((group, index) => (
          <div key={index}>
            {expanded && (
              <h3 className="px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-opacity duration-300 select-none">
                {group.groupLabel}
              </h3>
            )}
            {!expanded && index !== 0 && <div className={`mx-auto w-8 border-t my-4 ${theme.border}`} />}

            <div className="px-3 space-y-1">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    // Thêm focus:outline-none và border để fix lỗi
                    className={`group relative flex items-center w-full p-3 rounded-xl transition-all duration-200 border focus:outline-none focus:ring-0
                      ${expanded ? 'justify-start gap-3' : 'justify-center'}
                      ${isActive
                        ? theme.activeItem
                        : `${theme.text} ${theme.hover}`
                      }`}
                  >
                    {/* ICON */}
                    <span className={`text-xl transition-transform duration-300 
                      ${isActive ? theme.iconActive : ''} 
                      ${!isActive ? 'group-hover:scale-110' : ''}`}
                    >
                      {item.icon}
                    </span>

                    {/* LABEL */}
                    <span className={`text-sm font-medium whitespace-nowrap transition-all duration-200 
                      ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 w-0 overflow-hidden translate-x-4 absolute'}`}>
                      {item.label}
                    </span>

                    {/* BADGE */}
                    {item.badge && (
                      expanded ? (
                        <span className={`ml-auto px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm whitespace-nowrap
                          ${item.badgeColor === 'red' ? theme.badgeRed : theme.badge}`}>
                          {item.badge}
                        </span>
                      ) : (
                        <span className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 
                           ${theme === THEMES.light ? 'border-white' : 'border-[#0f172a]'}
                           ${item.badgeColor === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}
                        />
                      )
                    )}

                    {/* TOOLTIP */}
                    {!expanded && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max bg-slate-800 text-white text-xs font-medium px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                        {item.label}
                        <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-1 border-4 border-transparent border-r-slate-800"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* --- FOOTER --- */}
      <div className={`p-3 border-t ${theme.border} ${theme.bg}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-2 rounded-xl border transition-all group focus:outline-none
            ${theme === THEMES.light ? 'border-slate-200 hover:bg-red-50' : 'border-slate-700 hover:bg-red-500/10'}
            ${expanded ? 'justify-start gap-3 px-3' : 'justify-center'}
          `}
        >
          <FiLogOut className={`min-w-[20px] ${theme.text} group-hover:text-red-500`} />
          {expanded && (
            <span className={`text-sm font-medium whitespace-nowrap ${theme.text} group-hover:text-red-500`}>
              Đăng xuất
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;