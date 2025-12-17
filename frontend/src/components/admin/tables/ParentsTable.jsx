
import { FiTrash2 } from 'react-icons/fi';
import TableHeader from './TableHeader';

const ParentsTable = ({ users, onDelete }) => {
  const parentList = users.filter(u => u.role === 'student');

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Phụ huynh ({parentList.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Họ tên', 'Email', 'Ngày tham gia', 'Hành động']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {parentList.map(u => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                      {u.fullName?.charAt(0).toUpperCase()}
                    </div>
                    {u.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : '---'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onDelete(u._id, u.fullName)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full"
                  >
                    <FiTrash2 size={18} />
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

export default ParentsTable;