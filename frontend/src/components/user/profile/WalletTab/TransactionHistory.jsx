import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaUndo, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionHistory = ({ transactions }) => {
  const [filter, setFilter] = useState('all'); // all, deposit, payment, refund

  const filteredData = transactions.filter(t => filter === 'all' || t.type === filter);

  // Icon & Style Helper
  const getTxStyle = (type) => {
    switch (type) {
      case 'deposit': return { icon: FaArrowDown, color: 'text-green-600', bg: 'bg-green-100', sign: '+' };
      case 'payment': return { icon: FaArrowUp, color: 'text-red-600', bg: 'bg-red-100', sign: '-' };
      case 'refund': return { icon: FaUndo, color: 'text-blue-600', bg: 'bg-blue-100', sign: '+' };
      default: return { icon: FaSearch, color: 'text-slate-600', bg: 'bg-slate-100', sign: '' };
    }
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-slate-800">Lịch sử giao dịch</h3>

        {/* Filter Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['all', 'deposit', 'payment'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all
                ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {f === 'all' ? 'Tất cả' : f === 'deposit' ? 'Nạp tiền' : 'Chi tiêu'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center text-slate-400">Không có giao dịch nào.</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Giao dịch</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4 text-right">Số tiền</th>
                <th className="px-6 py-4 text-right hidden md:table-cell">Số dư cuối</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredData.map((tx, idx) => {
                  const style = getTxStyle(tx.type);
                  return (
                    <motion.tr
                      key={tx._id || idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${style.bg} ${style.color}`}>
                            <style.icon size={12} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 line-clamp-1">{tx.description}</p>
                            <p className="text-xs text-slate-400 capitalize">{tx.type === 'deposit' ? 'Nạp tiền vào ví' : tx.type === 'payment' ? 'Thanh toán phí' : 'Hoàn tiền'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(tx.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className={`px-6 py-4 text-right font-bold ${style.color}`}>
                        {style.sign} {tx.amount.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 text-right hidden md:table-cell font-mono text-slate-600">
                        {tx.balanceAfter ? tx.balanceAfter.toLocaleString() : '-'}đ
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;