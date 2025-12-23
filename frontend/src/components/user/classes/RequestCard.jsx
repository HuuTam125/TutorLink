import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../../../api/axiosClient'; // Giữ nguyên import
import { toast } from 'react-toastify';
import {
  FaMapMarkerAlt, FaClock, FaBookOpen, FaUser,
  FaCalendarAlt, FaMars, FaVenus, FaCheckCircle, FaLaptop
} from 'react-icons/fa';

const RequestCard = ({ request }) => {
  const navigate = useNavigate();
  const [applying, setApplying] = useState(false); // trạng thái đang gửi yêu cầu
  const [applied, setApplied] = useState(false);   // trạng thái đã ứng tuyển

  // Format tiền tệ
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(request.budget || request.price || 0);

  // Giả lập dữ liệu hiển thị nếu thiếu trường (UI logic only)
  const isOnline = request.teachingMethod === 'online' || request.method === 'Online';
  const genderPref = request.genderPreference === 'male' ? 'Nam' : request.genderPreference === 'female' ? 'Nữ' : 'Bất kỳ';
  const sessionsPerWeek = request.sessionsPerWeek || 3;

  // ====== HÀM GỬI YÊU CẦU ỨNG TUYỂN (GIỮ NGUYÊN LOGIC CŨ) ======
  const handleApply = async () => {
    if (applied || applying) return;
    setApplying(true);

    try {
      // Gọi API thật của bạn
      const res = await axiosClient.post('/applications', {
        classRequestId: request._id,
        message: 'Tôi quan tâm đến lớp này và có kinh nghiệm phù hợp.',
      });

      toast.success('🎉 Gửi yêu cầu nhận lớp thành công! Vui lòng chờ phụ huynh duyệt.');
      setApplied(true);
    } catch (error) {
      console.error('Lỗi ứng tuyển lớp:', error);
      const msg = error.response?.data?.message || 'Không thể gửi yêu cầu. Vui lòng thử lại sau.';
      toast.error(`❌ ${msg}`);
    } finally {
      setApplying(false);
    }
  };

  return (
    // THAY ĐỔI UI: Card Theme Navy - Border Hover & Shadow
    <div className="group relative bg-white rounded-2xl border border-[#193366]/5 hover:border-[#193366]/30 shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(25,51,102,0.15)] hover:-translate-y-1 transition-all duration-300 p-0 overflow-hidden font-sans">

      {/* Dải màu bên trái: Đổi từ Gradient sang Solid Navy */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#193366]"></div>

      <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6 ml-1.5">

        {/* CỘT TRÁI */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {/* Avatar Placeholder: Nền kem, icon Navy nhạt */}
              <div className="w-10 h-10 rounded-full bg-[#f9f9f6] flex items-center justify-center border border-gray-100 text-[#193366]/50">
                <FaUser />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#193366] text-sm">
                    {request.user?.fullName || "Phụ huynh ẩn danh"}
                  </span>
                  <FaCheckCircle className="text-blue-500 text-xs" title="Đã xác thực" />
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                  <FaClock className="text-[10px]" /> 2 ngày trước
                </div>
              </div>
            </div>

            {/* Status Badge: Giữ màu xanh lá để nổi bật trạng thái active */}
            <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              Đang tìm kiếm
            </span>
          </div>

          {/* Tiêu đề & mô tả */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3
                onClick={() => navigate(`/classes/${request._id}`)}
                className="text-lg md:text-xl font-bold text-[#193366] group-hover:text-[#193366]/80 transition-colors cursor-pointer line-clamp-1"
              >
                {request.title || `Tìm gia sư ${request.subject}`}
              </h3>
              {/* Grade Badge: Navy nhạt */}
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#193366]/5 text-[#193366] border border-[#193366]/10">
                {request.grade}
              </span>
            </div>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium">
              {request.description || "Gia đình đang tìm gia sư có kinh nghiệm, kiên nhẫn. Ưu tiên sinh viên sư phạm hoặc giáo viên đã đi làm..."}
            </p>
          </div>

          {/* Thông tin chi tiết */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#f9f9f6] p-2 rounded-lg font-medium">
              <FaMapMarkerAlt className="text-red-400 shrink-0" />
              <span className="truncate">{request.location || request.address || "Hà Nội"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#f9f9f6] p-2 rounded-lg font-medium">
              <FaCalendarAlt className="text-blue-400 shrink-0" />
              <span className="truncate">{sessionsPerWeek} buổi/tuần</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#f9f9f6] p-2 rounded-lg font-medium">
              {genderPref === 'Nữ' ? <FaVenus className="text-pink-400 shrink-0" /> : <FaMars className="text-blue-400 shrink-0" />}
              <span className="truncate">YC: {genderPref}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#f9f9f6] p-2 rounded-lg font-medium">
              {isOnline ? <FaLaptop className="text-purple-400" /> : <div className={`w-2 h-2 rounded-full bg-orange-400`}></div>}
              <span className="truncate">{isOnline ? 'Online' : 'Tại nhà'}</span>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: LƯƠNG & ACTION */}
        <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-dashed border-gray-200 pt-4 md:pt-0 md:pl-6 min-w-[200px]">
          <div className="text-right md:text-right flex flex-row md:flex-col justify-between items-center md:items-end mb-4 md:mb-0">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Học phí</p>
              <div className="text-xl md:text-2xl font-extrabold text-[#193366]">
                {formattedPrice} <span className="text-sm font-bold text-gray-400">đ/tháng</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 w-full mt-auto">
            <button
              disabled={applying || applied}
              onClick={handleApply}
              // Button Style: Navy Solid
              className={`w-full py-2.5 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95
                ${applied
                  ? 'bg-green-100 text-green-700 border border-green-300 cursor-default'
                  : applying
                    ? 'bg-[#193366]/70 text-white animate-pulse'
                    : 'bg-[#193366] hover:bg-[#193366]/90 text-white shadow-lg shadow-[#193366]/20'}
              `}
            >
              <FaBookOpen className="text-xs" />
              {applied ? 'Đã gửi yêu cầu' : applying ? 'Đang gửi...' : 'Nhận lớp ngay'}
            </button>

            <button
              onClick={() => navigate(`/classes/${request._id}`)}
              className="w-full py-2.5 bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-[#f9f9f6] hover:text-[#193366] hover:border-[#193366]/20 transition-all">
              Xem chi tiết
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RequestCard;