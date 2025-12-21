import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../../api/axiosClient'; // Đảm bảo đường dẫn import đúng
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaExclamationTriangle,
  FaMoneyBillWave, FaSearch
} from 'react-icons/fa';

import PaymentModal from './PaymentModal';
import ContactModal from './ContactModal';
import ReportModal from './ReportModal';

const MyApplicationsTab = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal States
  const [payModal, setPayModal] = useState({ open: false, app: null });
  const [contactModal, setContactModal] = useState({ open: false, info: null });
  const [reportModal, setReportModal] = useState({ open: false, appId: null });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('applications/my-applications');
      setApps(res.data);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  const handlePayClick = (app) => {
    setPayModal({ open: true, app: app });
  };

  const confirmPayment = async (appId) => {
    setActionLoading(true);
    try {
      const res = await axiosClient.post('/wallet/pay-class-fee', { applicationId: appId });

      // Close pay modal, Show contact modal
      setPayModal({ open: false, app: null });
      setContactModal({ open: true, info: res.data.contactInfo });

      loadData(); // Reload status
    } catch (error) {
      const message = error.response?.data?.message || "Lỗi thanh toán";
      setPayModal({ open: false, app: null });

      if (message.includes("Số dư không đủ")) {
        if (window.confirm(`${message}\n\nBạn có muốn nạp tiền ngay không?`)) {
          alert("Vui lòng chuyển sang tab 'Ví của tôi' để nạp tiền."); // Thay thế bằng navigate nếu cần
        }
      } else {
        alert("Lỗi: " + message);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleReportClick = (appId) => {
    setReportModal({ open: true, appId });
  };

  const submitReport = async (reason) => {
    setActionLoading(true);
    try {
      await axiosClient.post(`/applications/${reportModal.appId}/report`, { reason });
      setReportModal({ open: false, appId: null });
      alert("Đã gửi báo cáo thành công! Admin sẽ xử lý và hoàn tiền nếu hợp lệ.");
      loadData();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const showContactAgain = (app) => {
    // Logic hiển thị lại thông tin contact (giả sử backend trả về info trong list app nếu đã thanh toán)
    // Nếu API get list chưa trả về contact info thì bạn cần call API get detail
    if (app.contactInfo) {
      setContactModal({ open: true, info: app.contactInfo });
    } else {
      // Fallback đơn giản hoặc thông báo
      alert("Không tìm thấy thông tin đã lưu. Vui lòng tải lại trang.");
    }
  };

  // --- RENDER HELPERS ---
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700"><FaCheckCircle /> Được duyệt</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><FaTimesCircle /> Từ chối</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700"><FaClock /> Đang xét duyệt</span>;
    }
  };

  // --- LOADING SKELETON ---
  if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
      <div className="h-8 bg-slate-100 rounded-lg w-1/3 mb-6 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-50 rounded-xl animate-pulse"></div>)}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FaSearch /></span>
            Lịch sử ứng tuyển
          </h3>
          <p className="text-slate-500 text-sm mt-1">Theo dõi trạng thái các lớp bạn đã đăng ký nhận dạy.</p>
        </div>
        <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Tổng: {apps.length}
        </div>
      </div>

      {/* TABLE / LIST */}
      {apps.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <FaSearch size={40} />
          </div>
          <p className="text-slate-500 font-medium">Bạn chưa ứng tuyển lớp nào.</p>
          <button onClick={() => navigate('/classes')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
            Tìm lớp ngay
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-4 pl-4">Thông tin lớp</th>
                <th className="pb-4">Trạng thái</th>
                <th className="pb-4">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 text-sm">
              <AnimatePresence>
                {apps.map((app, index) => (
                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* INFO COLUMN */}
                    <td className="py-5 pl-4 align-top max-w-[250px] md:max-w-xs pointer">
                      <Link
                        to={`/classes/${app.classRequest?._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-800 hover:text-blue-600 text-base block mb-1 truncate"
                      >
                        {app.classRequest?.subject || "Môn học không xác định"}
                      </Link>

                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                          {app.classRequest?.budget?.toLocaleString()}đ/buổi
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{new Date(app.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </td>

                    {/* STATUS COLUMN */}
                    <td className="py-5 align-top">
                      <div className="flex flex-col items-start gap-2">
                        {getStatusBadge(app.status)}

                        {app.paymentStatus === 'paid' && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            <FaCheckCircle size={10} /> Đã thanh toán
                          </span>
                        )}
                        {app.isReported && (
                          <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded">
                            Đã báo cáo
                          </span>
                        )}
                      </div>
                    </td>

                    {/* ACTION COLUMN */}
                    <td className="py-5 align-top">
                      <div className="flex flex-col items-start gap-2">

                        {/* CASE 1: APPROVED & UNPAID -> Pay Button */}
                        {app.status === 'approved' && app.paymentStatus === 'unpaid' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePayClick(app)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 text-xs flex items-center gap-2"
                          >
                            <FaMoneyBillWave /> Nhận lớp ngay
                          </motion.button>
                        )}

                        {/* CASE 2: PAID -> Show Contact & Report */}
                        {app.paymentStatus === 'paid' && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => showContactAgain(app)}
                              className="px-3 py-1.5 bg-white border border-blue-200 text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors flex items-center gap-2"
                            >
                              <FaEye /> Xem liên hệ
                            </button>

                            {!app.isReported ? (
                              <button
                                onClick={() => handleReportClick(app._id)}
                                className="text-xs text-slate-400 hover:text-red-500 font-medium underline decoration-dashed underline-offset-2 flex items-center gap-1"
                              >
                                <FaExclamationTriangle size={10} /> Báo cáo sự cố
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400 italic">Admin đang xử lý</span>
                            )}
                          </div>
                        )}

                        {/* CASE 3: PENDING/REJECTED */}
                        {app.status !== 'approved' && (
                          <span className="text-xs text-slate-400 font-medium italic">Không có hành động</span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* --- RENDER MODALS --- */}
      <PaymentModal
        isOpen={payModal.open}
        app={payModal.app}
        onClose={() => setPayModal({ open: false, app: null })}
        onConfirm={confirmPayment}
        loading={actionLoading}
      />

      <ContactModal
        isOpen={contactModal.open}
        contactInfo={contactModal.info}
        onClose={() => setContactModal({ open: false, info: null })}
      />

      <ReportModal
        isOpen={reportModal.open}
        onClose={() => setReportModal({ open: false, appId: null })}
        onSubmit={submitReport}
        loading={actionLoading}
      />

    </div>
  );
};

export default MyApplicationsTab;