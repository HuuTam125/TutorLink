import { motion } from 'framer-motion';
import {
  FaUser, FaChalkboardTeacher, FaWallet, FaHistory,
  FaEnvelopeOpenText, FaClipboardList, FaPlusCircle,
  FaLock, FaSignOutAlt, FaCamera, FaChevronRight
} from 'react-icons/fa';

const UserSidebar = ({ activeTab, setActiveTab, user }) => {
  const isActive = (tab) => activeTab === tab;

  // Item Component với Magic Motion Background
  const MenuItem = ({ id, icon: Icon, label, isDanger = false, count = 0 }) => {
    const active = isActive(id);

    return (
      <div
        onClick={() => setActiveTab(id)}
        className={`group relative flex items-center justify-between px-4 py-3.5 mb-2 rounded-2xl cursor-pointer transition-colors duration-200
          ${isDanger
            ? 'mt-6 text-red-500 hover:bg-red-50'
            : active ? 'text-white' : 'text-gray-500 hover:text-[#193366] hover:bg-white'
          }
        `}
      >
        {/* --- MAGIC MOTION BACKGROUND --- */}
        {/* Nền Navy Blue khi Active */}
        {active && !isDanger && (
          <motion.div
            layoutId="activeTabBackground"
            className="absolute inset-0 bg-[#193366] rounded-2xl shadow-lg shadow-[#193366]/20"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className={`p-2 rounded-lg transition-colors 
            ${active
              ? 'bg-white/10 text-white'
              : isDanger
                ? 'bg-red-50 group-hover:bg-red-100'
                : 'bg-[#f9f9f6] group-hover:bg-[#193366]/5 group-hover:text-[#193366]'
            }`}>
            <Icon size={16} />
          </div>
          <span className="font-bold text-[14px] tracking-wide">{label}</span>
        </div>

        {/* Badge hoặc Arrow */}
        <div className="relative z-10">
          {count > 0 ? (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {count}
            </span>
          ) : (
            !isDanger && active && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <FaChevronRight size={12} className="text-white/70" />
              </motion.div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full lg:w-[300px] flex-shrink-0 sticky top-24 font-sans">

      {/* 1. Profile Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // Card trắng, viền Navy nhạt, Shadow Navy
        className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_-10px_rgba(25,51,102,0.1)] border border-[#193366]/5 relative overflow-hidden mb-6 group"
      >
        {/* Decor Blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#193366]/5 rounded-full blur-3xl group-hover:bg-[#193366]/10 transition-colors"></div>

        <div className="flex flex-col items-center relative z-10">
          <div className="relative cursor-pointer">
            <motion.div whileHover={{ scale: 1.05 }} className="w-24 h-24 rounded-full p-1.5 bg-gradient-to-tr from-[#193366] to-blue-500 shadow-lg shadow-[#193366]/20">
              <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden">
                <img src={user?.avatar || "https://via.placeholder.com/150"} alt="User" className="w-full h-full object-cover rounded-full" />
              </div>
            </motion.div>
            <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-slate-50 transition-colors border border-gray-100">
              <FaCamera className="text-[#193366] text-sm" />
            </div>
          </div>
          <h3 className="mt-4 font-bold text-[#193366] text-lg">{user?.fullname || "Người dùng"}</h3>
          <p className="text-gray-400 text-sm font-bold bg-[#f9f9f6] px-3 py-1 rounded-full mt-1 border border-gray-100">
            {user?.role === 'tutor' ? 'Gia sư chuyên nghiệp' : 'Học viên'}
          </p>
        </div>
      </motion.div>

      {/* 2. Menu Items */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-transparent rounded-3xl"
      >
        <MenuItem id="info" icon={FaUser} label="Thông tin cá nhân" />

        {user?.role === 'tutor' && (
          <>
            <div className="px-4 py-2 mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Quản lý dạy</div>
            <MenuItem id="tutor-profile" icon={FaChalkboardTeacher} label="Hồ sơ gia sư" />
            <MenuItem id="wallet" icon={FaWallet} label="Ví tài khoản" />
            <MenuItem id="my-applications" icon={FaHistory} label="Lịch sử ứng tuyển" />
            <MenuItem id="my-invitations" icon={FaEnvelopeOpenText} label="Lời mời dạy" count={2} />
          </>
        )}

        {(user?.role === 'student' || !user?.role) && (
          <>
            <div className="px-4 py-2 mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Quản lý lớp</div>
            <MenuItem id="my-requests" icon={FaClipboardList} label="Lớp đã đăng" />
            <MenuItem id="post-request" icon={FaPlusCircle} label="Đăng lớp mới" />
          </>
        )}

        <div className="my-4 border-t border-[#193366]/5 mx-4"></div>
        <MenuItem id="password" icon={FaLock} label="Đổi mật khẩu" />

        <div onClick={() => { if (window.confirm('Đăng xuất?')) { localStorage.removeItem('user'); window.location.href = '/login'; } }}
          className="group flex items-center gap-3.5 px-4 py-3.5 mt-2 rounded-2xl cursor-pointer hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all"
        >
          <div className="p-2 rounded-lg bg-[#f9f9f6] group-hover:bg-red-100 transition-colors">
            <FaSignOutAlt size={16} />
          </div>
          <span className="font-bold text-[14px]">Đăng xuất</span>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSidebar;