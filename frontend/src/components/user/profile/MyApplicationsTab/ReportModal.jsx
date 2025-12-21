import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const ReportModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <h3 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-4">
          <FaExclamationTriangle /> Báo cáo sự cố / Hoàn tiền
        </h3>
        <p className="text-sm text-slate-600 mb-4">Nếu thông tin liên hệ sai hoặc phụ huynh hủy lớp, bạn có thể yêu cầu hoàn tiền.</p>

        <textarea
          className="w-full p-4 border border-slate-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none min-h-[120px]"
          placeholder="Nhập lý do chi tiết..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Hủy</button>
          <button
            onClick={() => onSubmit(reason)}
            disabled={!reason.trim() || loading}
            className="px-5 py-2.5 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Đang gửi...' : 'Gửi báo cáo'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportModal;