import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import {
  FaMapMarkerAlt, FaClock, FaChalkboardTeacher,
  FaVenusMars, FaBookOpen, FaUserCircle, FaShieldAlt, FaCheckCircle,
  FaCalendarAlt, FaGraduationCap, FaArrowLeft, FaShareAlt, FaRegHeart
} from 'react-icons/fa';

const ClassDetailPage = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const res = await axiosClient.get(`/requests/${id}`);
        setClassData(res.data);

      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!classData) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy lớp học</h2>
      <Link to="/classes" className="text-blue-600 hover:underline flex items-center gap-2">
        <FaArrowLeft /> Quay lại danh sách
      </Link>
    </div>
  );

  // --- HELPER FUNCTIONS ---
  const getGenderText = (gender) => {
    const map = { male: 'Nam', female: 'Nữ', any: 'Nam hoặc Nữ', both: 'Nam hoặc Nữ' };
    return map[gender] || 'Không yêu cầu';
  };

  const getMethodText = (method) => {
    const map = { online: 'Online (Trực tuyến)', offline: 'Offline (Tại nhà)', both: 'Linh hoạt (Cả hai)' };
    return map[method] || method;
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      matched: 'bg-blue-100 text-blue-700 border-blue-200',
      closed: 'bg-gray-100 text-gray-600 border-gray-200'
    };
    const labels = {
      pending: 'Đang chờ duyệt',
      approved: 'Đang tìm gia sư',
      matched: 'Đã giao lớp',
      closed: 'Đã đóng'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.pending} flex items-center gap-1`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans pb-24 md:pb-10">

      {/* 1. BREADCRUMB & BACK BUTTON */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link to="/classes" className="text-gray-500 hover:text-blue-600 text-sm flex items-center gap-1 w-fit transition-colors">
            <FaArrowLeft /> Quay lại danh sách lớp
          </Link>
        </div>
      </div>

      {/* 2. HEADER SECTION (STICKY ON DESKTOP SCROLL IF NEEDED, BUT STATIC HERE) */}
      <div className="bg-white border-b border-gray-200 shadow-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                  {classData.subject}
                </span>
                {getStatusBadge(classData.status)}
                <span className="text-gray-400 text-xs flex items-center gap-1 ml-auto md:ml-0">
                  <FaClock /> Đăng ngày {new Date(classData.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                Tìm gia sư dạy {classData.subject} - {classData.grade}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="truncate max-w-md">{classData.address || "Địa điểm chưa xác định"}</span>
              </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex gap-3 mt-2">
              <button className="p-3 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-red-500 transition tooltip" title="Lưu tin">
                <FaRegHeart size={20} />
              </button>
              <button className="p-3 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition tooltip" title="Chia sẻ">
                <FaShareAlt size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* === CỘT TRÁI (CONTENT) === */}
          <div className="w-full lg:w-2/3 space-y-8">

            {/* A. Summary Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Lương */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-lg">$</span>
                </div>
                <div className="text-xs text-gray-400 uppercase font-bold">Mức lương</div>
                <div className="text-green-700 font-bold text-base mt-1 truncate">
                  {(classData.budget / 1000).toLocaleString()}k <span className="text-xs font-normal text-gray-500">/buổi</span>
                </div>
              </div>

              {/* Hình thức */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaChalkboardTeacher />
                </div>
                <div className="text-xs text-gray-400 uppercase font-bold">Hình thức</div>
                <div className="text-gray-800 font-bold text-sm mt-1">
                  {classData.teachingMethod === 'online' ? 'Online' : 'Tại nhà'}
                </div>
              </div>

              {/* Số buổi */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaCalendarAlt />
                </div>
                <div className="text-xs text-gray-400 uppercase font-bold">Lịch học</div>
                <div className="text-gray-800 font-bold text-sm mt-1">
                  {classData.sessionsPerWeek} buổi/tuần
                </div>
              </div>

              {/* Giới tính */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaVenusMars />
                </div>
                <div className="text-xs text-gray-400 uppercase font-bold">Yêu cầu GV</div>
                <div className="text-gray-800 font-bold text-sm mt-1">
                  {getGenderText(classData.genderPreference)}
                </div>
              </div>
            </div>

            {/* B. Chi tiết yêu cầu */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <FaBookOpen className="text-blue-600" /> Nội dung lớp học
              </h2>

              <div className="space-y-8">
                {/* Mô tả */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <span className="w-1 h-4 bg-blue-600 rounded-full"></span> Mô tả chi tiết
                  </h3>
                  <div className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-xl border border-gray-100 whitespace-pre-line">
                    {classData.description}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Yêu cầu GV */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <span className="w-1 h-4 bg-orange-500 rounded-full"></span> Yêu cầu gia sư
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <FaGraduationCap className="text-gray-400 mt-1" />
                        <div>
                          <span className="block text-gray-700 font-medium">Trình độ mong muốn</span>
                          <span className="text-sm text-gray-500">Sinh viên hoặc Giáo viên</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-gray-400 mt-1" />
                        <div>
                          <span className="block text-gray-700 font-medium">Kinh nghiệm</span>
                          <span className="text-sm text-gray-500">Ưu tiên đã từng dạy {classData.grade}</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Lịch học */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <span className="w-1 h-4 bg-purple-500 rounded-full"></span> Thời gian rảnh
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">Phụ huynh có thể học vào các buổi:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Thứ 2 (Tối)', 'Thứ 4 (Tối)', 'CN (Cả ngày)'].map((time, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* C. Safety Warning */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex gap-4 items-start">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-full">
                <FaShieldAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-orange-900 text-sm mb-1">Cảnh báo an toàn</h4>
                <p className="text-orange-800 text-sm leading-relaxed">
                  Không bao giờ nộp phí nhận lớp trước khi gặp mặt phụ huynh/học viên. Nếu phụ huynh yêu cầu chuyển khoản trước, vui lòng báo cáo cho Admin ngay lập tức.
                </p>
              </div>
            </div>

          </div>

          {/* === CỘT PHẢI (SIDEBAR - STICKY) === */}
          <div className="w-full lg:w-1/3 space-y-6">

            {/* 1. Card Tổng kết & Ứng tuyển (Sticky) */}
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-blue-100 p-6 lg:top-24">
              <div className="text-center mb-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Thu nhập / tháng</p>
                <h3 className="text-4xl font-extrabold text-blue-600 tracking-tight">
                  {(classData.budget).toLocaleString()}
                  <span className="text-lg text-gray-500 font-medium ml-1">đ</span>
                </h3>
                <div className="mt-2 text-xs text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-full border border-gray-100">
                  {classData.sessionsPerWeek} buổi x 4 tuần
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <FaCheckCircle className="text-white/50" /> Ứng tuyển ngay
                </button>
                <p className="text-center text-xs text-gray-400">
                  Hoàn toàn miễn phí. Còn <b>3</b> lượt ứng tuyển hôm nay.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    {/* Avatar User hoặc Placeholder */}
                    {classData.user?.avatar ? (
                      <img src={classData.user.avatar} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xl">
                        {classData.user?.fullName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Người đăng</p>
                    <h4 className="font-bold text-gray-900 text-sm">{classData.user?.fullName}</h4>
                  </div>
                  <button className="ml-auto text-blue-600 text-sm font-bold hover:underline">
                    Nhắn tin
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Map Mini (Optional) */}
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
              <div className="rounded-xl h-48 overflow-hidden">
                <iframe
                  title="Google Map HCM"
                  src="https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. MOBILE STICKY FOOTER (Chỉ hiện trên mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:hidden flex items-center justify-between gap-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Lương/buổi</span>
          <span className="text-lg font-bold text-green-600">{classData.budget?.toLocaleString()} đ</span>
        </div>
        <button className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md">
          Nhận lớp ngay
        </button>
      </div>

    </div>
  );
};

export default ClassDetailPage;