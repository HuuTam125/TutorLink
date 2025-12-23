import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaKey, FaShieldAlt, FaChevronRight } from 'react-icons/fa';
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
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy giá trị 'tab' từ URL
  const activeTab = searchParams.get('tab') || 'info';

  const handleSetActiveTab = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  useEffect(() => {
    if (user === null) return; // Đợi load user
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

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
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    // Nền trang: Kem ấm #f9f9f6
    <div className="min-h-screen bg-[#f9f9f6] font-sans selection:bg-[#193366] selection:text-white">

      {/* Decor Background */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-[#193366]/5 rounded-bl-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10">

        {/* --- LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* SIDEBAR */}
          <UserSidebar activeTab={activeTab} setActiveTab={handleSetActiveTab} user={user} />

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 w-full flex flex-col gap-6">

            {/* 1. WELCOME HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#193366] tracking-tight">
                  {getTabTitle()}
                </h1>
                <p className="text-gray-500 mt-1 text-sm font-medium">
                  Quản lý thông tin và hoạt động của bạn tại đây.
                </p>
              </div>

              {/* Breadcrumb Styled */}
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm border border-[#193366]/5">
                <span>Profile</span>
                <FaChevronRight size={10} />
                <span className="text-[#193366]">{user?.role === 'tutor' ? 'Gia sư' : 'Học viên'}</span>
              </div>
            </div>

            {/* 2. CONTENT CARD */}
            {/* Card trắng, bo góc lớn, border nhạt, shadow Navy */}
            <div className="bg-white rounded-[2rem] shadow-[0_4px_30px_-10px_rgba(25,51,102,0.05)] border border-[#193366]/5 p-6 md:p-10 min-h-[600px] relative transition-all duration-500 ease-in-out">

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
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

                  {/* --- PASSWORD TAB (Navy Style) --- */}
                  {activeTab === 'password' && (
                    <div className="max-w-xl mx-auto py-8">
                      <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f9f9f6] text-[#193366] rounded-full mb-6 shadow-sm border border-[#193366]/10">
                          <FaShieldAlt size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-[#193366]">Bảo mật tài khoản</h2>
                        <p className="text-gray-500 mt-2 text-sm font-medium">Mật khẩu mạnh giúp bảo vệ tài khoản và ví của bạn an toàn hơn.</p>
                      </div>

                      <form className="space-y-6">
                        <div className="group">
                          <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Mật khẩu hiện tại</label>
                          <div className="relative">
                            <input type="password"
                              className="w-full pl-5 pr-12 py-4 rounded-xl bg-[#f9f9f6] border border-gray-200 text-[#193366] font-bold focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                              placeholder="Nhập mật khẩu cũ..."
                            />
                            <FaKey className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Mật khẩu mới</label>
                            <input type="password"
                              className="w-full px-5 py-4 rounded-xl bg-[#f9f9f6] border border-gray-200 text-[#193366] font-bold focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                              placeholder="Ít nhất 8 ký tự"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Xác nhận mới</label>
                            <input type="password"
                              className="w-full px-5 py-4 rounded-xl bg-[#f9f9f6] border border-gray-200 text-[#193366] font-bold focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                              placeholder="Nhập lại mật khẩu"
                            />
                          </div>
                        </div>

                        <div className="pt-6">
                          <button className="w-full bg-[#193366] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#193366]/90 hover:shadow-lg hover:shadow-[#193366]/30 hover:-translate-y-1 transition-all duration-300">
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