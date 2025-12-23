import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSearchPlus, FaComments, FaHandshake, FaArrowRight } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Tạo hồ sơ",
      desc: "Đăng ký tài khoản nhanh chóng. Phụ huynh đăng yêu cầu, Gia sư cập nhật hồ sơ năng lực.",
    },
    {
      id: 2,
      icon: <FaSearchPlus />,
      title: "Tìm & Kết nối",
      desc: "Hệ thống AI gợi ý danh sách phù hợp nhất. Chủ động gửi lời mời hoặc ứng tuyển ngay.",
    },
    {
      id: 3,
      icon: <FaComments />,
      title: "Trao đổi & Dạy thử",
      desc: "Phỏng vấn trực tiếp để thấu hiểu. Sắp xếp 1-2 buổi dạy thử đánh giá mức độ phù hợp.",
    },
    {
      id: 4,
      icon: <FaHandshake />,
      title: "Nhận lớp chính thức",
      desc: "Thống nhất lộ trình và học phí. Cam kết chất lượng và bắt đầu hành trình tri thức.",
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">

      {/* Background Decor Minimalist */}
      <div className="absolute inset-0 bg-[radial-gradient(#193366_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-[#193366] mb-6 tracking-tight"
          >
            Quy trình <span className="relative inline-block text-[#193366]">
              Đơn giản hóa
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#193366]/10 -z-10"></span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 font-medium"
          >
            Chúng tôi tối ưu hóa mọi bước đi để bạn tiết kiệm thời gian quý báu. Chỉ mất 4 bước để kết nối thành công.
          </motion.p>
        </div>

        {/* --- STEPS CONTAINER --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8"
        >

          {/* CONNECTING LINE (Desktop - Dashed Navy) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] border-t-2 border-dashed border-[#193366]/10 -z-10 mt-2"></div>

          {/* STEP ITEMS */}
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group cursor-default"
            >

              {/* Icon Container with Hover Effects */}
              <div className="relative mb-8">
                {/* Ping Effect Ring (Màu Navy nhạt) */}
                <div className={`absolute inset-0 bg-[#193366] rounded-full opacity-0 group-hover:animate-ping transition-opacity duration-300 scale-75`}></div>

                {/* Main Icon Circle */}
                <div className={`relative w-24 h-24 rounded-[2rem] bg-white border border-[#193366]/10 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_-10px_rgba(25,51,102,0.2)] group-hover:-translate-y-2 transition-all duration-500 flex items-center justify-center z-10`}>

                  {/* Background Blob inside Icon */}
                  <div className={`absolute inset-2 rounded-[1.5rem] bg-[#193366]/5 group-hover:bg-[#193366] transition-colors duration-500`}></div>

                  {/* The Icon */}
                  {/* SỬA LỖI MÀU ICON: Dùng text-[#193366] và group-hover:text-white */}
                  <span className={`relative text-3xl text-[#193366] group-hover:text-white transition-colors duration-500`}>
                    {step.icon}
                  </span>

                  {/* Step Number Badge (Floating) */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#193366] text-white text-sm font-bold flex items-center justify-center border-4 border-white shadow-sm z-20">
                    {step.id}
                  </div>
                </div>

                {/* Arrow Connector (Mobile Only) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-[#193366]/20">
                    <FaArrowRight className="rotate-90" />
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#193366] mb-3 group-hover:text-[#193366]/80 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[15px] px-2 font-medium">
                {step.desc}
              </p>

            </motion.div>
          ))}

        </motion.div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 bg-[#193366] text-white font-bold rounded-full shadow-lg shadow-[#193366]/20 hover:bg-[#193366]/90 hover:shadow-[#193366]/40 hover:-translate-y-1 transition-all duration-300">
            Bắt đầu ngay hôm nay
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;