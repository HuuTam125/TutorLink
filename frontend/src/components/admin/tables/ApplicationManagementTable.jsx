import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import TableHeader from './TableHeader';

const ApplicationManagementTable = ({ applications, onApprove, onReject }) => {

  // Helper chọn màu badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Đã duyệt</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Từ chối</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">Chờ duyệt</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Quản lý Đơn nhận lớp ({applications.length})</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader headers={['Gia sư', 'Lớp đăng ký', 'Lời nhắn', 'Trạng thái', 'Hành động']} />
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500 italic">Chưa có đơn đăng ký nào.</td></tr>
            ) : applications.map(app => (
              <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                {/* Cột 1: Thông tin Gia sư */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{app.tutor?.fullName || "Ẩn danh"}</span>
                    <span className="text-xs text-gray-500">{app.tutor?.email}</span>
                  </div>
                </td>

                {/* Cột 2: Thông tin Lớp học */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-medium text-blue-600">
                      {app.classRequest?.subject} <span className="text-gray-500 font-normal">- {app.classRequest?.grade}</span>
                    </span>
                    <span className="text-xs text-gray-400">ID: {app.classRequest?._id?.slice(-6)}...</span>
                  </div>
                </td>

                {/* Cột 3: Lời nhắn (giới hạn độ dài) */}
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-xs truncate" title={app.message}>
                    {app.message || "Không có lời nhắn"}
                  </p>
                </td>

                {/* Cột 4: Trạng thái */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(app.status)}
                </td>

                {/* Cột 5: Hành động */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {app.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onApprove(app._id)}
                        className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                        title="Duyệt đơn"
                      >
                        <FiCheckCircle /> Duyệt
                      </button>
                      <button
                        onClick={() => onReject(app._id)}
                        className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                        title="Từ chối"
                      >
                        <FiXCircle /> Từ chối
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic flex items-center gap-1">
                      <FiClock /> Đã xử lý
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationManagementTable;