import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaSearch, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const ClassHeader = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative bg-[#F9FAFB] pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden font-sans">

      {/* --- BACKGROUND DECORATION (Hiệu ứng chuyển động thực tế) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob Xanh: Di chuyển ngẫu nhiên nhẹ nhàng */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60"
        ></motion.div>

        {/* Blob Tím: Di chuyển ngược lại */}
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-60"
        ></motion.div>

        {/* Noise Texture + Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >

        {/* Badge thông báo (Float Animation) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 shadow-sm mb-8 cursor-default"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600">
            Hơn <span className="font-bold text-blue-600"><CountUp end={350} duration={3} />+</span> lớp mới đang chờ bạn
          </span>
        </motion.div>

        {/* TIÊU ĐỀ CHÍNH */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          Tìm lớp gia sư <br className="hidden md:block" />
          <span className="text-blue-600">
            phù hợp nhất
          </span>
        </motion.h1>


        <motion.p variants={itemVariants} className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-12">
          Kết nối trực tiếp với phụ huynh. Tự do lựa chọn môn học, khu vực và mức lương mong muốn.
        </motion.p>

        {/* --- SEARCH BOX (Interactive) --- */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="bg-white p-2 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] max-w-4xl mx-auto border border-gray-100 relative z-20"
        >
          <div className="flex flex-col md:flex-row gap-2">

            {/* Input Môn học */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 border border-transparent rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-200 transition-all font-medium"
                placeholder="Nhập môn học (Toán, Lý, Piano...)"
              />
            </div>

            {/* Select Khu vực */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <select className="block w-full pl-11 pr-10 py-4 border border-transparent rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-200 appearance-none cursor-pointer transition-all font-medium">
                <option value="">Toàn quốc</option>
                <option value="hn">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="dn">Đà Nẵng</option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Button Search */}
            <button className="md:w-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
              Tìm lớp ngay <FaArrowRight />
            </button>
          </div>
        </motion.div>

        {/* Quick Filters / Tags */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-sm text-gray-400 py-1.5 font-medium">Xu hướng:</span>
          {['Toán lớp 12', 'Tiếng Anh', 'Ngữ Văn', 'IELTS', 'Tiểu học'].map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05, backgroundColor: "#EFF6FF", color: "#2563EB", borderColor: "#BFDBFE" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 transition-colors shadow-sm"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* --- STATS SECTION (Animated CountUp) --- */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200/60 pt-10"
        >
          {[
            { num: 1200, label: "Lớp học active", suffix: "+" },
            { num: 800, label: "Phụ huynh mới", suffix: "+" },
            { num: 100, label: "Miễn phí nhận lớp", suffix: "%" },
            { num: 24, label: "Hỗ trợ nhanh", suffix: "/7" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                <CountUp end={stat.num} duration={2.5} separator="," />{stat.suffix}
              </div>
              <div className="text-sm font-semibold text-slate-400 mt-2 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ClassHeader;