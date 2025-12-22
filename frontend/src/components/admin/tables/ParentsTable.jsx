import { useState, useMemo } from 'react';
import { FiTrash2, FiSearch, FiFilter, FiMoreHorizontal, FiPhone, FiMail, FiBookOpen, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { UserAvatar, StatusBadge } from './SharedComponents'; // Import lại component dùng chung

// --- Helper: Giả lập dữ liệu còn thiếu (Mock enrichment) ---
const enrichStudentData = (user) => {
  // Random số lớp đang học (0 - 3)
  const activeClasses = Math.floor(Math.random() * 4);
  // Random tổng chi tiêu (triệu VND)
  const totalSpend = (Math.floor(Math.random() * 50) + 1) * 500000;
  // Random trạng thái
  const isActive = Math.random() > 0.1;

  return {
    ...user,
    phone: user.phone || `09${Math.floor(Math.random() * 100000000)}`, // Fallback số đt
    stats: {
      activeClasses,
      totalSpend,
    },
    status: user.isBlocked ? 'blocked' : (isActive ? 'active' : 'inactive')
  };
};

const ParentsTable = ({ users, onDelete, onSelectUser }) => {
  // Lọc và làm giàu dữ liệu
  const parentList = useMemo(() => {
    return users
      .filter(u => u.role === 'student')
      .map(u => enrichStudentData(u));
  }, [users]);

  // Format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">

      {/* --- HEADER TOOLBAR --- */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Quản lý Phụ huynh / Học viên</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold text-xs">
              {parentList.length}
            </span>
            <span>tài khoản học viên trong hệ thống</span>
          </div>
        </div>

        {/* Search & Action */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Tìm theo tên, email..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full sm:w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" title="Bộ lọc">
            <FiFilter />
          </button>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Học viên</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Liên hệ</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hoạt động</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {parentList.map((u, index) => (
              <motion.tr
                key={u._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                onClick={() => onSelectUser && onSelectUser(u._id)}
              >
                {/* 1. INFO COL: Avatar + Name + ID */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <UserAvatar src={u.avatar} name={u.fullName} size="md" />
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {u.fullName}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {u._id.slice(-8).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. CONTACT COL: Email + Phone */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <FiMail className="text-slate-400 text-xs" />
                      {u.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FiPhone className="text-slate-400 text-xs" />
                      {u.phone}
                    </div>
                  </div>
                </td>

                {/* 3. ACTIVITY COL: Classes + Spend */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    {/* Badge số lớp */}
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border
                         ${u.stats.activeClasses > 0
                          ? 'bg-blue-50 text-blue-600 border-blue-100'
                          : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <FiBookOpen size={10} />
                        {u.stats.activeClasses} lớp đã đăng
                      </span>
                    </div>
                  </div>
                </td>

                {/* 4. STATUS COL */}
                <td className="px-6 py-4">
                  <StatusBadge
                    status={u.status}
                    text={u.status === 'active' ? 'Hoạt động' : (u.status === 'blocked' ? 'Đã chặn' : 'Vắng mặt')}
                  />
                  <div className="text-[10px] text-slate-400 mt-1">
                    Tham gia: {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : '---'}
                  </div>
                </td>

                {/* 5. ACTION COL */}
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Nút phụ: Xem chi tiết / Edit */}
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <FiMoreHorizontal size={18} />
                    </button>

                    {/* Nút chính: Xóa */}
                    <button
                      onClick={() => onDelete(u._id, u.fullName)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Xóa tài khoản"
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

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500 flex justify-between items-center">
        <span>Hiển thị 1-{Math.min(10, parentList.length)} trên tổng số {parentList.length}</span>
        {/* Mock Pagination */}
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white disabled:opacity-50">Trước</button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white bg-white font-medium text-blue-600">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">2</button>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">Tiếp</button>
        </div>
      </div>

    </div>
  );
};

export default ParentsTable;