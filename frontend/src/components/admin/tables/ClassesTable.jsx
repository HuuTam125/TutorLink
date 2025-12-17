import { FiTrash2 } from 'react-icons/fi';
import TableHeader from './TableHeader';

const ClassesTable = ({ classes, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Quản lý Lớp học</h2></div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Môn học', 'Lớp', 'Người đăng', 'Trạng thái', 'Thao tác']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map(r => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{r.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{r.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{r.user?.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${r.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{r.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onDelete(r._id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 hover:underline"
                  >
                    <FiTrash2 /> Xóa
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

export default ClassesTable;