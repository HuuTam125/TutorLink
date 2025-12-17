import { useEffect, useState, useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';
import TutorDetailPanel from '../../components/admin/AdminTutorDetailPanel';
import Dashboard from "../../components/admin/dashboard/AdminDashboard"

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
  // --- STATE QUẢN LÝ MODAL ---
  // Thay vì confirm ngay, ta lưu thông tin hành động vào đây
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'delete_user' hoặc 'delete_request'
    id: null,   // ID của đối tượng cần xóa
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
      const [resUsers, resPendingProfile, resPendingClass, resClass, resUserProfiles] = await Promise.all([
        axiosClient.get('/admin/users'),
        axiosClient.get('/admin/tutors-pending'),
        axiosClient.get('/admin/requests-pending'),
        axiosClient.get('/requests'),
      ]);

      setUsers(resUsers.data);
      setPendingTutors(resPendingProfile.data);
      setPendingClass(resPendingClass.data);
      setallClass(resClass.data);
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

  // --- HÀM MỞ MODAL ---
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

    setModalState({
      isOpen: true,
      type,
      id,
      title,
      message
    });
  };

  const closeDeleteModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // --- HÀM XỬ LÝ CHÍNH (Được gọi khi bấm Confirm ở Modal) ---
  const handleConfirmAction = async () => {
    const { type, id } = modalState;
    closeDeleteModal(); // Đóng modal trước cho mượt

    try {
      if (type === 'delete_user') {
        await axiosClient.delete(`/admin/users/${id}`);
        toast.success('Đã xóa người dùng thành công');
      } else if (type === 'delete_request') {
        await axiosClient.delete(`/requests/${id}`);
        toast.success('Đã xóa bài đăng thành công');
      }
      // Load lại dữ liệu mới
      fetchData();
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
      console.error(error);
    }
  };

  // Hàm duyệt giữ nguyên vì không cần modal xác nhận nguy hiểm
  const handleApprove = async (id) => {
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
      console.error(error);
    }
  };


  const TableHeader = ({ headers }) => (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((h, index) => (
          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );


  const renderPendingProfile = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Duyệt Gia sư ({pendingTutors.length})</h2></div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Họ Tên', 'Môn dạy', 'Khu vực', 'Hành động']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingTutors.length === 0 ? (
              <tr><td colSpan="4" className="p-6 text-center text-gray-500">Không có hồ sơ nào chờ duyệt.</td></tr>
            ) : pendingTutors.map(t => (
              <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{t.user?.fullName}</td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {t.subjects.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-600 border border-blue-100">{s}</span>)}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{t.area}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleApprove(t._id)} className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    <FiCheckCircle /> Duyệt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPendingClass = () => {
    // Lọc các lớp có trạng thái là 'pending'
    const pendingList = pendingClass.filter(r => r.status === 'pending');

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Duyệt Lớp mới <span className="text-red-500">({pendingList.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader headers={['Môn / Lớp', 'Học phí / Yêu cầu', 'Phụ huynh', 'Hành động']} />
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingList.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-gray-500 italic">Không có lớp học nào đang chờ duyệt.</td></tr>
              ) : pendingList.map(r => (
                <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                  {/* Cột 1: Thông tin môn học */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800 text-lg">{r.subject}</div>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs border border-gray-200">
                      {r.grade}
                    </span>
                  </td>

                  {/* Cột 2: Học phí & Chi tiết */}
                  <td className="px-6 py-4">
                    <div className="text-green-600 font-semibold">
                      {r.price ? new Intl.NumberFormat('vi-VN').format(r.price) + ' đ/buổi' : 'Thỏa thuận'}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 max-w-xs truncate" title={r.description}>
                      {r.description || 'Không có mô tả thêm'}
                    </div>
                  </td>

                  {/* Cột 3: Người đăng */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{r.user?.fullName}</div>
                    <div className="text-xs text-gray-500">{r.user?.phone || 'SĐT ẩn'}</div>
                  </td>

                  {/* Cột 4: Hành động */}
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleApproveRequest(r._id)}
                      className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
                      title="Duyệt đăng bài"
                    >
                      <FiCheckCircle /> Duyệt
                    </button>
                    <button
                      onClick={() => openDeleteModal('delete_request', r._id)}
                      className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all"
                      title="Từ chối / Xóa"
                    >
                      <FiTrash2 /> Hủy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTutorsList = () => {
    // Lọc danh sách chỉ lấy tutor
    const tutorList = users.filter(u => u.role === 'tutor');

    if (selectedTutorId) {
      return (
        <TutorDetailPanel
          tutorId={selectedTutorId}
          onBack={() => setSelectedTutorId(null)}
        />
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Danh sách Gia sư ({tutorList.length})</h2>
          {/* Có thể thêm ô tìm kiếm ở đây sau này */}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader headers={['Gia sư', 'Liên hệ', 'Trạng thái', 'Hành động']} />
            <tbody className="bg-white divide-y divide-gray-200">
              {tutorList.map(t => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTutorId(t._id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                        {t.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{t.fullName}</div>
                        <div className="text-xs text-gray-500">Khu vực: {t.address || 'Chưa cập nhật'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{t.email}</div>
                    <div className="text-xs text-gray-500">{t.phone || '---'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Giả sử bạn có trường isVerified hoặc status */}
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Gia sư
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    onClick={(e) => e.stopPropagation()} // tránh bấm nút xóa cũng chuyển trang
                  >
                    <button
                      onClick={() => openDeleteModal('delete_user', t._id, t.fullName)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 2. VIEW PHỤ HUYNH 
  const renderParentsList = () => {
    // Lọc danh sách chỉ lấy user thường (phụ huynh/học sinh)
    const parentList = users.filter(u => u.role === 'student');

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Phụ huynh({parentList.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader headers={['Họ tên', 'Email', 'Ngày tham gia', 'Hành động']} />
            <tbody className="bg-white divide-y divide-gray-200">
              {parentList.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                        {u.fullName?.charAt(0).toUpperCase()}
                      </div>
                      {u.fullName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Giả sử có createdAt, nếu không thì để trống */}
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : '---'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openDeleteModal('delete_user', u._id, u.fullName)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderClass = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Quản lý Lớp học</h2></div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Môn học', 'Lớp', 'Người đăng', 'Trạng thái', 'Thao tác']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {allClass.map(r => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{r.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{r.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{r.user?.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${r.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{r.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    // GỌI HÀM MỞ MODAL THAY VÌ XÓA TRỰC TIẾP
                    onClick={() => openDeleteModal('delete_request', r._id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 hover:underline"
                  >
                    <FiTrash2 /> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- MAIN LAYOUT ---
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-y-auto h-screen">
        <header className="bg-white shadow-sm py-4 px-8 mb-6 sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700 capitalize">
            {activeTab === 'dashboard' ? 'Tổng quan' : activeTab === 'pending' ? 'Duyệt Gia sư' : activeTab === 'users' ? 'Quản lý Người dùng' : 'Quản lý Lớp học'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Xin chào, <b>{user?.fullName}</b></span>
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <div className="px-8 pb-10">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-gray-400">Đang tải dữ liệu...</div>
          ) : (
            <>
              {activeTab === 'dashboard' && <Dashboard stats={stats} />}
              {activeTab === 'pending' && renderPendingProfile()}
              {activeTab === 'pending_requests' && renderPendingClass()}
              {activeTab === 'tutors' && renderTutorsList()}
              {activeTab === 'parents' && renderParentsList()}
              {activeTab === 'requests' && renderClass()}
            </>
          )}
        </div>
      </div>

      {/* RENDER MODAL Ở CUỐI CÙNG ĐỂ NÓ NỔI LÊN TRÊN */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmAction}
        title={modalState.title}
        message={modalState.message}
        isDanger={true} // Bật màu đỏ cảnh báo
      />
    </div>
  );
};

export default AdminPage;