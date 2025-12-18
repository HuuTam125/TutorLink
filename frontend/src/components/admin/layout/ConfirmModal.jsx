import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, isDanger = false }) => {
  if (!isOpen) return null;

  return (
    // Lớp phủ mờ (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Hộp thoại (Modal Content) */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all scale-100">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isDanger ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              <FiAlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          </div>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Footer (Buttons) */}
        <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-xl border-t border-gray-100">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            className={`cursor-pointer px-4 py-2 text-white rounded-lg font-medium shadow-md transition-transform active:scale-95 ${isDanger
              ? 'bg-red-600 hover:bg-red-700 shadow-red-500/30'
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
              }`}
          >
            xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;