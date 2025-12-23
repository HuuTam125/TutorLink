import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const ReportModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#193366]/40 backdrop-blur-sm font-sans">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 border border-red-100"
      >
        <h3 className="text-xl font-extrabold text-[#C5221F] flex items-center gap-2 mb-4">
          <FaExclamationTriangle /> Báo cáo sự cố / Hoàn tiền
        </h3>
        <p className="text-sm text-gray-600 mb-4 font-medium">Nếu thông tin liên hệ sai hoặc phụ huynh hủy lớp, bạn có thể yêu cầu hoàn tiền.</p>

        <textarea
          className="w-full p-4 border border-gray-200 rounded-xl bg-[#f9f9f6] focus:bg-white focus:border-[#C5221F] focus:ring-4 focus:ring-[#C5221F]/10 outline-none min-h-[120px] font-medium text-[#193366]"
          placeholder="Nhập lý do chi tiết..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-[#f9f9f6] transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => onSubmit(reason)}
            disabled={!reason.trim() || loading}
            className="px-5 py-2.5 rounded-xl font-bold bg-[#C5221F] text-white hover:bg-[#A51D1A] disabled:opacity-50 shadow-lg shadow-red-200"
          >
            {loading ? 'Đang gửi...' : 'Gửi báo cáo'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportModal;