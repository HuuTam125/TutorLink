import { useEffect, useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axiosClient from '../../../../api/axiosClient';
import { FaQrcode, FaSync, FaTimes, FaMoneyBill, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti'; // IMPORT CONFETTI

import WalletBalance from './WalletBalance';
import TransactionHistory from './TransactionHistory';

const WalletTab = () => {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  // State quản lý luồng thanh toán
  const [qrData, setQrData] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // <--- STATE MỚI: Trạng thái thành công
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
      const MY_IP_ADDRESS = "192.168.1.104";

      if (mobileUrl.includes("localhost")) {
        mobileUrl = mobileUrl.replace("localhost", MY_IP_ADDRESS);
      }

      setQrData({ ...res.data, paymentUrl: mobileUrl });
      setIsWaiting(true);
      setIsSuccess(false); // Reset success state
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

        // --- KHI THÀNH CÔNG ---
        if (res.data.status === 'completed') {
          clearInterval(intervalRef.current);

          // 1. Cập nhật state
          setIsWaiting(false);
          setQrData(null);
          setIsSuccess(true); // Chuyển sang màn hình Success
          setDepositAmount('');

          // 2. Refresh dữ liệu ví
          fetchWallet();

          // 3. Bắn pháo giấy
          triggerConfetti();

          // 4. (Optional) Tự động reset sau 5 giây
          setTimeout(() => {
            setIsSuccess(false);
          }, 5000);
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
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up min-h-[600px]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FaMoneyBill /></span>
            Ví của tôi
          </h2>
          <p className="text-slate-500 mt-1 text-sm">Quản lý số dư và lịch sử giao dịch an toàn.</p>
        </div>
        <button onClick={fetchWallet} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Làm mới">
          <FaSync className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* TOP SECTION */}
      <div className="flex flex-col xl:flex-row gap-10">

        {/* LEFT: Virtual Card */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <WalletBalance balance={balance} />
          <p className="text-xs text-slate-400 text-center px-4">
            *Số dư này dùng để thanh toán phí nhận lớp.
          </p>
        </div>

        {/* RIGHT: Deposit Form Area */}
        <div className="flex-1 bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 relative overflow-hidden">
          <AnimatePresence mode="wait">

            {/* VIEW 1: FORM NHẬP TIỀN (Default) */}
            {!isWaiting && !isSuccess && (
              <motion.div
                key="input-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col justify-center"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FaQrcode className="text-blue-600" /> Nạp tiền nhanh qua QR
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {quickAmounts.map(amt => (
                    <button
                      key={amt}
                      onClick={() => setDepositAmount(amt)}
                      className={`py-2 px-3 rounded-lg text-sm font-bold border transition-all ${Number(depositAmount) === amt ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
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
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-bold text-slate-800"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">VNĐ</span>
                  </div>
                  <button onClick={handleCreateQR} disabled={!depositAmount} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg disabled:opacity-50">Tạo QR</button>
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
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4 inline-block">
                  <QRCodeCanvas value={qrData?.paymentUrl} size={180} level={"H"} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Quét mã để thanh toán</h3>
                <div className="bg-blue-50 px-6 py-2 rounded-xl mb-4 mt-2">
                  <p className="text-2xl font-extrabold text-blue-700">{Number(depositAmount).toLocaleString()} đ</p>
                </div>
                <button onClick={handleCancel} className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-medium text-sm">
                  <FaTimes /> Hủy giao dịch
                </button>
              </motion.div>
            )}

            {/* VIEW 3: SUCCESS STATE (Thay thế alert) */}
            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                  <FaCheckCircle className="text-5xl text-green-500" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Nạp tiền thành công!</h3>
                <p className="text-slate-500 mb-6">Tài khoản của bạn đã được cộng thêm tiền.</p>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
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