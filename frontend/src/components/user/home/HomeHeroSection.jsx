import React, { useState } from 'react';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaMapMarkerAlt, FaStar, FaUserGraduate,
  FaChalkboardTeacher, FaCheckCircle, FaBookOpen, FaArrowRight
} from 'react-icons/fa';

const HomeHero = () => {
  const [activeTab, setActiveTab] = useState('tutor'); // 'tutor' or 'class'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative bg-[#F8F9FC] overflow-hidden min-h-[90vh] flex flex-col justify-center">

      {/* --- 1. BACKGROUND DECORATION (Aurora Effect) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>

        {/* Grid Pattern mờ nền */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* --- CỘT TRÁI: NỘI DUNG (Chiếm 7 phần) --- */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm text-blue-700 text-sm font-semibold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Nền tảng EdTech #1 Việt Nam
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Khởi đầu hành trình <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Chinh phục tri thức
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Kết nối tức thì với <strong className="text-gray-900">10,000+</strong> gia sư xuất sắc và các lớp học chất lượng.
              Công nghệ AI giúp tìm người phù hợp nhất chỉ trong 30 giây.
            </motion.p>

            {/* --- SMART SEARCH BAR (Glassmorphism) --- */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl">
              <div className="bg-white/70 backdrop-blur-xl p-3 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">

                {/* Tabs Switcher */}
                <div className="flex bg-gray-100/50 p-1.5 rounded-2xl mb-3 relative">
                  {['tutor', 'class'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 relative py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 z-10 flex items-center justify-center gap-2 ${activeTab === tab ? 'text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTabBg"
                          className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-100"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {tab === 'tutor' ? <FaUserGraduate /> : <FaChalkboardTeacher />}
                        {tab === 'tutor' ? 'Tìm Gia Sư' : 'Tìm Lớp Dạy'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Inputs Area */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 group-focus-within:bg-blue-600 group-focus-within:text-white transition-colors">
                      <FaSearch size={14} />
                    </div>
                    <input
                      type="text"
                      placeholder={activeTab === 'tutor' ? "Tìm môn học (Toán, IELTS, Piano...)" : "Tìm lớp (Lớp 12, Tiếng Nhật...)"}
                      className="w-full pl-16 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-800 placeholder-gray-400 font-medium"
                    />
                  </div>

                  <div className="md:w-[35%] relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 group-focus-within:bg-indigo-600 group-focus-within:text-white transition-colors">
                      <FaMapMarkerAlt size={14} />
                    </div>
                    <select className="w-full pl-16 pr-10 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-gray-800 appearance-none font-medium cursor-pointer">
                      <option value="">Toàn quốc</option>
                      <option value="hn">Hà Nội</option>
                      <option value="hcm">TP. Hồ Chí Minh</option>
                      <option value="dn">Đà Nẵng</option>
                    </select>
                    {/* Custom Arrow for Select */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>

                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                    <span className="hidden md:inline">Tìm Ngay</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 flex-wrap justify-center lg:justify-start">
                <span>Phổ biến:</span>
                {['Toán 12', 'Tiếng Anh', 'IELTS', 'Piano', 'Ngữ Văn'].map((tag) => (
                  <span key={tag} className="cursor-pointer px-2 py-1 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4 border-t border-gray-200/60 w-full lg:w-auto justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400 text-xs">
                    {[1, 2, 3, 4, 5].map(i => <FaStar key={i} />)}
                  </div>
                  <span className="text-xs font-bold text-gray-700">4.9/5 Đánh giá</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">50k+</p>
                <p className="text-xs text-gray-500 font-medium">Học viên tin dùng</p>
              </div>
            </motion.div>

          </motion.div>

          {/* --- CỘT PHẢI: HÌNH ẢNH (Chiếm 5 phần) --- */}
          <div className="lg:col-span-5 relative hidden lg:block">
            {/* Hình ảnh chính với viền trang trí */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                  alt="Happy Student"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay Gradient nhẹ dưới đáy ảnh để text nổi hơn nếu có */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              {/* Decorative Circle sau ảnh */}
              <div className="absolute top-10 right-10 w-full h-full bg-blue-100 rounded-[2.5rem] -z-10 transform translate-x-4 translate-y-4"></div>
            </motion.div>

            {/* Floating Card 1: Gia sư chất lượng */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-16 -left-12 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white animate-float-slow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm">
                  <FaCheckCircle size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Đã xác thực</p>
                  <p className="text-lg font-bold text-gray-900">100% Bằng cấp</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Môn học đa dạng */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute bottom-20 -right-8 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white animate-float-reverse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shadow-sm">
                  <FaBookOpen size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Đa dạng</p>
                  <p className="text-lg font-bold text-gray-900">50+ Môn học</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* --- 2. STATS SECTION (Clean & Minimal) --- */}
      <div className="bg-white border-y border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { number: 15000, label: "Gia sư giỏi", color: "text-blue-600", suffix: "+" },
              { number: 8500, label: "Lớp kết nối", color: "text-indigo-600", suffix: "+" },
              { number: 4.9, label: "Hài lòng", color: "text-purple-600", suffix: "", isDecimal: true },
              { number: 24, label: "Hỗ trợ 24/7", color: "text-pink-600", suffix: "/7" }
            ].map((stat, index) => (
              <div key={index} className="py-8 text-center group hover:bg-gray-50/50 transition-colors">
                <div className={`text-3xl md:text-4xl font-extrabold ${stat.color} mb-1 flex justify-center items-center gap-1`}>
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    decimals={stat.isDecimal ? 1 : 0}
                    separator=","
                  />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-sm md:text-base text-gray-500 font-medium group-hover:text-gray-900 transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeHero;