import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowDown, FaGraduationCap, FaStar, FaHeadset } from 'react-icons/fa';

const TutorHeader = () => {
  // 1. Cấu hình Animation xuất hiện (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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

  // 2. Cấu hình Animation trôi bồng bềnh (Floating)
  const floatingVariant = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    // Nền kem ấm #f9f9f6
    <div className="relative bg-[#f9f9f6] overflow-hidden font-sans">

      {/* --- BACKGROUND DECORATION --- */}
      {/* Khối nền chéo bên phải: Navy nhạt */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:block absolute right-0 top-0 h-full w-1/2 bg-[#193366]/5 -skew-x-12 translate-x-20"
      ></motion.div>

      {/* Blob trang trí: Navy nhạt hơn nữa */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-64 h-64 bg-[#193366]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"
      ></motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* --- CỘT TRÁI: TEXT & LỢI ÍCH --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="space-y-4">
              {/* Label: Nền Navy nhạt, Chữ Navy */}
              <motion.span variants={itemVariants} className="inline-block py-1 px-3 rounded-lg bg-[#193366]/10 text-[#193366] text-xs font-bold uppercase tracking-wider border border-[#193366]/10">
                Dành cho Phụ huynh & Học sinh
              </motion.span>

              {/* Headline: Navy đậm */}
              <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl font-extrabold text-[#193366] tracking-tight leading-tight">
                Tìm gia sư giỏi <br />
                <span className="text-[#193366]/80 underline decoration-[#193366]/20 underline-offset-8">
                  chỉ trong 2 phút
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-gray-500 max-w-lg font-medium">
                Điền thông tin lớp học, yêu cầu của bạn và nhận danh sách gia sư phù hợp nhất. Hoàn toàn miễn phí đăng tin.
              </motion.p>
            </div>

            {/* Danh sách lợi ích */}
            <motion.div variants={itemVariants} className="space-y-3">
              {[
                "Kết nối trực tiếp, không qua trung gian",
                "Gia sư đã được xác thực danh tính & bằng cấp",
                "Học thử 01 buổi miễn phí để đánh giá",
                "Đổi gia sư miễn phí nếu không phù hợp"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E6F4EA] flex items-center justify-center">
                    <FaCheckCircle className="w-3.5 h-3.5 text-[#137333]" />
                  </div>
                  <span className="text-gray-600 font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="pt-4 flex items-center gap-2 text-[#193366] font-bold cursor-pointer group w-fit"
            >
              <span className="group-hover:text-[#193366]/80 transition-colors">Bắt đầu điền thông tin bên dưới</span>
              <div className="p-2 bg-[#193366]/10 rounded-full group-hover:bg-[#193366]/20 transition-colors">
                <FaArrowDown className="w-4 h-4 animate-bounce text-[#193366]" />
              </div>
            </motion.div>
          </motion.div>

          {/* --- CỘT PHẢI: HÌNH ẢNH MINH HỌA --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Hình nền tròn trang trí (Pulse Effect - Navy nhạt) */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] bg-[#193366]/5 rounded-full"
            ></motion.div>

            {/* Hình ảnh chính */}
            <div className="relative z-10 transform hover:scale-[1.02] transition-transform duration-700 ease-in-out">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Student happy learning"
                className="rounded-[2.5rem] shadow-2xl shadow-[#193366]/10 mx-auto w-full max-w-md object-cover h-[400px] lg:h-[500px] border-8 border-white"
              />

              {/* Floating Card 1: Kết quả */}
              <motion.div
                variants={floatingVariant}
                animate="animate"
                className="absolute bottom-10 -left-6 lg:-left-12 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-[0_10px_30px_rgba(25,51,102,0.15)] border border-[#193366]/5 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#FFF9E6] rounded-full flex items-center justify-center text-[#B7791F] shadow-sm">
                  <FaGraduationCap size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kết quả</p>
                  <p className="text-sm font-bold text-[#193366]">Tìm được gia sư ưng ý</p>
                  <div className="flex mt-1 text-yellow-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => <FaStar key={star} size={12} />)}
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2: Support */}
              <motion.div
                variants={floatingVariant}
                animate="animate"
                transition={{ delay: 1.5 }}
                className="hidden sm:flex absolute top-10 -right-6 lg:-right-8 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-[0_10px_30px_rgba(25,51,102,0.15)] items-center gap-3 border border-[#193366]/5"
              >
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeadset className="text-gray-400 text-sm" />
                  <span className="text-xs font-bold text-[#193366]">Hỗ trợ 24/7</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Đường kẻ mờ Navy */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#193366]/10 to-transparent"></div>
    </div>
  );
};

export default TutorHeader;