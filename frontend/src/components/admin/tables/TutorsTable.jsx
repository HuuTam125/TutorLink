import { FiTrash2, FiEye, FiMoreVertical, FiFilter, FiSearch } from 'react-icons/fi';
import { UserAvatar, StatusBadge, RatingStars } from './SharedComponents'; // Import component ở trên
import { motion } from 'framer-motion';

const TutorsTable = ({ users, onSelectTutor, onDelete }) => {
  const tutorList = users.filter(u => u.role === 'tutor');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* --- HEADER TOOLBAR --- */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Danh sách Gia sư</h2>
          <p className="text-sm text-slate-500">Quản lý hồ sơ và hoạt động</p>
        </div>

        {/* Actions giả lập: Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full sm:w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
            <FiFilter />
          </button>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              {['Thông tin Gia sư', 'Chuyên môn & Đánh giá', 'Liên hệ', 'Trạng thái', ''].map((header, i) => (
                <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {tutorList.map((t, index) => (
              <motion.tr
                key={t._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                onClick={() => onSelectTutor(t._id)}
              >
                {/* 1. INFO COL */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {/* Giả sử API trả về t.avatar */}
                    <UserAvatar src={t.avatar} name={t.fullName} size="lg" />
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {t.fullName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 max-w-[150px] truncate">
                        ID: {t._id.slice(-6).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. EXPERTISE COL */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {/* Giả sử API trả về jobTitle hoặc subjects */}
                    <span className="text-sm font-medium text-slate-700">
                      {t.jobTitle || 'Gia sư'}
                    </span>
                    <RatingStars rating={t.rating || 4.8} />
                    <span className="text-xs text-slate-400">
                      {t.totalClasses || 0} lớp đã dạy
                    </span>
                  </div>
                </td>

                {/* 3. CONTACT COL */}
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-700">{t.email}</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    {t.phone || 'Chưa cập nhật'}
                  </div>
                </td>

                {/* 4. STATUS COL */}
                <td className="px-6 py-4">
                  <StatusBadge
                    status={t.isBlocked ? 'rejected' : 'active'}
                    text={t.isBlocked ? 'Đã khóa' : 'Hoạt động'}
                  />
                </td>

                {/* 5. ACTION COL */}
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onSelectTutor(t._id)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Xem chi tiết"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(t._id, t.fullName)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Xóa gia sư"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER PAGINATION (Ví dụ) */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500 flex justify-between items-center">
        <span>Hiển thị {tutorList.length} kết quả</span>
        <div className="flex gap-2">
          <button className="hover:text-blue-600">Trước</button>
          <button className="hover:text-blue-600">Tiếp</button>
        </div>
      </div>
    </div>
  );
};

export default TutorsTable;