import { FiCheckCircle } from 'react-icons/fi';

const PendingTutorsTable = ({ tutors, onApprove }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* HEADER CARD */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          Duyệt Gia sư ({tutors.length})
        </h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* TABLE HEADER */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Môn dạy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khu vực
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="bg-white divide-y divide-gray-200">
            {tutors.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  Không có hồ sơ nào chờ duyệt.
                </td>
              </tr>
            ) : (
              tutors.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* HỌ TÊN */}
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {t.user?.fullName}
                  </td>

                  {/* MÔN DẠY */}
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {t.subjects.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-600 border border-blue-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* KHU VỰC */}
                  <td className="px-6 py-4 text-gray-600">
                    {t.area}
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onApprove(t._id)}
                      className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FiCheckCircle />
                      Duyệt
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingTutorsTable;
