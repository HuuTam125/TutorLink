import { useEffect, useState, useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
import ApplicationManagementTable from '../../components/admin/tables/ApplicationManagementTable';

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
  const [applications, setApplications] = useState([]);

  // Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    id: null,
    title: '',
    message: ''
  });

  // Bảo vệ trang
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
      toast.error('Bạn không có quyền truy cập!');
    }
  }, [user, navigate]);

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resUsers, resPendingProfile, resPendingClass, resClass, resApps] = await Promise.all([
        axiosClient.get('/admin/users'),
        axiosClient.get('/admin/tutors-pending'),
        axiosClient.get('/admin/requests-pending'),
        axiosClient.get('/requests'),
        axiosClient.get('admin/applications'),

      ]);

      setUsers(resUsers.data);
      setPendingTutors(resPendingProfile.data);
      setPendingClass(resPendingClass.data);
      setallClass(resClass.data);
      setApplications(resApps.data);
      console.log(resApps.data)
      setStats({
        userCount: resUsers.data.length,
        pendingCount: resPendingProfile.data.length,
        requestCount: resClass.data.length
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
  }, [user]);

  // --- ACTIONS ---

  const openDeleteModal = (type, id, name = '') => {
    let title = '';
    let message = '';

    if (type === 'delete_user') {
      title = 'Xóa người dùng?';
      message = `Bạn có chắc chắn muốn xóa người dùng "${name}"? Hành động này không thể hoàn tác.`;
    } else if (type === 'delete_request') {
      title = 'Xóa bài đăng?';
      message = 'Bạn có chắc chắn muốn xóa lớp học này khỏi hệ thống?';
    }

    setModalState({ isOpen: true, type, id, title, message });
  };

  const closeDeleteModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const handleConfirmAction = async () => {
    const { type, id } = modalState;
    closeDeleteModal();
    try {
      if (type === 'delete_user') {
        await axiosClient.delete(`/admin/users/${id}`);
        toast.success('Đã xóa người dùng thành công');
      } else if (type === 'delete_request') {
        await axiosClient.delete(`/requests/${id}`);
        toast.success('Đã xóa bài đăng thành công');
      }
      fetchData();
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
      console.error(error);
    }
  };

  const handleApproveTutor = async (id) => {
    try {
      await axiosClient.put(`/admin/approve-tutor/${id}`);
      toast.success('Đã duyệt hồ sơ thành công!');
      fetchData();
    } catch (error) { toast.error('Lỗi khi duyệt'); }
  };

  const handleApproveRequest = async (id) => {
    try {
      await axiosClient.put(`/admin/approve-request/${id}`);
      toast.success('Đã duyệt lớp học thành công!');
      fetchData();
    } catch (error) {
      toast.error('Lỗi khi duyệt lớp học');
    }
  };

  const handleApproveApp = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn DUYỆT đơn này?")) return;
    try {
      await axiosClient.put(`/admin/applications/${id}/status`, {
        status: 'approved',
      });
      toast.success("Đã duyệt đơn thành công!");
      fetchData(); // Load lại data
    } catch (error) {
      toast.error("Lỗi: " + error.message);
    }
  };

  const handleRejectApp = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn TỪ CHỐI đơn này?")) return;
    try {
      await axiosClient.put(`/admin/applications/${id}/status`, {
        status: 'rejected',
      });
      toast.success("Đã từ chối đơn.");
      fetchData();
    } catch (error) {
      toast.error("Lỗi: " + error.message);
    }
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    if (loading) return <div className="flex justify-center items-center h-64 text-gray-400">Đang tải dữ liệu...</div>;

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;

      case 'pending':
        return (
          <PendingTutorsTable
            tutors={pendingTutors}
            onApprove={handleApproveTutor}
          />
        );

      case 'pending_requests':
        return (
          <PendingClassesTable
            requests={pendingClass}
            onApprove={handleApproveRequest}
            onDelete={(id) => openDeleteModal('delete_request', id)}
          />
        );

      case 'tutors':
        if (selectedTutorId) {
          return (
            <TutorDetailPanel
              tutorId={selectedTutorId}
              onBack={() => setSelectedTutorId(null)}
            />
          );
        }
        return (
          <TutorsTable
            users={users}
            onSelectTutor={setSelectedTutorId}
            onDelete={(id, name) => openDeleteModal('delete_user', id, name)}
          />
        );

      case 'parents':
        return (
          <ParentsTable
            users={users}
            onDelete={(id, name) => openDeleteModal('delete_user', id, name)}
          />
        );

      case 'requests':
        return (
          <ClassesTable
            classes={allClass}
            onDelete={(id) => openDeleteModal('delete_request', id)}
          />
        );
      case 'applications':
        return (
          <ApplicationManagementTable
            applications={applications}
            onApprove={handleApproveApp}
            onReject={handleRejectApp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-y-auto h-screen">
        <header className="bg-white shadow-sm py-4 px-8 mb-6 sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700 capitalize">
            {activeTab === 'dashboard' ? 'Tổng quan' :
              activeTab === 'pending' ? 'Duyệt Gia sư' :
                activeTab === 'users' ? 'Quản lý Người dùng' : 'Quản lý Lớp học'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Xin chào, <b>{user?.fullName}</b></span>
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <div className="px-8 pb-10">
          {renderContent()}
        </div>
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