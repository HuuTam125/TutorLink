import { useEffect, useState, useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // IMPORT

// Layout & UI Components
import AdminSidebar from '../../components/admin/layout/AdminSidebar';
import ConfirmModal from '../../components/admin/layout/ConfirmModal';
import TutorDetailPanel from '../../components/admin/layout/AdminTutorDetailPanel';
import Dashboard from "../../components/admin/dashboard/AdminDashboard";

// Table Components
import PendingTutorsTable from '../../components/admin/tables/PendingTutorsTable';
import PendingClassesTable from '../../components/admin/tables/PendingClassesTable';
import TutorsTable from '../../components/admin/tables/TutorsTable';
import ParentsTable from '../../components/admin/tables/ParentsTable';
import ClassesTable from '../../components/admin/tables/ClassesTable';
import MatchedClassesTable from '../../components/admin/tables/MatchedClassesTable';
import RefundReportsTable from '../../components/admin/tables/RefundReportsTable';
import AdminChatPanel from '../../components/admin/tables/AdminChatPanel';
import TransactionsTable from '../../components/admin/tables/TransactionsTable';

// --- ANIMATION VARIANTS (Hiệu ứng) ---
const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Data State
  const [stats, setStats] = useState({ userCount: 0, requestCount: 0, pendingCount: 0 });
  const [users, setUsers] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);
  const [pendingClass, setPendingClass] = useState([]);
  const [allClass, setallClass] = useState([]);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [matchedClasses, setMatchedClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false, type: null, id: null, title: '', message: ''
  });

  // Protect Route
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
      toast.error('Bạn không có quyền truy cập!');
    }
  }, [user, navigate]);

  // Fetch Data
  const fetchData = async () => {
    try {
      // Giữ loading nhẹ để trải nghiệm không bị giật, nhưng nếu chỉ switch tab thì không nên full loading
      // Ở đây ta giả sử load lần đầu
      if (users.length === 0) setLoading(true);

      const [
        resUsers, resPendingProfile, resPendingClass, resClass,
        resMatched, resReports, resTrans
      ] = await Promise.all([
        axiosClient.get('/admin/users'),
        axiosClient.get('/admin/tutors-pending'),
        axiosClient.get('/admin/requests-pending'),
        axiosClient.get('/requests'),
        axiosClient.get('/admin/matched-classes'),
        axiosClient.get('/admin/reports'),
        axiosClient.get('/admin/transactions'),
      ]);

      setUsers(resUsers.data);
      setPendingTutors(resPendingProfile.data);
      setPendingClass(resPendingClass.data);
      setallClass(resClass.data);
      setMatchedClasses(resMatched.data);
      setReports(resReports.data);
      setTransactions(resTrans.data);

      setStats({
        userCount: resUsers.data.length,
        pendingCount: resPendingProfile.data.length,
        requestCount: resClass.data.length,
        revenue: resTrans.data.reduce((acc, curr) => curr.type === 'payment' ? acc + curr.amount : acc, 0)
      });
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải dữ liệu admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchData();
  }, [user, activeTab]); // Reload khi đổi tab để đảm bảo data mới nhất (Tùy logic của bạn)

  // --- ACTIONS ---
  const openDeleteModal = (type, id, name = '') => {
    let title = '', message = '';
    if (type === 'delete_user') {
      title = 'Xóa người dùng?';
      message = `Bạn có chắc chắn muốn xóa người dùng "${name}"?`;
    } else if (type === 'delete_request') {
      title = 'Xóa bài đăng?';
      message = 'Bạn có chắc chắn muốn xóa lớp học này khỏi hệ thống?';
    }
    setModalState({ isOpen: true, type, id, title, message });
  };

  const closeDeleteModal = () => setModalState({ ...modalState, isOpen: false });

  const handleConfirmAction = async () => {
    const { type, id } = modalState;
    closeDeleteModal();
    try {
      if (type === 'delete_user') await axiosClient.delete(`/admin/users/${id}`);
      else if (type === 'delete_request') await axiosClient.delete(`/requests/${id}`);

      toast.success('Thao tác thành công');
      fetchData();
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
  };

  // Handlers khác
  const handleApproveTutor = async (id) => { /* ... */ await axiosClient.put(`/admin/approve-tutor/${id}`); fetchData(); toast.success('Đã duyệt!'); };
  const handleApproveRequest = async (id) => { /* ... */ await axiosClient.put(`/admin/approve-request/${id}`); fetchData(); toast.success('Đã duyệt!'); };
  const handleRefund = async (appId) => { /* ... */ await axiosClient.post('/admin/refund', { applicationId: appId }); fetchData(); toast.success('Đã hoàn tiền'); };
  const handleDismissReport = async (appId) => { /* ... */ await axiosClient.put(`/admin/applications/${appId}/resolve-report`); fetchData(); toast.success('Đã xử lý'); };

  // --- RENDER CONTENT WITH ANIMATION ---
  const renderContent = () => {
    if (loading) {
      return (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col justify-center items-center h-[60vh] text-gray-400 gap-3"
        >
          {/* Skeleton Spinner */}
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium animate-pulse">Đang đồng bộ dữ liệu...</p>
        </motion.div>
      );
    }

    // Component mapping để code gọn hơn
    let content = null;
    switch (activeTab) {
      case 'dashboard': content = <Dashboard stats={stats} />; break;
      case 'pending': content = <PendingTutorsTable tutors={pendingTutors} onApprove={handleApproveTutor} />; break;
      case 'pending_requests': content = <PendingClassesTable requests={pendingClass} onApprove={handleApproveRequest} onDelete={(id) => openDeleteModal('delete_request', id)} />; break;
      case 'tutors':
        if (selectedTutorId) return <TutorDetailPanel tutorId={selectedTutorId} onBack={() => setSelectedTutorId(null)} />;
        content = <TutorsTable users={users} onSelectTutor={setSelectedTutorId} onDelete={(id, name) => openDeleteModal('delete_user', id, name)} />;
        break;
      case 'parents': content = <ParentsTable users={users} onDelete={(id, name) => openDeleteModal('delete_user', id, name)} />; break;
      case 'requests': content = <ClassesTable classes={allClass} onDelete={(id) => openDeleteModal('delete_request', id)} />; break;
      case 'matched': content = <MatchedClassesTable classes={matchedClasses} />; break;
      case 'reports': content = <RefundReportsTable reports={reports} onRefund={handleRefund} onDismiss={handleDismissReport} />; break;
      case 'transactions': content = <TransactionsTable transactions={transactions} />; break;
      case 'messages': content = <AdminChatPanel />; break;
      default: content = null;
    }

    return (
      <motion.div
        key={activeTab} // Quan trọng: Key thay đổi sẽ kích hoạt animation
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        {content}
      </motion.div>
    );
  };

  // --- HEADER TITLE MAP ---
  const getHeaderTitle = () => {
    const titles = {
      dashboard: 'Tổng quan hệ thống',
      pending: 'Phê duyệt Gia sư mới',
      pending_requests: 'Phê duyệt Lớp học',
      tutors: 'Danh sách Gia sư',
      parents: 'Danh sách Phụ huynh',
      requests: 'Quản lý Lớp học',
      matched: 'Lớp đã kết nối',
      reports: 'Xử lý Khiếu nại',
      transactions: 'Lịch sử Giao dịch',
      messages: 'Tin nhắn hỗ trợ'
    };
    return titles[activeTab] || 'Admin Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Gradient Decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50 to-slate-50 -z-10" />

        {/* --- GLASS HEADER --- */}
        <header className="sticky top-0 z-30 px-8 py-5 flex justify-between items-center backdrop-blur-md bg-white/70 border-b border-white/50 shadow-sm transition-all">
          <div>
            <motion.h1
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-slate-800 tracking-tight"
            >
              {getHeaderTitle()}
            </motion.h1>
            <p className="text-sm text-slate-500 mt-1">Chào mừng trở lại, quản trị viên cấp cao.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-700">{user?.fullName}</p>
              <p className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full inline-block">Super Admin</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-lg shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-lg">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">
          <div className="max-w-7xl mx-auto pb-10">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmAction}
        title={modalState.title}
        message={modalState.message}
        isDanger={true}
      />
    </div>
  );
};

export default AdminPage;