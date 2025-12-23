import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaSearch, FaMapMarkerAlt, FaArrowRight, FaChevronDown } from 'react-icons/fa';

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
    // Nền kem ấm #f9f9f6
    <div className="relative bg-[#f9f9f6] pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden font-sans">

      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob Navy: Di chuyển ngẫu nhiên nhẹ nhàng */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#193366]/5 rounded-full mix-blend-multiply filter blur-[80px]"
        ></motion.div>

        {/* Blob Navy 2: Di chuyển ngược lại */}
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#193366]/5 rounded-full mix-blend-multiply filter blur-[80px]"
        ></motion.div>

        {/* Dotted Grid Pattern: Màu Navy cực nhạt */}
        <div className="absolute inset-0 bg-[radial-gradient(#193366_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >

        {/* Badge thông báo: Nền Navy nhạt, Chữ Navy đậm */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-white border border-[#193366]/10 rounded-full px-4 py-1.5 shadow-sm mb-8 cursor-default"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#193366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#193366]"></span>
          </span>
          <span className="text-sm font-medium text-gray-600">
            Hơn <span className="font-bold text-[#193366]"><CountUp end={350} duration={3} />+</span> lớp mới đang chờ bạn
          </span>
        </motion.div>

        {/* TIÊU ĐỀ CHÍNH: Màu Navy đậm #193366 */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#193366] mb-6"
        >
          Tìm lớp gia sư <br className="hidden md:block" />
          <span className="text-[#193366]/80 underline decoration-[#193366]/20 underline-offset-8">
            phù hợp nhất
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto font-medium mb-12">
          Kết nối trực tiếp với phụ huynh. Tự do lựa chọn môn học, khu vực và mức lương mong muốn.
        </motion.p>

        {/* --- SEARCH BOX (Interactive) --- */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          // Card nền trắng, border Navy nhạt
          className="bg-white p-2 rounded-2xl shadow-[0_20px_50px_-15px_rgba(25,51,102,0.1)] max-w-4xl mx-auto border border-[#193366]/5 relative z-20"
        >
          <div className="flex flex-col md:flex-row gap-2">

            {/* Input Môn học */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-focus-within:text-[#193366] transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 border border-transparent rounded-xl bg-[#f9f9f6] text-[#193366] placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium"
                placeholder="Nhập môn học (Toán, Lý, Piano...)"
              />
            </div>

            {/* Select Khu vực */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-[#193366] transition-colors" />
              </div>
              <select className="block w-full pl-11 pr-10 py-4 border border-transparent rounded-xl bg-[#f9f9f6] text-[#193366] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 appearance-none cursor-pointer transition-all font-medium">
                <option value="">Toàn quốc</option>
                <option value="hn">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="dn">Đà Nẵng</option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                <FaChevronDown size={12} />
              </div>
            </div>

            {/* Button Search: Navy Gradient hoặc Solid */}
            <button className="md:w-auto w-full bg-[#193366] hover:bg-[#193366]/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#193366]/20 hover:shadow-[#193366]/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
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
              whileHover={{ scale: 1.05, backgroundColor: "#193366", color: "#ffffff", borderColor: "#193366" }}
              whileTap={{ scale: 0.95 }}
              // Tag mặc định: Nền trắng, viền xám, text xám đậm
              className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 transition-colors shadow-sm"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* --- STATS SECTION (Animated CountUp) --- */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#193366]/10 pt-10"
        >
          {[
            { num: 1200, label: "Lớp học active", suffix: "+" },
            { num: 800, label: "Phụ huynh mới", suffix: "+" },
            { num: 100, label: "Miễn phí nhận lớp", suffix: "%" },
            { num: 24, label: "Hỗ trợ nhanh", suffix: "/7" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#193366] group-hover:text-[#193366]/80 transition-colors duration-300">
                <CountUp end={stat.num} duration={2.5} separator="," />{stat.suffix}
              </div>
              <div className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-wide group-hover:text-[#193366] transition-colors">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ClassHeader;