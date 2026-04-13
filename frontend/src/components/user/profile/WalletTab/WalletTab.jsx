import { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axiosClient from '../../../../api/axiosClient';
import { FaQrcode, FaSync, FaTimes, FaMoneyBill, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import WalletBalance from './WalletBalance';
import TransactionHistory from './TransactionHistory';

const WalletTab = () => {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  // State quản lý luồng thanh toán
  const [qrData, setQrData] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const intervalRef = useRef(null);
  const quickAmounts = [50000, 100000, 200000, 500000];

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/wallet/history');
      setBalance(res.data.balance);
      setTransactions(res.data.history);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchWallet(); }, []);

  // --- HÀM BẮN PHÁO GIẤY ---
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  // --- LOGIC QR CODE & POLLING ---
  const handleCreateQR = async () => {
    const amount = Number(depositAmount);
    if (!amount || amount < 10000) return alert("Vui lòng nhập tối thiểu 10.000đ");

    try {
      const res = await axiosClient.post('/wallet/create-payment-link', { amount });
      let mobileUrl = res.data.paymentUrl;
      const MY_IP_ADDRESS = "172.30.60.198";

      if (mobileUrl.includes("localhost")) {
        mobileUrl = mobileUrl.replace("localhost", MY_IP_ADDRESS);
      }

      setQrData({ ...res.data, paymentUrl: mobileUrl });
      setIsWaiting(true);
      setIsSuccess(false);
      startPolling(res.data.transactionId);

    } catch (error) {
      alert("Lỗi tạo mã QR. Vui lòng thử lại.");
    }
  };

  const startPolling = (txId) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(async () => {
      try {
        const res = await axiosClient.get(`/wallet/check-status/${txId}`);

        if (res.data.status === 'completed') {
          clearInterval(intervalRef.current);
          setIsWaiting(false);
          setQrData(null);
          setIsSuccess(true);
          setDepositAmount('');
          fetchWallet();
          triggerConfetti();
          setTimeout(() => { setIsSuccess(false); }, 5000);
        }
      } catch (error) { console.error("Polling error", error); }
    }, 2000);
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleCancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsWaiting(false);
    setQrData(null);
  };

  return (
    // Container chính: Nền trắng, shadow Navy nhạt
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_4px_30px_-10px_rgba(25,51,102,0.05)] border border-[#193366]/5 animate-fade-in-up min-h-[600px] font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[#193366] flex items-center gap-2">
            <span className="p-2 bg-[#f9f9f6] text-[#193366] rounded-lg"><FaMoneyBill /></span>
            Ví của tôi
          </h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Quản lý số dư và lịch sử giao dịch an toàn.</p>
        </div>
        <button onClick={fetchWallet} className="p-2 text-gray-400 hover:text-[#193366] transition-colors" title="Làm mới">
          <FaSync className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* TOP SECTION */}
      <div className="flex flex-col xl:flex-row gap-10">

        {/* LEFT: Virtual Card */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <WalletBalance balance={balance} />
          <p className="text-xs text-gray-400 text-center px-4 font-medium italic">
            *Số dư này dùng để thanh toán phí nhận lớp.
          </p>
        </div>

        {/* RIGHT: Deposit Form Area */}
        <div className="flex-1 bg-[#f9f9f6] rounded-2xl p-6 md:p-8 border border-[#193366]/5 relative overflow-hidden">
          <AnimatePresence mode="wait">

            {/* VIEW 1: FORM NHẬP TIỀN */}
            {!isWaiting && !isSuccess && (
              <motion.div
                key="input-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col justify-center"
              >
                <h3 className="text-lg font-bold text-[#193366] mb-6 flex items-center gap-2">
                  <FaQrcode className="text-[#193366]/70" /> Nạp tiền nhanh qua QR
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {quickAmounts.map(amt => (
                    <button
                      key={amt}
                      onClick={() => setDepositAmount(amt)}
                      className={`py-2 px-3 rounded-xl text-sm font-bold border transition-all 
                        ${Number(depositAmount) === amt
                          ? 'bg-[#193366] text-white border-[#193366] shadow-md shadow-[#193366]/20'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-[#193366]/30 hover:text-[#193366]'}
                      `}
                    >
                      {amt / 1000}k
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Nhập số tiền..."
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none font-bold text-[#193366] placeholder:text-gray-400 placeholder:font-normal bg-white"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">VNĐ</span>
                  </div>
                  <button
                    onClick={handleCreateQR}
                    disabled={!depositAmount}
                    className="px-6 py-3 bg-[#193366] text-white font-bold rounded-xl hover:bg-[#193366]/90 shadow-lg shadow-[#193366]/20 disabled:opacity-50 transition-all"
                  >
                    Tạo QR
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: QR CODE SCANNING */}
            {isWaiting && (
              <motion.div
                key="qr-scan"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center h-full flex flex-col items-center justify-center"
              >
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4 inline-block">
                  <QRCodeCanvas value={qrData?.paymentUrl} size={180} level={"H"} />
                </div>
                <h3 className="text-xl font-bold text-[#193366] mb-1">Quét mã để thanh toán</h3>
                <div className="bg-[#193366]/5 px-6 py-2 rounded-xl mb-4 mt-2 border border-[#193366]/10">
                  <p className="text-2xl font-extrabold text-[#193366]">{Number(depositAmount).toLocaleString()} đ</p>
                </div>
                <button onClick={handleCancel} className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-bold text-sm transition-colors">
                  <FaTimes /> Hủy giao dịch
                </button>
              </motion.div>
            )}

            {/* VIEW 3: SUCCESS STATE */}
            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 bg-[#E6F4EA] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-[#E6F4EA]">
                  <FaCheckCircle className="text-5xl text-[#137333]" />
                </div>

                <h3 className="text-2xl font-extrabold text-[#193366] mb-2">Nạp tiền thành công!</h3>
                <p className="text-gray-500 mb-6 font-medium">Tài khoản của bạn đã được cộng thêm tiền.</p>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#193366] text-white font-bold rounded-xl hover:bg-[#193366]/90 transition-all shadow-lg"
                >
                  <FaArrowLeft /> Đóng
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default WalletTab;