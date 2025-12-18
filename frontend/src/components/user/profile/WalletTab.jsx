import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';

const WalletTab = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // Trạng thái khi đang bấm nút nạp

  // Tải dữ liệu ví khi vào trang
  const fetchWalletData = async () => {
    try {
      const res = await axiosClient.get('wallet/history');
      setBalance(res.data.balance);
      setTransactions(res.data.history);
    } catch (error) {
      console.error("Lỗi tải ví:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  // Xử lý nạp tiền
  const handleDeposit = async (e) => {
    e.preventDefault();

    const amount = Number(depositAmount); //Ép kiểu trước khi gửi API

    // Validation kỹ càng
    if (!depositAmount) return alert("Vui lòng nhập số tiền");
    if (isNaN(depositAmount) || Number(depositAmount) <= 0) return alert("Số tiền phải lớn hơn 0");
    if (Number(depositAmount) < 10000) return alert("Nạp tối thiểu 10.000đ");

    if (!window.confirm(`Bạn muốn nạp ${Number(depositAmount).toLocaleString()}đ vào ví?`)) return;

    setProcessing(true);
    try {
      await axiosClient.post('wallet/deposit', { amount });
      alert("Nạp tiền thành công!");
      setDepositAmount(''); // Reset ô nhập
      fetchWalletData(); // Tải lại lịch sử và số dư mới
    } catch (error) {
      alert("Lỗi nạp tiền: " + (error.response?.data?.message || error.message));
    } finally {
      setProcessing(false);
    }
  };

  // Helper đổi màu loại giao dịch
  const getTypeLabel = (type) => {
    switch (type) {
      case 'deposit': return <span style={{ color: 'green', fontWeight: 'bold' }}>+ Nạp tiền</span>;
      case 'payment': return <span style={{ color: 'red', fontWeight: 'bold' }}>- Thanh toán phí</span>;
      case 'refund': return <span style={{ color: 'blue', fontWeight: 'bold' }}>+ Hoàn tiền</span>;
      default: return type;
    }
  };

  if (loading) return <div>Đang tải dữ liệu ví...</div>;

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', color: '#2563eb' }}>Ví Tài khoản</h2>

      {/* Khu vực Số dư & Nạp tiền */}
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px', padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, color: '#64748b' }}>Số dư hiện tại</p>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>
            {balance.toLocaleString()} đ
          </div>
        </div>

        <div style={{ flex: 1, borderLeft: '1px solid #e2e8f0', paddingLeft: '30px' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Nạp tiền nhanh (Giả lập)</p>
          <form onSubmit={handleDeposit} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              placeholder="Nhập số tiền..."
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
            />
            <button
              type="submit"
              disabled={processing}
              style={{ padding: '8px 20px', background: '#059669', color: 'white', border: 'none', borderRadius: '4px', cursor: processing ? 'not-allowed' : 'pointer' }}
            >
              {processing ? 'Đang xử lý...' : 'Nạp ngay'}
            </button>
          </form>
          <small style={{ color: '#94a3b8' }}>*Hệ thống mô phỏng, tiền sẽ vào ví ngay lập tức.</small>
        </div>
      </div>

      {/* Lịch sử giao dịch */}
      <h3>Lịch sử giao dịch</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Thời gian</th>
            <th style={{ padding: '10px' }}>Loại</th>
            <th style={{ padding: '10px' }}>Số tiền</th>
            <th style={{ padding: '10px' }}>Nội dung</th>
            <th style={{ padding: '10px' }}>Số dư sau GD</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map(tx => (
            <tr key={tx._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{new Date(tx.createdAt).toLocaleString('vi-VN')}</td>
              <td style={{ padding: '10px' }}>{getTypeLabel(tx.type)}</td>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>{tx.amount.toLocaleString()}đ</td>
              <td style={{ padding: '10px' }}>{tx.description}</td>
              <td style={{ padding: '10px', color: '#64748b' }}>{tx.balanceAfter?.toLocaleString()}đ</td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>Chưa có giao dịch nào</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTab;