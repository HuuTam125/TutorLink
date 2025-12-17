import { FiHome, FiUserCheck, FiUser, FiBriefcase, FiLayers, FiBookOpen, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: <FiHome /> },
    { id: 'pending', label: 'Duyệt Gia sư', icon: <FiUserCheck /> },
    { id: 'pending_requests', label: 'Duyệt Lớp mới', icon: <FiLayers /> },
    { id: 'tutors', label: 'Danh sách Gia sư', icon: <FiBriefcase /> },
    { id: 'parents', label: 'Phụ huynh / HS', icon: <FiUser /> },
    { id: 'requests', label: 'Lớp học', icon: <FiBookOpen /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col min-h-screen shadow-xl transition-all duration-300">
      <div className="p-6 border-b border-slate-700 flex items-center justify-center">
        <h1 className="text-2xl font-bold tracking-wider text-blue-400">ADMIN</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
              ${activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 translate-x-1'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="cursor-pointer w-full flex items-center gap-2 justify-center px-4 py-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
        >
          <FiLogOut /> Thoát
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;