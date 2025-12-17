import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import TableHeader from './TableHeader';

const PendingClassesTable = ({ requests, onApprove, onDelete }) => {
  // Lọc pending ngay tại component cha hoặc ở đây đều được, nhưng tốt nhất nên nhận data đã lọc
  const pendingList = requests.filter(r => r.status === 'pending');

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          Duyệt Lớp mới <span className="text-red-500">({pendingList.length})</span>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Môn / Lớp', 'Học phí / Yêu cầu', 'Phụ huynh', 'Hành động']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingList.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-gray-500 italic">Không có lớp học nào đang chờ duyệt.</td></tr>
            ) : pendingList.map(r => (
              <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800 text-lg">{r.subject}</div>
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs border border-gray-200">
                    {r.grade}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-green-600 font-semibold">
                    {r.price ? new Intl.NumberFormat('vi-VN').format(r.price) + ' đ/buổi' : 'Thỏa thuận'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 max-w-xs truncate" title={r.description}>
                    {r.description || 'Không có mô tả thêm'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">{r.user?.fullName}</div>
                  <div className="text-xs text-gray-500">{r.user?.phone || 'SĐT ẩn'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => onApprove(r._id)}
                    className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
                  >
                    <FiCheckCircle /> Duyệt
                  </button>
                  <button
                    onClick={() => onDelete(r._id)}
                    className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    <FiTrash2 /> Hủy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingClassesTable;