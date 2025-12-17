import React, { useState } from 'react';
import CountUp from 'react-countup';
import {
  FaSearch, FaMapMarkerAlt, FaStar, FaUserGraduate,
  FaChalkboardTeacher, FaCheckCircle, FaBookOpen
} from 'react-icons/fa';

const HomeHero = () => {
  // State quản lý Tab tìm kiếm (Tìm Gia sư vs Tìm Lớp)
  const [activeTab, setActiveTab] = useState('tutor'); // 'tutor' or 'class'

  return (
    <div className="relative bg-[#F8F9FC] overflow-hidden">

      {/* --- 1. BACKGROUND DECORATION --- */}
      {/* Các khối màu mờ di chuyển tạo hiệu ứng nền động (Aurora effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* --- CỘT TRÁI: NỘI DUNG & SEARCH --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

            {/* Badge nhỏ */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 text-sm font-semibold animate-fade-in-up">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Nền tảng kết nối gia sư số 1 Việt Nam
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Khởi đầu hành trình <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Chinh phục tri thức
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              Kết nối với hơn <strong className="text-gray-800">10,000+</strong> gia sư chất lượng cao từ các trường đại học hàng đầu. Học tập hiệu quả, tiến bộ mỗi ngày.
            </p>

            {/* --- SMART SEARCH BAR (Tabbed) --- */}
            <div className="w-full max-w-xl bg-white p-2 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 transform transition-all hover:scale-[1.01]">

              {/* Tabs */}
              <div className="flex p-1 bg-gray-50 rounded-2xl mb-2">
                <button
                  onClick={() => setActiveTab('tutor')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'tutor' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <FaUserGraduate /> Tìm Gia Sư
                </button>
                <button
                  onClick={() => setActiveTab('class')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'class' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <FaChalkboardTeacher /> Tìm Lớp Dạy
                </button>
              </div>

              {/* Inputs */}
              <div className="flex flex-col md:flex-row gap-2 p-2">
                <div className="flex-1 relative group">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder={activeTab === 'tutor' ? "Môn học (Toán, Lý, IELTS...)" : "Lớp cần dạy (Lớp 12, Tiếng Anh...)"}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>
                <div className="md:w-1/3 relative group">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <select className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-800 appearance-none cursor-pointer">
                    <option value="">Toàn quốc</option>
                    <option value="hn">Hà Nội</option>
                    <option value="hcm">TP. HCM</option>
                  </select>
                </div>
                <button className={`px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${activeTab === 'tutor' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'
                  }`}>
                  {/* Icon tìm kiếm trên mobile, chữ trên desktop */}
                  <FaSearch className="md:hidden" />
                  <span className="hidden md:inline">Tìm kiếm</span>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p className="text-gray-500"><span className="font-bold text-gray-900">50,000+</span> phụ huynh tin dùng</p>
              </div>
            </div>

          </div>

          {/* --- CỘT PHẢI: VISUAL HERO IMAGE --- */}
          <div className="relative hidden lg:block">
            {/* Hình ảnh chính (Cần ảnh nền trong suốt chất lượng cao) */}
            <div className="relative z-10 animate-float-slow">
              <img
                src="https://giasuviet.com.vn/wp-content/uploads/2016/04/bi-quyet-thue-gia-su-toan-gioi-cho-con-tai-ha-noi.jpg"
                alt="Happy Student"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/* Floating Card 1: Gia sư chất lượng */}
            <div className="absolute top-20 -left-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-float-reverse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <FaCheckCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Xác thực</p>
                  <p className="font-bold text-gray-800">100% Bằng cấp</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Môn học đa dạng */}
            <div className="absolute bottom-20 -right-5 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <FaBookOpen size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Đa dạng</p>
                  <p className="font-bold text-gray-800">50+ Môn học</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- 2. STATS SECTION (Overlap hoặc nằm ngay dưới) --- */}
      <div className="relative z-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">

            {/* Stat Item 1 */}
            <div className="py-8 md:py-12 px-4 text-center group cursor-default">
              <div className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <CountUp end={15000} duration={2.5} separator="," />+
              </div>
              <p className="text-gray-500 font-medium">Gia sư chất lượng</p>
            </div>

            {/* Stat Item 2 */}
            <div className="py-8 md:py-12 px-4 text-center group cursor-default">
              <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <CountUp end={8500} duration={2.5} separator="," />+
              </div>
              <p className="text-gray-500 font-medium">Lớp đã kết nối</p>
            </div>

            {/* Stat Item 3 */}
            <div className="py-8 md:py-12 px-4 text-center group cursor-default">
              <div className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                <CountUp end={4.9} duration={2} decimals={1} />
                <span className="text-3xl ml-1">⭐</span>
              </div>
              <p className="text-gray-500 font-medium">Đánh giá hài lòng</p>
            </div>

            {/* Stat Item 4 */}
            <div className="py-8 md:py-12 px-4 text-center group cursor-default">
              <div className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <p className="text-gray-500 font-medium">Hỗ trợ tận tâm</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeHero;