import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const TestimonialsAndCTA = () => {
  // Mock Data
  const reviews = [
    {
      id: 1,
      content: "Tôi đã tìm được gia sư tiếng Anh cho con chỉ sau 2 tiếng. Thầy giáo rất nhiệt tình, phương pháp dạy hiện đại. Điểm số của bé cải thiện rõ rệt.",
      author: "Chị Thu Hà",
      role: "Phụ huynh - Hà Nội",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5
    },
    {
      id: 2,
      content: "Là sinh viên Sư phạm, web giúp mình có thêm thu nhập ổn định 5-7tr/tháng mà không mất phí môi giới cắt cổ như trung tâm bên ngoài.",
      author: "Bạn Minh Tú",
      role: "Gia sư Sinh viên",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5
    },
    {
      id: 3,
      content: "Giao diện web rất dễ dùng, bộ lọc tìm kiếm thông minh. Mình tìm được lớp dạy Toán gần nhà, tiết kiệm bao nhiêu xăng xe đi lại.",
      author: "Thầy Hoàng",
      role: "Giáo viên THPT",
      avatar: "https://i.pravatar.cc/150?img=59",
      rating: 4
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      {/* --- 1. TESTIMONIALS (Dark/Modern Tech Vibe) --- */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-400 font-bold tracking-wider uppercase text-sm"
            >
              Wall of Love
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-6"
            >
              Người dùng nói gì về <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">TutorLink?</span>
            </motion.h2>
          </div>

          {/* Reviews Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                whileHover={{ y: -10 }} // Hover effect
                className={`p-8 rounded-3xl border border-white/10 backdrop-blur-md relative group transition-all duration-300
                  ${idx === 1 ? 'bg-gradient-to-b from-white/10 to-white/5 md:-translate-y-8 shadow-2xl shadow-blue-900/20' : 'bg-white/5 hover:bg-white/10'}
                `}
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="text-blue-500 text-3xl mb-6 opacity-50" />

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  "{review.content}"
                </p>

                {/* Footer: User Info */}
                <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-6">
                  <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border-2 border-blue-500/50" />
                  <div>
                    <h4 className="font-bold text-white text-base">{review.author}</h4>
                    <p className="text-sm text-gray-400">{review.role}</p>
                  </div>

                  {/* Rating Stars */}
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`text-xs ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 2. BIG CTA SECTION (The Grand Finale) --- */}
      <section className="py-28 relative overflow-hidden flex items-center justify-center">

        {/* Background Mesh Gradient (Hiệu ứng nền aurora) */}
        <div className="absolute inset-0 bg-white z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-200 via-indigo-200 to-purple-200 rounded-full blur-[120px] opacity-60 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
              Sẵn sàng bứt phá <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">kết quả học tập?</span>
            </h2>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Tham gia cộng đồng <strong className="text-gray-900">50,000+</strong> thành viên ngay hôm nay.
              Hoàn toàn miễn phí để bắt đầu kết nối.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
              {/* Primary Button */}
              <button className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  Tìm Gia sư ngay <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Secondary Button */}
              <button className="group px-8 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-full text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg flex items-center gap-2">
                <FaCheckCircle className="text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                Đăng ký làm Gia sư
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-400">Không cần thẻ tín dụng • Hủy bất kỳ lúc nào</p>
          </motion.div>
        </div>
      </section>

      {/* CSS Animation */}
      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </>
  );
};

export default TestimonialsAndCTA;