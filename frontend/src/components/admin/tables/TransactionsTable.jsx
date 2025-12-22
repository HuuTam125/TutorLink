import React, { useState, useMemo } from 'react';
import {
  FiArrowUpCircle, FiArrowDownCircle, FiRefreshCw,
  FiDollarSign, FiTrendingUp, FiFilter, FiDownload, FiSearch, FiCalendar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from './SharedComponents'; // Tận dụng lại component cũ

const TransactionsTable = ({ transactions = [] }) => {
  const [activeTab, setActiveTab] = useState('all');

  // --- 1. TÍNH TOÁN CHỈ SỐ (STATS) ---
  const stats = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'payment') {
        acc.revenue += curr.amount;
        acc.countPayment += 1;
      } else if (curr.type === 'deposit') {
        acc.deposit += curr.amount;
        acc.countDeposit += 1;
      } else if (curr.type === 'refund') {
        acc.refund += curr.amount;
        acc.countRefund += 1;
      }
      return acc;
    }, { revenue: 0, deposit: 0, refund: 0, countPayment: 0, countDeposit: 0, countRefund: 0 });
  }, [transactions]);

  // --- 2. LỌC DỮ LIỆU THEO TAB ---
  const filteredTransactions = useMemo(() => {
    if (activeTab === 'all') return transactions;
    return transactions.filter(t => t.type === activeTab);
  }, [transactions, activeTab]);

  // Helper: Format tiền tệ
  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount);

  // Helper: Cấu hình hiển thị theo loại giao dịch
  const getTypeConfig = (type) => {
    const configs = {
      deposit: {
        label: 'Nạp tiền',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: FiArrowUpCircle,
        sign: '+'
      },
      payment: {
        label: 'Thanh toán',
        className: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        icon: FiArrowDownCircle,
        sign: '-'
      },
      refund: {
        label: 'Hoàn tiền',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: FiRefreshCw,
        sign: '+'
      }
    };
    return configs[type] || { label: type, className: 'bg-gray-50 text-gray-600', icon: FiFilter, sign: '' };
  };

  return (
    <div className="space-y-8 h-full flex flex-col">

      {/* --- PHẦN 1: THẺ TỔNG HỢP (SUMMARY CARDS - MODERN STYLE) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-sm font-medium text-slate-500">Doanh thu thực tế</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{formatCurrency(stats.revenue)} <span className="text-lg text-slate-400 font-normal">đ</span></h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <FiDollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium z-10">
            <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
              <FiTrendingUp /> +12.5%
            </span>
            <span className="text-slate-400">so với tháng trước</span>
          </div>
        </motion.div>

        {/* Card Deposit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-sm font-medium text-slate-500">Tổng tiền nạp vào</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{formatCurrency(stats.deposit)} <span className="text-lg text-slate-400 font-normal">đ</span></h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <FiArrowUpCircle size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 z-10">
            <span className="font-bold text-slate-700">{stats.countDeposit}</span> giao dịch nạp tiền
          </div>
        </motion.div>

        {/* Card Refund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-sm font-medium text-slate-500">Đã hoàn tiền</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{formatCurrency(stats.refund)} <span className="text-lg text-slate-400 font-normal">đ</span></h3>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <FiRefreshCw size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 z-10">
            Tỷ lệ hoàn: <span className="font-bold text-amber-600">{stats.revenue > 0 ? ((stats.refund / stats.revenue) * 100).toFixed(1) : 0}%</span>
          </div>
        </motion.div>
      </div>

      {/* --- PHẦN 2: BẢNG GIAO DỊCH (ADVANCED TABLE) --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1">

        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs Filter */}
          <div className="flex p-1 bg-slate-100/80 rounded-xl">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'deposit', label: 'Nạp tiền' },
              { id: 'payment', label: 'Thanh toán' },
              { id: 'refund', label: 'Hoàn tiền' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group hidden sm:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text" placeholder="Tìm mã GD..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-40"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
              <FiCalendar /> <span className="hidden sm:inline">Tháng này</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 shadow-lg shadow-slate-900/10">
              <FiDownload /> <span className="hidden sm:inline">Xuất Excel</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Mã GD / Thời gian</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Loại GD</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nội dung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <AnimatePresence mode='popLayout'>
                {filteredTransactions.map((tx, index) => {
                  const config = getTypeConfig(tx.type);
                  const Icon = config.icon;

                  return (
                    <motion.tr
                      key={tx._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-slate-50/80 transition-colors"
                    >
                      {/* COL 1: Time & ID */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-100 text-slate-400">
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-700 font-mono">#{tx._id.slice(-8).toUpperCase()}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {new Date(tx.createdAt).toLocaleDateString('vi-VN')} • {new Date(tx.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* COL 2: User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* Dùng component UserAvatar đã tạo ở phần trước */}
                          <UserAvatar src={tx.user?.avatar} name={tx.user?.fullName} size="sm" />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{tx.user?.fullName || 'Unknown'}</span>
                            <span className="text-[10px] text-slate-400">{tx.user?.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* COL 3: Type Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${config.className}`}>
                          {config.label}
                        </span>
                      </td>

                      {/* COL 4: Amount */}
                      <td className="px-6 py-4 text-right">
                        <div className={`text-sm font-bold ${tx.type === 'deposit' ? 'text-emerald-600' :
                            tx.type === 'payment' ? 'text-indigo-600' : 'text-amber-600'
                          }`}>
                          {config.sign} {formatCurrency(tx.amount)}
                        </div>
                        {tx.balanceAfter && (
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Số dư: {formatCurrency(tx.balanceAfter)}
                          </div>
                        )}
                      </td>

                      {/* COL 5: Description */}
                      <td className="px-6 py-4">
                        <p className="text-xs text-slate-600 max-w-[200px] truncate" title={tx.description}>
                          {tx.description}
                        </p>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <FiFilter size={32} className="opacity-20" />
                      <p className="text-sm">Không tìm thấy giao dịch nào.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 flex justify-center">
          <button className="text-xs text-slate-500 hover:text-blue-600 font-medium">Xem tất cả lịch sử</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;