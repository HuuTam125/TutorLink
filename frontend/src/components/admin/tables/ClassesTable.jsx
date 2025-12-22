import { useState } from 'react';
import {
  FiTrash2, FiSearch, FiFilter, FiMoreHorizontal,
  FiMapPin, FiDollarSign, FiCalendar, FiBook, FiChevronDown, FiChevronUp,
  FiUser, FiInfo, FiClock, FiCheckCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar, StatusBadge } from './SharedComponents';

const ClassesTable = ({ classes, onDelete }) => {
  const [expandedId, setExpandedId] = useState(null);

  // Toggle mở rộng hàng
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">

      {/* --- HEADER --- */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white z-10">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Yêu cầu tìm Gia sư</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold text-xs">
              {classes.length}
            </span>
            <span>lớp đang chờ xử lý</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-64 transition-all"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <FiFilter />
          </button>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[30%]">Lớp học</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[25%]">Tài chính</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[25%]">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-[20%]"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {classes.map((c) => {
              const isExpanded = expandedId === c._id;

              return (
                <>
                  {/* MAIN ROW */}
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => toggleExpand(c._id)}
                    className={`group cursor-pointer transition-colors border-l-4 
                      ${isExpanded ? 'bg-blue-50/30 border-l-blue-500' : 'hover:bg-slate-50 border-l-transparent'}
                    `}
                  >
                    {/* 1. Class Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-colors
                          ${isExpanded ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-md'}
                        `}>
                          <FiBook />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{c.subject}</div>
                          <div className="text-xs text-slate-500">Lớp {c.grade} • {c.teachingMethod === 'online' ? 'Online' : 'Tại nhà'}</div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Budget */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-emerald-600 text-sm flex items-center gap-1">
                        {formatCurrency(c.budget)}
                        <span className="text-[10px] font-normal text-slate-400">/buổi</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <FiClock size={10} /> {c.sessionsPerWeek} buổi/tuần
                      </div>
                    </td>

                    {/* 3. Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} text={
                        c.status === 'pending' ? 'Đang tìm kiếm' :
                          c.status === 'matched' ? 'Đã ghép lớp' : 'Đóng'
                      } />
                      {c.status === 'matched' && (
                        <div className="text-[10px] text-slate-400 mt-1">
                          GV: {c.assignedTutor?.fullName || '---'}
                        </div>
                      )}
                    </td>

                    {/* 4. Action / Chevron */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                          {new Date(c.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                        <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-blue-100 text-blue-600 rotate-180' : 'text-slate-400 group-hover:bg-slate-200'}`}>
                          <FiChevronDown />
                        </div>
                      </div>
                    </td>
                  </motion.tr>

                  {/* EXPANDED ROW DETAILS */}
                  <AnimatePresence>
                    {isExpanded && (
                      <tr>
                        <td colSpan="4" className="p-0 border-none">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden bg-slate-50/50"
                          >
                            <div className="p-6 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">

                              {/* Cột 1: Thông tin chi tiết */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                  <FiInfo /> Chi tiết yêu cầu
                                </h4>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                  <p className="text-sm text-slate-600 leading-relaxed italic">
                                    "{c.description}"
                                  </p>
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 border border-slate-200">
                                      Giới tính GV: {c.genderPreference === 'male' ? 'Nam' : (c.genderPreference === 'female' ? 'Nữ' : 'Tùy chọn')}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 border border-slate-200">
                                      Hình thức: {c.teachingMethod === 'online' ? 'Học Online' : 'Học Offline'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Cột 2: Thông tin liên hệ & Địa điểm */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                  <FiUser /> Phụ huynh & Địa điểm
                                </h4>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                                  <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
                                    <UserAvatar src={c.user?.avatar} name={c.user?.fullName} size="sm" />
                                    <div>
                                      <div className="text-sm font-bold text-slate-800">{c.user?.fullName}</div>
                                      <div className="text-xs text-slate-400">ID: {c.user?._id?.slice(-6).toUpperCase()}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 text-sm text-slate-600">
                                    <FiMapPin className="mt-1 text-red-500 flex-shrink-0" />
                                    <span>{c.address}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Cột 3: Actions Panel */}
                              <div className="space-y-4 flex flex-col">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                  <FiCheckCircle /> Thao tác quản trị
                                </h4>
                                <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center gap-3">
                                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                                    Tìm & Gán Gia sư
                                  </button>
                                  <div className="flex gap-2">
                                    <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                                      Sửa yêu cầu
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); onDelete(c._id); }}
                                      className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                                    >
                                      Xóa lớp
                                    </button>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesTable;