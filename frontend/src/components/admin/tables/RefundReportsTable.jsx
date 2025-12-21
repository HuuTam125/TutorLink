import React from 'react';
import { FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';

const RefundReportsTable = ({ reports, onRefund, onDismiss }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-red-100 bg-red-50 flex justify-between items-center">
        <h2 className="font-semibold text-red-700 flex items-center gap-2">
          <FiAlertCircle /> Khiếu nại chờ xử lý
        </h2>
        <span className="bg-red-200 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {reports.length} yêu cầu
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người báo cáo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp gặp sự cố</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền hoàn (15%)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length > 0 ? (
              reports.map((app) => (
                <tr key={app._id} className="hover:bg-red-50 transition-colors">
                  {/* Cột 1: Thông tin Gia sư */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.tutor?.hoTen}</div>
                    <div className="text-xs text-gray-500">{app.tutor?.email}</div>
                    <div className="text-xs text-gray-500">{app.tutor?.phoneNumber}</div>
                  </td>

                  {/* Cột 2: Thông tin Lớp */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{app.classRequest?.subject}</div>
                    <div className="text-xs text-gray-500">ID: {app.classRequest?._id}</div>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mt-1">
                      Đã đóng phí
                    </span>
                  </td>

                  {/* Cột 3: Lý do */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded border border-red-100 max-w-xs break-words">
                      "{app.reportReason}"
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(app.updatedAt).toLocaleDateString('vi-VN')}
                    </div>
                  </td>

                  {/* Cột 4: Số tiền */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-gray-800">
                      {(app.classRequest?.budget * 0.15).toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-xs text-gray-500">Học phí gốc: {app.classRequest?.budget?.toLocaleString()} đ</div>
                  </td>

                  {/* Cột 5: Hành động */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onDismiss(app._id)}
                        className="text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md flex items-center gap-1 transition-colors"
                        title="Từ chối hoàn tiền"
                      >
                        <FiX /> Từ chối
                      </button>
                      <button
                        onClick={() => onRefund(app._id)}
                        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow-sm flex items-center gap-1 transition-colors"
                        title="Chấp nhận hoàn tiền vào ví Gia sư"
                      >
                        <FiCheck /> Hoàn tiền
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                  <FiCheck className="inline-block text-green-500 text-4xl mb-2" /><br />
                  Không có khiếu nại nào cần xử lý.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundReportsTable;