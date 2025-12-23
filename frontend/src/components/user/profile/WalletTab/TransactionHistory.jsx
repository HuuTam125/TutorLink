import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaUndo, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionHistory = ({ transactions }) => {
  const [filter, setFilter] = useState('all'); // all, deposit, payment, refund

  const filteredData = transactions.filter(t => filter === 'all' || t.type === filter);

  // Icon & Style Helper
  const getTxStyle = (type) => {
    switch (type) {
      case 'deposit': return { icon: FaArrowDown, color: 'text-[#137333]', bg: 'bg-[#E6F4EA]', sign: '+' };
      case 'payment': return { icon: FaArrowUp, color: 'text-[#C5221F]', bg: 'bg-[#FCE8E6]', sign: '-' };
      case 'refund': return { icon: FaUndo, color: 'text-[#193366]', bg: 'bg-[#E8F0FE]', sign: '+' };
      default: return { icon: FaSearch, color: 'text-gray-500', bg: 'bg-[#f9f9f6]', sign: '' };
    }
  };

  return (
    <div className="mt-10 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg font-extrabold text-[#193366]">Lịch sử giao dịch</h3>

        {/* Filter Tabs (Navy Style) */}
        <div className="flex bg-[#f9f9f6] p-1 rounded-xl border border-[#193366]/5">
          {['all', 'deposit', 'payment'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all
                ${filter === f
                  ? 'bg-white text-[#193366] shadow-sm text-shadow-sm'
                  : 'text-gray-400 hover:text-[#193366]'}
              `}
            >
              {f === 'all' ? 'Tất cả' : f === 'deposit' ? 'Nạp tiền' : 'Chi tiêu'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#193366]/5 overflow-hidden shadow-sm">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-[#f9f9f6] rounded-full flex items-center justify-center text-gray-300 mb-3">
              <FaSearch size={24} />
            </div>
            <p className="text-gray-400 font-medium text-sm">Không có giao dịch nào phù hợp.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f9f9f6] text-[#193366]/70 font-bold border-b border-gray-100 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Giao dịch</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4 text-right">Số tiền</th>
                <th className="px-6 py-4 text-right hidden md:table-cell">Số dư cuối</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredData.map((tx, idx) => {
                  const style = getTxStyle(tx.type);
                  return (
                    <motion.tr
                      key={tx._id || idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-[#f9f9f6]/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-full ${style.bg} ${style.color}`}>
                            <style.icon size={12} />
                          </div>
                          <div>
                            <p className="font-bold text-[#193366] line-clamp-1 text-sm">{tx.description}</p>
                            <p className="text-[10px] text-gray-400 capitalize font-medium mt-0.5">
                              {tx.type === 'deposit' ? 'Nạp tiền vào ví' : tx.type === 'payment' ? 'Thanh toán phí' : 'Hoàn tiền'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium text-xs">
                        {new Date(tx.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className={`px-6 py-4 text-right font-extrabold ${style.color}`}>
                        {style.sign} {tx.amount.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 text-right hidden md:table-cell font-mono text-gray-500 font-medium text-xs">
                        {tx.balanceAfter ? tx.balanceAfter.toLocaleString() + 'đ' : '-'}
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