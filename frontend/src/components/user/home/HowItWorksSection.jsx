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
      color: "blue"
    },
    {
      id: 2,
      icon: <FaSearchPlus />,
      title: "Tìm & Kết nối",
      desc: "Hệ thống AI gợi ý danh sách phù hợp nhất. Chủ động gửi lời mời hoặc ứng tuyển ngay.",
      color: "indigo"
    },
    {
      id: 3,
      icon: <FaComments />,
      title: "Trao đổi & Dạy thử",
      desc: "Phỏng vấn trực tiếp để thấu hiểu. Sắp xếp 1-2 buổi dạy thử đánh giá mức độ phù hợp.",
      color: "purple"
    },
    {
      id: 4,
      icon: <FaHandshake />,
      title: "Nhận lớp chính thức",
      desc: "Thống nhất lộ trình và học phí. Cam kết chất lượng và bắt đầu hành trình tri thức.",
      color: "emerald"
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
    <section className="py-24 bg-white relative overflow-hidden">

      {/* Background Decor (Optional) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Quy trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Đơn giản hóa</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500"
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

          {/* CONNECTING LINE (Desktop Animation) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full overflow-hidden">
            {/* Animated Beam */}
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"
            ></motion.div>
          </div>

          {/* STEP ITEMS */}
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center group cursor-default"
            >

              {/* Icon Container with Hover Effects */}
              <div className="relative mb-8">
                {/* Ping Effect Ring */}
                <div className={`absolute inset-0 bg-${step.color}-400 rounded-full opacity-0 group-hover:animate-ping transition-opacity duration-300`}></div>

                {/* Main Icon Circle */}
                <div className={`relative w-24 h-24 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] group-hover:-translate-y-2 transition-all duration-500 flex items-center justify-center z-10`}>

                  {/* Background Blob inside Icon */}
                  <div className={`absolute inset-2 rounded-[1.5rem] bg-${step.color}-50 group-hover:bg-${step.color}-600 transition-colors duration-500`}></div>

                  {/* The Icon */}
                  <span className={`relative text-3xl text-${step.color}-600 group-hover:text-white transition-colors duration-500`}>
                    {step.icon}
                  </span>

                  {/* Step Number Badge (Floating) */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center border-4 border-white shadow-sm z-20">
                    {step.id}
                  </div>
                </div>

                {/* Arrow Connector (Mobile Only) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-gray-300">
                    <FaArrowRight className="rotate-90" />
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[15px] px-2">
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
          <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300">
            Bắt đầu ngay hôm nay
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;