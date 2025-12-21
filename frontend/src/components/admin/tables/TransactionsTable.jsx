import { FiArrowUpCircle, FiArrowDownCircle, FiRefreshCw } from 'react-icons/fi';

const TransactionsTable = ({ transactions }) => {
  // Helper: Định dạng kiểu giao dịch
  const getTypeStyle = (type) => {
    switch (type) {
      case 'deposit':
        return {
          label: 'Nạp tiền',
          color: 'text-green-600 bg-green-100',
          icon: <FiArrowUpCircle className="mr-1" />,
          sign: '+'
        };
      case 'payment':
        return {
          label: 'Thanh toán phí',
          color: 'text-red-600 bg-red-100',
          icon: <FiArrowDownCircle className="mr-1" />,
          sign: '-'
        };
      case 'refund':
        return {
          label: 'Hoàn tiền',
          color: 'text-blue-600 bg-blue-100',
          icon: <FiRefreshCw className="mr-1" />,
          sign: '+'
        };
      default:
        return { label: type, color: 'text-gray-600', icon: null, sign: '' };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h2 className="font-semibold text-gray-700">Lịch sử Giao dịch Hệ thống</h2>
        <div className="text-sm text-gray-500">
          Tổng số: <span className="font-bold text-gray-800">{transactions.length}</span> giao dịch
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã GD / Thời gian</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người thực hiện</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại giao dịch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số dư sau GD</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((tx) => {
                const style = getTypeStyle(tx.type);
                return (
                  <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                    {/* Cột 1: ID & Thời gian */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-400 uppercase mb-1">#{tx._id.slice(-6)}</div>
                      <div className="text-sm text-gray-900">
                        {new Date(tx.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(tx.createdAt).toLocaleTimeString('vi-VN')}
                      </div>
                    </td>

                    {/* Cột 2: User */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{tx.user?.fullName || 'Unknown User'}</div>
                      <div className="text-xs text-gray-500">{tx.user?.email}</div>
                    </td>

                    {/* Cột 3: Loại GD */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${style.color}`}>
                        {style.icon} {style.label}
                      </span>
                    </td>

                    {/* Cột 4: Số tiền */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-bold ${tx.type === 'payment' ? 'text-red-600' : 'text-green-600'}`}>
                        {style.sign} {tx.amount?.toLocaleString('vi-VN')} đ
                      </div>
                    </td>

                    {/* Cột 5: Nội dung */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs break-words" title={tx.description}>
                        {tx.description}
                      </div>
                    </td>

                    {/* Cột 6: Số dư ví */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {tx.balanceAfter?.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                  Chưa có giao dịch nào phát sinh.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;