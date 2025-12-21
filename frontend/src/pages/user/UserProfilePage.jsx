import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaKey, FaShieldAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
// Import Components
import UserSidebar from '../../components/user/profile/UserSidebar/UserSidebar';
import UserInfoTab from '../../components/user/profile/UserInfoTab/UserInfoTab';
import TutorProfileTab from '../../components/user/profile/TutorProfileTab/TutorProfileTab';
import MyRequestsTab from '../../components/user/profile/MyRequestsTab/MyRequestsTab';
import MyApplicationsTab from '../../components/user/profile/MyApplicationsTab/MyApplicationsTab';
import WalletTab from '../../components/user/profile/WalletTab/WalletTab';
import PostRequestTab from '../../components/user/profile/PostRequestTab/PostRequestTab';
import MyInvitationsTab from '../../components/user/profile/MyInvitationsTab/MyInvitationsTab';
const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  // Title Mapping để hiển thị tiêu đề đẹp hơn
  const getTabTitle = () => {
    const titles = {
      'info': 'Thông tin cá nhân',
      'tutor-profile': 'Hồ sơ năng lực',
      'wallet': 'Ví của tôi',
      'my-applications': 'Lịch sử ứng tuyển',
      'my-invitations': 'Lời mời nhận lớp',
      'my-requests': 'Danh sách lớp cần gia sư',
      'post-request': 'Tìm gia sư mới',
      'password': 'Bảo mật tài khoản'
    };
    return titles[activeTab] || 'Tổng quan';
  };
  // --- ANIMATION VARIANTS ---
  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    // BG: Slate-50 rất sáng, sạch sẽ cho năm 2025
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        {/* --- LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* SIDEBAR */}
          <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 w-full flex flex-col gap-6">

            {/* 1. WELCOME HEADER (Dashboard style) */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                  {getTabTitle()}
                </h1>
                <p className="text-slate-500 mt-1 text-sm font-medium">
                  Quản lý thông tin và hoạt động của bạn tại đây.
                </p>
              </div>

              {/* Breadcrumb nhỏ hoặc Status */}
              <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                <span>Profile</span>
                <span>/</span>
                <span className="text-blue-600">{user?.role === 'tutor' ? 'Gia sư' : 'Học viên'}</span>
              </div>
            </div>

            {/* 2. WHITE CARD CONTENT */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10 min-h-[600px] relative transition-all duration-500 ease-in-out">
              {/* --- CORE CONTENT SWITCHING --- */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab} // QUAN TRỌNG: Framer Motion cần key để biết component đã thay đổi
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full h-full"
                >
                  {/* --- RENDER TABS --- */}
                  {activeTab === 'info' && <UserInfoTab user={user} />}

                  {/* Tutor Areas */}
                  {activeTab === 'tutor-profile' && user?.role === 'tutor' && <TutorProfileTab />}
                  {activeTab === 'my-applications' && user?.role === 'tutor' && <MyApplicationsTab />}
                  {activeTab === 'my-invitations' && user?.role === 'tutor' && <MyInvitationsTab />}
                  {activeTab === 'wallet' && user?.role === 'tutor' && <WalletTab />}

                  {/* Student Areas */}
                  {activeTab === 'my-requests' && <MyRequestsTab />}
                  {activeTab === 'post-request' && <PostRequestTab />}

                  {/* --- PASSWORD TAB (Modern UI) --- */}
                  {activeTab === 'password' && (
                    <div className="max-w-xl mx-auto py-8">
                      <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-full mb-6 shadow-inner">
                          <FaShieldAlt size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Bảo mật tài khoản</h2>
                        <p className="text-slate-500 mt-2 text-sm">Mật khẩu mạnh giúp bảo vệ tài khoản và ví của bạn an toàn hơn.</p>
                      </div>

                      <form className="space-y-6">
                        <div className="group">
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mật khẩu hiện tại</label>
                          <div className="relative">
                            <input type="password"
                              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                              placeholder="Nhập mật khẩu cũ..."
                            />
                            <FaKey className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mật khẩu mới</label>
                            <input type="password"
                              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                              placeholder="Ít nhất 8 ký tự"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Xác nhận mới</label>
                            <input type="password"
                              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                              placeholder="Nhập lại mật khẩu"
                            />
                          </div>
                        </div>

                        <div className="pt-4">
                          <button className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300">
                            Cập nhật mật khẩu
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;