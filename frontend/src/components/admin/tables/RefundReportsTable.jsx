import React, { useState } from 'react';
import {
  FiAlertTriangle, FiCheckCircle, FiXCircle, FiClock,
  FiFileText, FiChevronDown, FiDollarSign, FiUser, FiActivity
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from './SharedComponents'; // Import component dùng chung

const RefundReportsTable = ({ reports = [], onRefund, onDismiss }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Helper tính khoảng thời gian (VD: 2 giờ trước)
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 3600;
    if (interval > 24) return Math.floor(interval / 24) + " ngày trước";
    if (interval > 1) return Math.floor(interval) + " giờ trước";
    return Math.floor(seconds / 60) + " phút trước";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">

      {/* --- HEADER --- */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white z-20">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <FiAlertTriangle size={20} />
            </span>
            Khiếu nại & Hoàn tiền
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <span className="font-bold text-slate-700">{reports.length}</span> yêu cầu đang chờ xử lý
          </div>
        </div>

        {/* Filter giả lập */}
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100 flex items-center gap-1">
            <FiClock /> Chờ xử lý
          </span>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="overflow-x-auto flex-1 bg-slate-50/30">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[30%]">Người báo cáo</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[25%]">Lớp học liên quan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[20%]">Số tiền hoàn (Est.)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[15%]">Thời gian</th>
              <th className="px-6 py-4 text-right w-[10%]"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {reports.length > 0 ? (
              reports.map((app) => {
                const isExpanded = expandedId === app._id;
                // Tính toán tiền hoàn (Giả sử 15% hoặc lấy từ API)
                const refundAmount = (app.classRequest?.budget || 0) * 0.15;

                return (
                  <React.Fragment key={app._id}>
                    {/* MAIN ROW */}
                    <motion.tr
                      layout
                      onClick={() => toggleExpand(app._id)}
                      className={`group cursor-pointer transition-colors border-l-4 
                        ${isExpanded ? 'bg-amber-50/40 border-l-amber-500' : 'hover:bg-slate-50 border-l-transparent'}
                      `}
                    >
                      {/* 1. Reporter */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar src={app.tutor?.avatar} name={app.tutor?.hoTen} size="md" />
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{app.tutor?.hoTen}</div>
                            <div className="text-xs text-slate-500">{app.tutor?.email}</div>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 mt-1 rounded text-[10px] bg-slate-100 text-slate-500 border border-slate-200">
                              <FiUser size={10} /> Gia sư
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Class Context */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-800">{app.classRequest?.subject}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">ID: #{app.classRequest?._id?.slice(-6).toUpperCase()}</div>
                        <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[150px]">
                          Lý do: {app.reportReason}
                        </div>
                      </td>

                      {/* 3. Refund Amount */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-bold text-red-600 text-sm">
                          <FiDollarSign /> {formatCurrency(refundAmount)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          (15% của {formatCurrency(app.classRequest?.budget)})
                        </div>
                      </td>

                      {/* 4. Time */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <FiClock className="text-amber-500" />
                          {timeAgo(app.updatedAt)}
                        </div>
                      </td>

                      {/* 5. Chevron */}
                      <td className="px-6 py-4 text-right">
                        <div className={`p-2 rounded-full inline-block transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-amber-100 text-amber-600' : 'text-slate-400 group-hover:bg-slate-100'}`}>
                          <FiChevronDown />
                        </div>
                      </td>
                    </motion.tr>

                    {/* EXPANDED DETAILS */}
                    <AnimatePresence>
                      {isExpanded && (
                        <tr>
                          <td colSpan="5" className="p-0 border-none">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-amber-50/30 overflow-hidden"
                            >
                              <div className="p-6 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* LEFT: DETAIL REASON */}
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <FiFileText /> Nội dung khiếu nại
                                  </h4>
                                  <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm relative">
                                    <FiActivity className="absolute right-4 top-4 text-red-100 text-4xl" />
                                    <p className="text-sm text-slate-700 leading-relaxed relative z-10">
                                      "{app.reportReason}"
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-slate-50 flex gap-2">
                                      {/* Mock Evidence Images */}
                                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 cursor-pointer hover:bg-slate-200">
                                        Ảnh 1
                                      </div>
                                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 cursor-pointer hover:bg-slate-200">
                                        Ảnh 2
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* RIGHT: ACTIONS */}
                                <div className="space-y-3 flex flex-col justify-between">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    Quyết định xử lý
                                  </h4>

                                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-full flex flex-col justify-center gap-3">
                                    <div className="text-xs text-slate-500 mb-2">
                                      Hành động này sẽ ảnh hưởng đến ví của Gia sư và trạng thái lớp học. Hãy cân nhắc kỹ.
                                    </div>

                                    <div className="flex gap-3">
                                      <button
                                        onClick={(e) => { e.stopPropagation(); onRefund(app._id); }}
                                        className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                                      >
                                        <FiCheckCircle /> Chấp nhận Hoàn tiền
                                      </button>

                                      <button
                                        onClick={(e) => { e.stopPropagation(); onDismiss(app._id); }}
                                        className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                                      >
                                        <FiXCircle /> Từ chối
                                      </button>
                                    </div>

                                    <button className="text-xs text-blue-500 hover:underline text-center mt-1">
                                      Liên hệ các bên để xác minh thêm
                                    </button>
                                  </div>
                                </div>

                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-300">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <FiCheckCircle size={32} className="text-emerald-400" />
                    </div>
                    <p className="text-slate-500 font-medium">Hệ thống trong sạch!</p>
                    <p className="text-sm">Không có khiếu nại nào cần xử lý lúc này.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundReportsTable;