import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactModal = ({ isOpen, onClose, contactInfo }) => {
  if (!isOpen || !contactInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#193366]/40 backdrop-blur-sm animate-fade-in font-sans">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative border border-[#193366]/5"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors">
          <FaTimesCircle size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#E6F4EA] text-[#137333] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
            <FaCheckCircle size={32} />
          </div>
          <h3 className="text-2xl font-extrabold text-[#193366]">Đã thanh toán!</h3>
          <p className="text-gray-500 text-sm font-medium">Dưới đây là thông tin phụ huynh:</p>
        </div>

        <div className="bg-[#f9f9f6] rounded-2xl p-5 space-y-4 border border-[#193366]/5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Họ và tên</label>
            <p className="font-bold text-lg text-[#193366]">{contactInfo.fullName}</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1 tracking-wide">
                <FaPhoneAlt size={10} /> Số điện thoại
              </label>
              <p className="font-extrabold text-lg text-[#193366] mt-0.5">{contactInfo.phone}</p>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1 tracking-wide">
                <FaEnvelope size={10} /> Email
              </label>
              <p className="font-bold text-sm text-[#193366] break-all mt-1">{contactInfo.email}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6 italic font-medium">
          *Vui lòng liên hệ phụ huynh trong vòng 24h.
        </p>
      </motion.div>
    </div>
  );
};

export default ContactModal;