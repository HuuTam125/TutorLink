import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactModal = ({ isOpen, onClose, contactInfo }) => {
  if (!isOpen || !contactInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <FaTimesCircle size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Đã thanh toán!</h3>
          <p className="text-slate-500 text-sm">Dưới đây là thông tin phụ huynh:</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 space-y-4 border border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">Họ và tên</label>
            <p className="font-bold text-lg text-slate-800">{contactInfo.fullName}</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                <FaPhoneAlt size={10} /> Số điện thoại
              </label>
              <p className="font-bold text-lg text-blue-600">{contactInfo.phone}</p>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                <FaEnvelope size={10} /> Email
              </label>
              <p className="font-medium text-slate-700 break-all">{contactInfo.email}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-slate-400 mt-4 italic">
          *Vui lòng liên hệ phụ huynh trong vòng 24h.
        </p>
      </motion.div>
    </div>
  );
};

export default ContactModal;