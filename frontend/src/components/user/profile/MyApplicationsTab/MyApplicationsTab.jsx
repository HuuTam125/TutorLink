import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../../api/axiosClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaExclamationTriangle,
  FaMoneyBillWave, FaSearch, FaWallet, FaArrowRight
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

  // STATE MỚI: Modal cảnh báo số dư
  const [balanceModal, setBalanceModal] = useState({ open: false, message: '' });

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

      // --- LOGIC MỚI: Thay thế window.confirm ---
      if (message.includes("Số dư không đủ")) {
        // Mở Modal cảnh báo đẹp thay vì confirm của trình duyệt
        setBalanceModal({ open: true, message: message });
      } else {
        alert("Lỗi: " + message); // Bạn có thể thay bằng Toast notification nếu muốn
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
    if (app.contactInfo) {
      setContactModal({ open: true, info: app.contactInfo });
    } else {
      alert("Không tìm thấy thông tin đã lưu. Vui lòng tải lại trang.");
    }
  };

  // --- RENDER HELPERS ---
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]"><FaCheckCircle /> Được duyệt</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF]"><FaTimesCircle /> Từ chối</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF9E6] text-[#B7791F] border border-[#FFE082]"><FaClock /> Đang xét duyệt</span>;
    }
  };

  // --- LOADING SKELETON ---
  if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#193366]/5">
      <div className="h-8 bg-gray-100 rounded-lg w-1/3 mb-6 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-[#f9f9f6] rounded-xl animate-pulse"></div>)}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-[#193366]/5 animate-fade-in-up font-sans relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
        <div>
          <h3 className="text-xl font-extrabold text-[#193366] flex items-center gap-2">
            <span className="p-2 bg-[#f9f9f6] text-[#193366] rounded-lg"><FaSearch /></span>
            Lịch sử ứng tuyển
          </h3>
          <p className="text-gray-500 text-sm mt-1 font-medium">Theo dõi trạng thái các lớp bạn đã đăng ký nhận dạy.</p>
        </div>
        <div className="text-sm font-bold text-[#193366] bg-[#f9f9f6] px-3 py-1 rounded-full border border-[#193366]/10">
          Tổng: {apps.length}
        </div>
      </div>

      {/* TABLE / LIST */}
      {apps.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="w-24 h-24 bg-[#f9f9f6] rounded-full flex items-center justify-center text-[#193366]/20 mb-4">
            <FaSearch size={40} />
          </div>
          <p className="text-gray-500 font-medium">Bạn chưa ứng tuyển lớp nào.</p>
          <button onClick={() => navigate('/classes')} className="mt-4 px-6 py-2.5 bg-[#193366] text-white rounded-full font-bold text-sm hover:bg-[#193366]/90 transition-colors shadow-lg">
            Tìm lớp ngay
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-xs font-bold text-[#193366]/60 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-4 pl-4">Thông tin lớp</th>
                <th className="pb-4">Trạng thái</th>
                <th className="pb-4">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              <AnimatePresence>
                {apps.map((app, index) => (
                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group border-b border-gray-50 hover:bg-[#f9f9f6] transition-colors"
                  >
                    {/* INFO COLUMN */}
                    <td className="py-5 pl-4 align-top max-w-[250px] md:max-w-xs pointer">
                      <Link
                        to={`/classes/${app.classRequest?._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#193366] hover:text-[#193366]/80 text-base block mb-1 truncate"
                      >
                        {app.classRequest?.subject || "Môn học không xác định"}
                      </Link>

                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded-md font-bold">
                          {app.classRequest?.budget?.toLocaleString()}đ/buổi
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{new Date(app.createdAt).toLocaleDateString('vi-VN')}</span>
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
                          <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100">
                            Đã báo cáo
                          </span>
                        )}
                      </div>
                    </td>

                    {/* ACTION COLUMN */}
                    <td className="py-5 align-top">
                      <div className="flex flex-col items-start gap-2">
                        {/* CASE 1: APPROVED & UNPAID */}
                        {app.status === 'approved' && app.paymentStatus === 'unpaid' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePayClick(app)}
                            className="px-4 py-2 bg-[#193366] text-white font-bold rounded-xl shadow-lg shadow-[#193366]/30 text-xs flex items-center gap-2 hover:bg-[#193366]/90 transition-all"
                          >
                            <FaMoneyBillWave /> Nhận lớp ngay
                          </motion.button>
                        )}

                        {/* CASE 2: PAID */}
                        {app.paymentStatus === 'paid' && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => showContactAgain(app)}
                              className="px-3 py-1.5 bg-white border border-[#193366]/20 text-[#193366] font-bold rounded-lg text-xs hover:bg-[#193366]/5 transition-colors flex items-center gap-2"
                            >
                              <FaEye /> Xem liên hệ
                            </button>

                            {!app.isReported ? (
                              <button
                                onClick={() => handleReportClick(app._id)}
                                className="text-xs text-gray-400 hover:text-red-500 font-bold underline decoration-dashed underline-offset-2 flex items-center gap-1"
                              >
                                <FaExclamationTriangle size={10} /> Báo cáo sự cố
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400 italic font-medium">Admin đang xử lý</span>
                            )}
                          </div>
                        )}

                        {/* CASE 3: PENDING/REJECTED */}
                        {app.status !== 'approved' && (
                          <span className="text-xs text-gray-400 font-medium italic">Không có hành động</span>
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

      {/* --- RENDER EXISTING MODALS --- */}
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

      {/* --- NEW: INSUFFICIENT BALANCE MODAL (Thay thế window.confirm) --- */}
      <AnimatePresence>
        {balanceModal.open && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBalanceModal({ open: false, message: '' })}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-sm w-full border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <FaWallet size={32} />
              </div>

              <h3 className="text-lg font-extrabold text-[#193366] mb-2">
                Số dư không đủ
              </h3>

              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {balanceModal.message.replace("Số dư không đủ.", "") || "Bạn cần nạp thêm tiền vào ví để thực hiện thanh toán phí nhận lớp này."}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/profile?tab=wallet')}
                  className="w-full py-3 bg-[#193366] hover:bg-[#193366]/90 text-white font-bold rounded-xl shadow-lg shadow-[#193366]/20 flex items-center justify-center gap-2 transition-all"
                >
                  <FaWallet /> Nạp tiền ngay <FaArrowRight size={12} />
                </button>

                <button
                  onClick={() => setBalanceModal({ open: false, message: '' })}
                  className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition-colors"
                >
                  Để sau
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MyApplicationsTab;