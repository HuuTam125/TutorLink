import { FiTrash2 } from 'react-icons/fi';
import TableHeader from './TableHeader';

const TutorsTable = ({ users, onSelectTutor, onDelete }) => {
  const tutorList = users.filter(u => u.role === 'tutor');

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Danh sách Gia sư ({tutorList.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Gia sư', 'Liên hệ', 'Trạng thái', 'Hành động']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {tutorList.map(t => (
              <tr
                key={t._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectTutor(t._id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      {t.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t.fullName}</div>
                      <div className="text-xs text-gray-500">Khu vực: {t.address || 'Chưa cập nhật'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{t.email}</div>
                  <div className="text-xs text-gray-500">{t.phone || '---'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Gia sư
                  </span>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onDelete(t._id, t.fullName)}
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

export default TutorsTable;