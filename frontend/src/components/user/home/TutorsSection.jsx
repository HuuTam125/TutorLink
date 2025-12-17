import React from 'react';
import { FaStar, FaCheckCircle, FaHeart, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedTutors = () => {
  // Mock Data Gia sư tiêu biểu
  const tutors = [
    {
      id: 1,
      name: "Nguyễn Thùy Linh",
      avatar: "https://i.pravatar.cc/150?img=5",
      title: "Gia sư Tiếng Anh / IELTS 8.0",
      rating: 5.0,
      reviews: 24,
      subjects: ["Tiếng Anh", "IELTS", "Giao tiếp"],
      location: "Hà Nội",
      price: "300.000đ"
    },
    {
      id: 2,
      name: "Trần Minh Tuấn",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "Giáo viên Toán - THPT Chuyên",
      rating: 4.9,
      reviews: 40,
      subjects: ["Toán", "Luyện thi ĐH", "Lý"],
      location: "TP. HCM",
      price: "400.000đ"
    },
    {
      id: 3,
      name: "Lê Bảo Châu",
      avatar: "https://i.pravatar.cc/150?img=9",
      title: "Sinh viên ĐH Ngoại Thương",
      rating: 5.0,
      reviews: 12,
      subjects: ["Văn", "Tiểu học", "Rèn chữ"],
      location: "Đà Nẵng",
      price: "200.000đ"
    },
    {
      id: 4,
      name: "Hoàng Văn Nam",
      avatar: "https://i.pravatar.cc/150?img=3",
      title: "Gia sư Piano & Thanh nhạc",
      rating: 4.8,
      reviews: 18,
      subjects: ["Piano", "Organ", "Nhạc lý"],
      location: "Hà Nội",
      price: "350.000đ"
    }
  ];

  return (
    <section className="py-20 bg-[#F8F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header với nút Xem tất cả */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Gia sư nổi bật tuần này</h2>
            <p className="text-gray-500">Các gia sư có thành tích xuất sắc và được phụ huynh đánh giá cao nhất.</p>
          </div>
          <Link
            to="/tutors"
            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 hover:underline transition-all"
          >
            Xem tất cả gia sư <FaArrowRight />
          </Link>
        </div>

        {/* Tutor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {/* Like Button (Absolute) */}
              <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10">
                <FaHeart size={20} />
              </button>

              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-3">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 group-hover:border-blue-100 transition-colors"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full border-2 border-white" title="Đã xác thực">
                    <FaCheckCircle size={12} />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg truncate w-full text-center">{tutor.name}</h3>
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide truncate w-full text-center mb-1">
                  {tutor.title}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="font-bold text-xs text-gray-700">{tutor.rating}</span>
                  <span className="text-xs text-gray-400">({tutor.reviews})</span>
                </div>
              </div>

              {/* Info Details */}
              <div className="space-y-3 mb-5">
                {/* Subjects Tags */}
                <div className="flex flex-wrap justify-center gap-1.5 h-16 overflow-hidden">
                  {tutor.subjects.map((sub, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[11px] font-medium border border-gray-100">
                      {sub}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {tutor.location}
                  </div>
                  <div className="font-bold text-blue-600">
                    {tutor.price}<span className="text-[10px] font-normal text-gray-400">/buổi</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full py-2.5 bg-white border border-blue-600 text-blue-600 font-bold rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                Mời dạy ngay
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedTutors;