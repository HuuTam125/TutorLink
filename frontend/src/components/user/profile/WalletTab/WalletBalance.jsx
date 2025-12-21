import React from 'react';
import { FaWallet, FaSimCard } from 'react-icons/fa';

const WalletBalance = ({ balance }) => {
  return (
    <div className="relative w-full md:max-w-md h-56 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-2xl shadow-blue-900/40 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-8">
        <FaSimCard className="text-4xl text-yellow-500/80 rotate-90" />
        <FaWallet className="text-2xl text-blue-300/50" />
      </div>

      <div className="space-y-1">
        <p className="text-blue-200 text-xs font-medium tracking-wider uppercase">Số dư khả dụng</p>
        <h2 className="text-3xl font-bold tracking-tight">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance)}
        </h2>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div>
          <p className="text-[10px] text-blue-300 uppercase tracking-widest mb-1">Chủ thẻ</p>
          <p className="font-semibold tracking-wide">MEMBER</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-blue-300 uppercase tracking-widest mb-1">Trạng thái</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;