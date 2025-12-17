import { FiCheckCircle } from 'react-icons/fi';
import TableHeader from './TableHeader';

const PendingTutorsTable = ({ tutors, onApprove }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Duyệt Gia sư ({tutors.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Họ Tên', 'Môn dạy', 'Khu vực', 'Hành động']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {tutors.length === 0 ? (
              <tr><td colSpan="4" className="p-6 text-center text-gray-500">Không có hồ sơ nào chờ duyệt.</td></tr>
            ) : tutors.map(t => (
              <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{t.user?.fullName}</td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {t.subjects.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-600 border border-blue-100">{s}</span>)}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{t.area}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => onApprove(t._id)} className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    <FiCheckCircle /> Duyệt
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

export default PendingTutorsTable;