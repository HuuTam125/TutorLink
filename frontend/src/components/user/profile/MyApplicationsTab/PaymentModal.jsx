import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaSpinner } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, onConfirm, app, loading }) => {
  if (!isOpen || !app) return null;
  const commission = (app.classRequest?.budget || 0) * 0.15; // 15% phí

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#193366]/40 backdrop-blur-sm animate-fade-in font-sans">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#193366]/10"
      >
        {/* Header: Navy Background */}
        <div className="bg-[#193366] p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaMoneyBillWave size={30} />
          </div>
          <h3 className="text-xl font-extrabold">Xác nhận nhận lớp</h3>
          <p className="text-blue-100 text-sm mt-1 font-medium">Thanh toán phí để nhận thông tin liên hệ</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-500 font-medium text-sm">Lớp học</span>
            <span className="font-bold text-[#193366] truncate max-w-[200px]">{app.classRequest?.subject}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-500 font-medium text-sm">Học phí gốc</span>
            <span className="font-bold text-[#193366]">{app.classRequest?.budget?.toLocaleString()}đ</span>
          </div>

          {/* Highlight Box */}
          <div className="flex justify-between items-center py-3 bg-[#E6F4EA] px-4 rounded-xl border border-[#CEEAD6]">
            <span className="text-[#137333] font-bold text-sm">Phí nhận lớp (15%)</span>
            <span className="text-[#137333] font-extrabold text-lg">{commission.toLocaleString()}đ</span>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#f9f9f6] text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Để sau
            </button>
            <button
              onClick={() => onConfirm(app._id)}
              disabled={loading}
              // Button: Navy Gradient Hover
              className="flex-1 py-3 bg-[#193366] text-white font-bold rounded-xl hover:bg-[#193366]/90 shadow-lg shadow-[#193366]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <FaSpinner className="animate-spin" /> : 'Thanh toán ngay'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;