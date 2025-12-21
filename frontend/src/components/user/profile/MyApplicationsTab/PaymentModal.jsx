
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaSpinner } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, onConfirm, app, loading }) => {
  if (!isOpen || !app) return null;
  const commission = (app.classRequest?.budget || 0) * 0.15; // 15% phí

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-blue-600 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaMoneyBillWave size={30} />
          </div>
          <h3 className="text-xl font-bold">Xác nhận nhận lớp</h3>
          <p className="text-blue-100 text-sm mt-1">Thanh toán phí để nhận thông tin liên hệ</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            <span className="text-slate-500">Lớp học</span>
            <span className="font-bold text-slate-800 truncate max-w-[200px]">{app.classRequest?.subject}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            <span className="text-slate-500">Học phí gốc</span>
            <span className="font-semibold text-slate-800">{app.classRequest?.budget?.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-xl">
            <span className="text-blue-600 font-bold">Phí nhận lớp (15%)</span>
            <span className="text-blue-700 font-bold text-lg">{commission.toLocaleString()}đ</span>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Để sau
            </button>
            <button
              onClick={() => onConfirm(app._id)}
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
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