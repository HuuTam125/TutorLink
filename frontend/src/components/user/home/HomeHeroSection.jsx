import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch, FaMapMarkerAlt, FaStar, FaUserGraduate,
  FaChalkboardTeacher, FaCheckCircle, FaArrowRight, FaPlay
} from 'react-icons/fa';

// Sub-component nhỏ (để trong cùng file hoặc tách riêng nếu muốn dùng nhiều nơi)
const FloatingBadge = ({ icon, title, subtitle, colorClass, delay, positionClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, type: "spring", bounce: 0.5 }}
    className={`absolute z-20 bg-white/90 backdrop-blur-md p-3 pr-5 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-white ${positionClass}`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 ${colorClass} rounded-full flex items-center justify-center text-white shadow-md`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{subtitle}</p>
        <p className="text-sm font-bold text-gray-900 leading-tight">{title}</p>
      </div>
    </div>
  </motion.div>
);

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('tutor');
  const [placeholder, setPlaceholder] = useState('');
  const textToType = activeTab === 'tutor' ? "Tìm gia sư IELTS, Toán 12..." : "Tìm lớp học Tiếng Nhật, Guitar...";

  // Effect gõ chữ
  useEffect(() => {
    let i = 0;
    setPlaceholder('');
    const typing = setInterval(() => {
      if (i < textToType.length) {
        setPlaceholder(prev => prev + textToType.charAt(i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
  }, [activeTab, textToType]);

  return (
    <section className="relative bg-[#F0F4F8] overflow-x-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* --- LEFT CONTENT --- */}
          <motion.div
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700">Nền tảng gia sư #1 Việt Nam</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Kết nối tri thức <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                Khơi dậy tiềm năng
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 font-medium">
              Tìm kiếm gia sư chất lượng cao hoặc lớp học phù hợp chỉ trong <span className="text-gray-900 font-bold underline decoration-blue-500/30 decoration-2 underline-offset-4">30 giây</span>.
            </p>

            {/* SEARCH BOX */}
            <div className="relative max-w-2xl mx-auto lg:mx-0 w-full group">
              {/* Tabs */}
              <div className="flex gap-1 mb-2 pl-2">
                {[
                  { id: 'tutor', label: 'Tìm Gia Sư', icon: <FaUserGraduate /> },
                  { id: 'class', label: 'Tìm Lớp', icon: <FaChalkboardTeacher /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-xl text-sm font-bold transition-all ${activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm translate-y-1 z-10'
                      : 'bg-transparent text-gray-500 hover:bg-gray-100/50'
                      }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Inputs */}
              <div className="bg-white p-2 rounded-2xl rounded-tl-none shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col md:flex-row gap-2 relative z-20">
                <div className="flex-1 flex items-center px-4 bg-gray-50/50 rounded-xl border border-transparent focus-within:bg-white focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                  <FaSearch className="text-gray-400 text-lg min-w-[20px]" />
                  <input type="text" placeholder={placeholder} className="w-full py-4 px-3 bg-transparent outline-none text-gray-800 font-medium" />
                </div>
                <div className="md:w-48 flex items-center px-4 bg-gray-50/50 rounded-xl border border-transparent hover:bg-white cursor-pointer relative">
                  <FaMapMarkerAlt className="text-indigo-500 text-lg" />
                  <select className="w-full py-4 px-3 bg-transparent outline-none text-gray-700 font-semibold cursor-pointer appearance-none z-10">
                    <option value="">Toàn quốc</option>
                    <option value="hn">Hà Nội</option>
                    <option value="hcm">Hồ Chí Minh</option>
                  </select>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span>Khám phá</span> <FaArrowRight />
                </button>
              </div>

              {/* Tags */}
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-500 justify-center lg:justify-start flex-wrap">
                <span className="font-semibold">Trending:</span>
                {['Toán 12', 'IELTS 7.0', 'Piano', 'Tiếng Hàn'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white border border-gray-200 rounded-md hover:text-blue-600 cursor-pointer transition-colors text-xs">{tag}</span>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-[3px] border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">+2k</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p className="text-sm font-semibold text-gray-700">Được tin dùng bởi 50k+ PHHS</p>
              </div>
            </div>

          </motion.div>

          {/* --- RIGHT CONTENT --- */}
          <div className="lg:col-span-5 relative hidden lg:block h-[550px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full h-full"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[105%] bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-morph-slow -z-10"></div>

              <div className="w-full h-full rounded-[3rem] overflow-hidden border-[8px] border-white/80 shadow-2xl relative">
                <img src="https://giasunhattam.vn/wp-content/uploads/2021/07/gia-su-online.jpg" alt="Hero" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-8 left-8 flex items-center gap-3 group cursor-pointer z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:bg-white group-hover:text-blue-600 text-white transition-all">
                    <FaPlay className="ml-1 text-sm" />
                  </div>
                  <span className="text-white font-semibold text-sm drop-shadow-md">Xem Video giới thiệu</span>
                </div>
              </div>

              {/* Floating Cards */}
              <FloatingBadge icon={<FaCheckCircle size={20} />} title="Đã xác thực" subtitle="Uy tín" colorClass="bg-green-500" delay={0.8} positionClass="top-10 -left-10" />
              <FloatingBadge icon={<FaUserGraduate size={18} />} title="Gia sư 8.0 IELTS" subtitle="Top Rated" colorClass="bg-blue-500" delay={1.0} positionClass="top-1/2 -right-12" />
              <FloatingBadge icon={<FaChalkboardTeacher size={18} />} title="150+ Lớp mới" subtitle="Hôm nay" colorClass="bg-orange-500" delay={1.2} positionClass="bottom-10 -left-4" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* CSS cho Animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes morph-slow {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
          100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        }
        .animate-pulse-slow { animation: blob 7s infinite; }
        .animate-morph-slow { animation: morph-slow 8s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;