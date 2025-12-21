import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../api/axiosClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelopeOpenText, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt,
  FaUserCircle, FaArrowRight, FaRegClock, FaTrashAlt
} from 'react-icons/fa';

const MyInvitationsTab = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        // Giả lập delay nhẹ để thấy skeleton (nếu mạng quá nhanh)
        const res = await axiosClient.get('/invitations/my-invitations');
        setInvites(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvites();
  }, []);

  // Xử lý từ chối nhanh (Mockup UI - Cần API thực tế)
  const handleDismiss = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lời mời này khỏi danh sách?")) {
      setInvites(prev => prev.filter(i => i._id !== id));
      // await axiosClient.delete(`/invitations/${id}`); // Call API here
    }
  }

  // --- SKELETON LOADER ---
  if (loading) return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-4">
      {[1, 2].map(i => (
        <div key={i} className="h-32 bg-slate-50 rounded-2xl animate-pulse flex items-center p-6 gap-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up min-h-[600px]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <span className="p-2 bg-orange-50 text-orange-600 rounded-lg"><FaEnvelopeOpenText /></span>
            Lời mời dạy
          </h3>
          <p className="text-slate-500 mt-1 text-sm">Cơ hội giảng dạy được gửi riêng cho bạn.</p>
        </div>
        <div className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold">
          {invites.length} lời mời mới
        </div>
      </div>

      {/* CONTENT */}
      {invites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <FaEnvelopeOpenText className="text-5xl text-orange-300" />
          </div>
          <h4 className="text-lg font-bold text-slate-700">Chưa có lời mời nào</h4>
          <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
            Hãy cập nhật hồ sơ thật ấn tượng để thu hút phụ huynh gửi lời mời nhé!
          </p>
          <Link to="/profile?tab=tutor-profile" className="mt-6 text-blue-600 font-bold text-sm hover:underline">
            Cập nhật hồ sơ ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {invites.map((inv, index) => (
              <motion.div
                key={inv._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="group relative bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative Side Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-red-500"></div>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                  {/* 1. Avatar Area */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-md text-slate-400">
                      {inv.sender?.avatar ? (
                        <img src={inv.sender.avatar} alt="Parent" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <FaUserCircle size={40} />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Online"></div>
                  </div>

                  {/* 2. Main Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h4 className="font-bold text-lg text-slate-800">
                        {inv.classRequest?.subject || "Môn học chưa rõ"}
                        <span className="text-slate-400 font-normal text-sm ml-2">- Lớp {inv.classRequest?.grade}</span>
                      </h4>
                      <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-wide">
                        Lời mời riêng
                      </span>
                    </div>

                    <div className="text-sm text-slate-500 mb-3">
                      <span className="font-semibold text-slate-700">{inv.sender?.hoTen || "Phụ huynh"}</span> đã xem hồ sơ và muốn mời bạn dạy lớp này.
                    </div>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600">
                      <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <FaMoneyBillWave className="text-green-500" />
                        {inv.classRequest?.budget?.toLocaleString()}đ/buổi
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <FaMapMarkerAlt className="text-blue-500" />
                        {inv.classRequest?.address || "Chưa cập nhật địa chỉ"}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <FaRegClock className="text-slate-400" />
                        {new Date(inv.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  {/* 3. Action Buttons */}
                  <div className="flex flex-row gap-3 w-full md:w-auto mt-4 md:mt-0 items-center">
                    <Link
                      to={`/classes/${inv.classRequest?._id}`}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 whitespace-nowrap"
                    >
                      Xem chi tiết <FaArrowRight />
                    </Link>

                    <button
                      onClick={() => handleDismiss(inv._id)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-500
                                hover:text-red-500 hover:bg-red-50 hover:border-red-200
                                hover:scale-110 active:scale-95
                                transition-all duration-200"
                      title="Từ chối lời mời"
                    >
                      <FaTrashAlt size={15} />
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyInvitationsTab;