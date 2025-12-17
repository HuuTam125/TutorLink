import { useNavigate } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaClock,
  FaBookOpen,
  FaUser,
  FaCalendarAlt,
  FaMars,
  FaVenus,
  FaCheckCircle
} from 'react-icons/fa';

const RequestCard = ({ request }) => {
  const navigate = useNavigate()
  // Format tiền tệ
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(request.budget || 0);

  // Giả lập thêm dữ liệu nếu object request thiếu (để demo hiển thị đẹp)
  const isOnline = request.method === 'online';
  const genderPref = request.gender || 'Bất kỳ'; // Nam/Nữ/Bất kỳ
  const sessionsPerWeek = request.sessions || 3;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-0 overflow-hidden">

      {/* 1. Decorative Accent Bar (Dải màu trang trí bên trái) */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600"></div>

      <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6 ml-1.5"> {/* ml-1.5 để tránh đè lên dải màu */}

        {/* --- CỘT TRÁI: NỘI DUNG CHÍNH --- */}
        <div className="flex-1 space-y-4">

          {/* Header: User Info & Time */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {/* Avatar Placeholder */}
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                <FaUser />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-800 text-sm">{request.user?.fullName || "Phụ huynh ẩn danh"}</span>
                  {/* Verified Icon (Giả lập) */}
                  <FaCheckCircle className="text-blue-500 text-xs" title="Đã xác thực sđt" />
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <FaClock className="text-[10px]" /> 2 ngày trước
                </div>
              </div>
            </div>

            {/* Badge Trạng thái (Ví dụ: Mới) */}
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              Đang tìm kiếm
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                Tìm gia sư {request.subject}
              </h3>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                Lớp {request.grade}
              </span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {request.description || "Gia đình đang tìm gia sư có kinh nghiệm, kiên nhẫn. Ưu tiên sinh viên sư phạm hoặc giáo viên đã đi làm..."}
            </p>
          </div>

          {/* Info Grid (Các thông tin chi tiết dạng thẻ nhỏ) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Địa điểm */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <FaMapMarkerAlt className="text-red-500 shrink-0" />
              <span className="truncate">{request.address || "Hà Nội"}</span>
            </div>

            {/* Số buổi */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <FaCalendarAlt className="text-blue-500 shrink-0" />
              <span className="truncate">{sessionsPerWeek} buổi/tuần</span>
            </div>

            {/* Giới tính GV */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              {genderPref === 'Nữ' ? <FaVenus className="text-pink-500 shrink-0" /> : <FaMars className="text-blue-500 shrink-0" />}
              <span className="truncate">YC: {genderPref}</span>
            </div>

            {/* Hình thức */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-500'}`}></div>
              <span className="truncate">{isOnline ? 'Online' : 'Tại nhà'}</span>
            </div>
          </div>
        </div>

        {/* --- CỘT PHẢI: LƯƠNG & ACTION --- */}
        {/* Dùng border-dashed tạo cảm giác như phiếu coupon/ticket */}
        <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-dashed border-gray-200 pt-4 md:pt-0 md:pl-6 min-w-[200px]">

          <div className="text-right md:text-right flex flex-row md:flex-col justify-between items-center md:items-end mb-4 md:mb-0">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Ngân sách dự kiến</p>
              <div className="text-xl md:text-2xl font-extrabold text-blue-600">
                {formattedPrice} <span className="text-sm font-medium text-gray-500">đ/buổi</span>
              </div>
            </div>
            {/* Mobile only: Nút share hoặc save nhỏ (Optional) */}
          </div>

          <div className="space-y-2.5 w-full mt-auto">
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 flex items-center justify-center gap-2">
              <FaBookOpen className="text-xs" /> Nhận lớp ngay
            </button>
            <button
              onClick={() => navigate(`/classes/${request._id}`)}
              className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all">
              Xem chi tiết
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RequestCard;