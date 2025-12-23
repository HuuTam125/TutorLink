import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import {
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaStar, FaChalkboardTeacher,
  FaCheckCircle, FaGraduationCap, FaClock, FaUserGraduate, FaCalendarAlt, FaPlayCircle
} from "react-icons/fa";

import InviteModal from "../../components/user/classes/InviteModal";

const TutorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  // State điều khiển Modal
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axiosClient.get(`/tutors/${id}`);
        setTutor(res.data);
      } catch (error) {
        console.error("Lỗi lấy chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  // Hàm xử lý khi bấm nút "Mời dạy ngay"
  const handleOpenInvite = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // 1. Kiểm tra đăng nhập
    if (!currentUser) {
      if (window.confirm("Bạn cần đăng nhập để mời gia sư. Đi đến trang đăng nhập ngay?")) {
        navigate('/login');
      }
      return;
    }

    // 2. Mở Modal
    setShowInviteModal(true);
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-[#f9f9f6]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193366]"></div></div>;
  if (!tutor) return <div className="text-center text-gray-500 mt-10">Không tìm thấy gia sư này.</div>;

  // --- MOCK DATA ---
  const mockStats = {
    students: 24,
    hours: 150,
    rating: 4.8,
    reviews: 18
  };

  const mockReviews = [
    { id: 1, user: "Nguyễn Văn Nam", avatar: "https://i.pravatar.cc/150?img=11", rating: 5, comment: "Thầy dạy rất dễ hiểu, nhiệt tình. Con tôi đã tiến bộ rõ rệt môn Toán.", date: "2 ngày trước" },
    { id: 2, user: "Trần Thị Hương", avatar: "https://i.pravatar.cc/150?img=5", rating: 4, comment: "Phương pháp dạy hay, tuy nhiên lịch học hơi kín.", date: "1 tuần trước" },
    { id: 3, user: "Lê Minh Tuấn", avatar: "https://i.pravatar.cc/150?img=3", rating: 5, comment: "Rất chuyên nghiệp và đúng giờ.", date: "3 tuần trước" },
  ];

  const mockEducation = [
    { title: "Chứng chỉ IELTS 7.5", school: "British Council", year: "2021" },
    { title: "Giải nhì Toán TP", school: "Sở GD&ĐT", year: "2019" }
  ];

  return (
    // Nền trang: Kem ấm #f9f9f6
    <div className="min-h-screen bg-[#f9f9f6] font-sans pb-20">

      {/* 1. HERO SECTION & COVER IMAGE */}
      <div className="relative h-60 md:h-80 w-full">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Overlay màu Navy nhạt */}
        <div className="absolute inset-0 bg-[#193366]/40 mix-blend-multiply"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* 2. CỘT TRÁI: THÔNG TIN CHÍNH */}
          <div className="flex-1 space-y-8">

            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(25,51,102,0.1)] p-6 border border-[#193366]/5 flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative">
                <img
                  src={tutor.user?.avatar || `https://ui-avatars.com/api/?name=${tutor.user?.fullName}&background=random`}
                  alt={tutor.user?.fullName}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#E6F4EA] text-[#137333] text-xs font-bold px-2 py-1 rounded-full border-2 border-white flex items-center gap-1 shadow-sm">
                  <div className="w-2 h-2 bg-[#137333] rounded-full animate-pulse"></div> Online
                </span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-extrabold text-[#193366] flex items-center gap-2">
                      {tutor.user?.fullName}
                      <FaCheckCircle className="text-blue-500 text-xl" title="Đã xác thực" />
                    </h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2 font-medium">
                      <FaMapMarkerAlt className="text-red-400" /> {tutor.area || "Toàn quốc"} •
                      <span className="text-[#193366] font-bold bg-[#193366]/5 px-2 py-0.5 rounded text-sm border border-[#193366]/10">
                        {tutor.experience || "2 năm"} kinh nghiệm
                      </span>
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 text-yellow-400 font-bold text-lg">
                      <span>{mockStats.rating}</span> <FaStar />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">({mockStats.reviews} đánh giá)</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tutor.subjects?.map((sub, i) => (
                    // Subject Tag: Navy nhạt
                    <span key={i} className="px-3 py-1 bg-white text-[#193366] rounded-lg text-sm font-bold border border-[#193366]/20 shadow-sm">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#193366]/5">
              <h2 className="text-xl font-bold text-[#193366] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <FaChalkboardTeacher className="text-[#193366]/60" /> Giới thiệu
              </h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line font-medium">
                {tutor.bio || "Gia sư chưa cập nhật phần giới thiệu."}
              </div>
            </div>

            {/* Education Timeline */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#193366]/5">
              <h2 className="text-xl font-bold text-[#193366] mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                <FaGraduationCap className="text-[#193366]/60" /> Học vấn & Chứng chỉ
              </h2>
              <div className="space-y-6">
                {(tutor.university || tutor.major) && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-[#193366] rounded-full ring-2 ring-[#193366]/20"></div>
                      <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#193366] text-lg">
                        {tutor.major || "Chuyên ngành"}
                      </h4>
                      <p className="text-gray-600 font-medium">
                        {tutor.university || "Trường Đại học"}
                      </p>
                      <p className="text-[#193366] text-xs mt-1 bg-[#193366]/5 inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#193366]/10 font-bold">
                        <FaCheckCircle size={10} /> Đã xác thực
                      </p>
                    </div>
                  </div>
                )}
                {mockEducation.map((edu, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      {idx !== mockEducation.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#193366]">{edu.title}</h4>
                      <p className="text-gray-600 text-sm font-medium">{edu.school}</p>
                      <p className="text-gray-400 text-xs mt-1">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#193366]/5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#193366] flex items-center gap-2">
                  <FaStar className="text-yellow-400" /> Đánh giá từ học viên
                </h2>
                <span className="text-[#193366] font-bold cursor-pointer hover:underline text-sm">Xem tất cả</span>
              </div>
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full border border-gray-200" />
                        <div>
                          <h5 className="font-bold text-[#193366] text-sm">{review.user}</h5>
                          <div className="flex text-yellow-400 text-xs mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < review.rating ? "" : "text-gray-300"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs font-medium">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-3 bg-[#f9f9f6] p-3 rounded-lg font-medium italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. CỘT PHẢI: SIDEBAR STICKY */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(25,51,102,0.1)] border border-[#193366]/5 p-6 sticky top-4">
              <div className="flex justify-between items-end mb-4">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Học phí</span>
                <span className="text-3xl font-extrabold text-[#193366]">
                  {tutor.hourlyRate.toLocaleString()} <span className="text-sm text-gray-400 font-bold">đ/giờ</span>
                </span>
              </div>

              {/* Mock Video Intro */}
              <div className="relative w-full h-32 bg-gray-900 rounded-xl mb-6 overflow-hidden group cursor-pointer border border-gray-200">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition" alt="Video thumbnail" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaPlayCircle className="text-white text-4xl drop-shadow-lg group-hover:scale-110 transition" />
                </div>
                <span className="absolute bottom-2 left-2 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">Video giới thiệu</span>
              </div>

              <div className="space-y-3 mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2 font-medium"><FaClock className="text-gray-400" /> Thời lượng</span>
                  <span className="font-bold text-[#193366]">60 - 90 phút/buổi</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2 font-medium"><FaChalkboardTeacher className="text-gray-400" /> Hình thức</span>
                  <span className="font-bold text-[#193366] capitalize">{tutor.teachingMethod === 'both' ? 'Online & Offline' : tutor.teachingMethod}</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* --- NÚT MỜI DẠY: Navy Solid --- */}
                <button
                  onClick={handleOpenInvite}
                  className="w-full bg-[#193366] text-white font-bold py-3.5 rounded-xl hover:bg-[#193366]/90 transition shadow-lg shadow-[#193366]/20 active:scale-[0.98]"
                >
                  Mời dạy ngay
                </button>
                <button className="w-full bg-white text-[#193366] font-bold py-3.5 rounded-xl border border-[#193366]/20 hover:bg-[#193366]/5 transition">
                  Nhắn tin
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400 font-medium">Cam kết hoàn tiền nếu không hài lòng buổi đầu.</p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#193366]/5">
              <h3 className="font-bold text-[#193366] mb-4">Hoạt động</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#f9f9f6] rounded-xl border border-gray-100">
                  <FaUserGraduate className="text-[#193366]/60 text-xl mx-auto mb-1" />
                  <div className="font-extrabold text-[#193366]">{mockStats.students}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Học sinh</div>
                </div>
                <div className="text-center p-3 bg-[#f9f9f6] rounded-xl border border-gray-100">
                  <FaCalendarAlt className="text-[#193366]/60 text-xl mx-auto mb-1" />
                  <div className="font-extrabold text-[#193366]">{mockStats.hours}+</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Giờ dạy</div>
                </div>
              </div>
            </div>

            {/* Contact Info Mini */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#193366]/5">
              <h3 className="font-bold text-[#193366] mb-4">Thông tin liên hệ</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#193366]/10 flex items-center justify-center text-[#193366]"><FaPhone size={12} /></div>
                  <span className="text-gray-600 font-medium">{tutor.user?.phone || "********"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#193366]/10 flex items-center justify-center text-[#193366]"><FaEnvelope size={12} /></div>
                  <span className="text-gray-600 font-medium truncate">{tutor.user?.email}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      {showInviteModal && (
        <InviteModal
          tutor={tutor}
          onClose={() => setShowInviteModal(false)}
        />
      )}

    </div>
  );
};

export default TutorDetailPage;