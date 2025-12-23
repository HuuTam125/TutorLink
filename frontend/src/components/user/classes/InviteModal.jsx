import { useState, useEffect } from 'react';
import axiosClient from '../../../api/axiosClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChalkboardTeacher, FaChevronDown, FaPlusCircle, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Dùng Link để chuyển trang mượt hơn
import { toast } from 'react-toastify';

const InviteModal = ({ tutor, onClose }) => {
  const [myClasses, setMyClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Lấy danh sách lớp của phụ huynh khi mở modal
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setFetching(true);
        // API cũ của bạn
        const res = await axiosClient.get('/requests/my-requests');

        // Lọc lớp approved
        const activeClasses = res.data.filter(c => c.status === 'approved');

        setMyClasses(activeClasses);
        if (activeClasses.length > 0) setSelectedClass(activeClasses[0]._id);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách lớp học.");
      } finally {
        setFetching(false);
      }
    };
    fetchClasses();
  }, []);

  const handleInvite = async () => {
    if (!selectedClass) {
      toast.warning("Vui lòng chọn lớp học!");
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post('/invitations', {
        tutorId: tutor.user._id,
        classRequestId: selectedClass
      });

      toast.success("Đã gửi lời mời thành công!");
      onClose(); // Đóng modal sau khi thành công
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error("Lỗi: " + msg);
    } finally {
      setLoading(false);
    }
  };

  // Format tiền tệ
  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">

        {/* Backdrop mờ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#193366]/40 backdrop-blur-sm"
        ></motion.div>

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#193366]/10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#f9f9f6]">
            <h3 className="text-xl font-extrabold text-[#193366]">Mời gia sư</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6">

            {/* Info Gia sư được mời */}
            <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 mb-6">
              <img
                src={tutor.user?.avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Đang mời:</p>
                <p className="text-base font-bold text-[#193366]">{tutor.user?.fullName || tutor.hoTen}</p>
              </div>
            </div>

            {fetching ? (
              <div className="py-8 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#193366] mx-auto mb-2"></div>
                Đang tải lớp...
              </div>
            ) : myClasses.length === 0 ? (
              // Empty State: Chưa có lớp
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                  <FaChalkboardTeacher size={24} />
                </div>
                <p className="text-gray-800 font-bold mb-1">Bạn chưa có lớp học nào khả dụng</p>
                <p className="text-gray-500 text-sm mb-4">Vui lòng đăng lớp mới và chờ duyệt trước khi mời gia sư.</p>
                <Link
                  to="/profile"
                  state={{ defaultTab: 'post-request' }} // Chuyển tab trong profile (nếu bạn có logic này)
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#193366] text-white rounded-xl font-bold text-sm hover:bg-[#193366]/90 transition-all shadow-lg shadow-[#193366]/20"
                >
                  <FaPlusCircle /> Đăng lớp mới ngay
                </Link>
              </div>
            ) : (
              // Form chọn lớp
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">
                  Chọn lớp học muốn mời:
                </label>

                <div className="relative">
                  <select
                    className="w-full pl-4 pr-10 py-3 bg-[#f9f9f6] border border-gray-200 rounded-xl text-[#193366] font-medium outline-none focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/20 appearance-none cursor-pointer transition-all"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    {myClasses.map(cls => (
                      <option key={cls._id} value={cls._id}>
                        {cls.subject} - {cls.grade} ({formatPrice(cls.budget)}đ)
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <FaChevronDown size={12} />
                  </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p>💡 <strong>Lưu ý:</strong> Gia sư sẽ nhận được thông báo ngay lập tức. Bạn có thể chat trao đổi thêm sau khi họ chấp nhận.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {myClasses.length > 0 && (
            <div className="px-6 py-4 bg-[#f9f9f6] border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-white hover:text-gray-800 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleInvite}
                disabled={loading}
                className={`px-6 py-2.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-all
                        ${loading
                    ? 'bg-[#193366]/70 cursor-wait'
                    : 'bg-[#193366] hover:bg-[#193366]/90 shadow-[#193366]/30 hover:-translate-y-0.5'}
                    `}
              >
                {loading ? (
                  <>Đang gửi...</>
                ) : (
                  <><FaPaperPlane size={12} /> Gửi lời mời</>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InviteModal;