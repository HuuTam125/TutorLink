import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowRight, FaCheckCircle, FaUserGraduate } from 'react-icons/fa';

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
      {/* --- 1. TESTIMONIALS (Clean & Trustworthy) --- */}
      {/* Nền kem ấm #f9f9f6 để đồng bộ với theme */}
      <section className="py-24 bg-[#f9f9f6] relative overflow-hidden font-sans">

        {/* Background Pattern Minimalist */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#193366]/5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#193366]/5 rounded-tr-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#193366] font-bold tracking-wider uppercase text-xs bg-[#193366]/5 px-3 py-1 rounded-full border border-[#193366]/10"
            >
              Wall of Love
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-[#193366] mt-3 mb-6"
            >
              Người dùng nói gì về <span className="text-[#193366] underline decoration-[#193366]/30 decoration-4 underline-offset-4">TutorLink?</span>
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
                whileHover={{ y: -6 }}
                // Card Style: Nền trắng, Border Navy nhạt, Shadow nhẹ
                className={`p-8 rounded-3xl border border-[#193366]/5 relative group transition-all duration-300
                  ${idx === 1
                    ? 'bg-white shadow-[0_20px_40px_-15px_rgba(25,51,102,0.1)] md:-translate-y-4 z-10'
                    : 'bg-white/60 hover:bg-white shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(25,51,102,0.08)]'}
                `}
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="text-[#193366]/20 text-3xl mb-6" />

                {/* Content */}
                <p className="text-gray-600 leading-relaxed mb-8 text-lg font-medium italic">
                  "{review.content}"
                </p>

                {/* Footer: User Info */}
                <div className="flex items-center gap-4 mt-auto border-t border-[#193366]/5 pt-6">
                  <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border border-[#193366]/10" />
                  <div>
                    <h4 className="font-bold text-[#193366] text-base">{review.author}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{review.role}</p>
                  </div>

                  {/* Rating Stars */}
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`text-xs ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 2. BIG CTA SECTION (Navy Theme) --- */}
      <section className="py-28 bg-white relative overflow-hidden flex items-center justify-center font-sans">

        {/* Decor: Vòng tròn mờ Navy cực lớn làm nền */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#193366]/[0.02] rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Icon lớn trang trí */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#193366]/5 text-[#193366] mb-8">
              <FaUserGraduate size={32} />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#193366] mb-6 tracking-tight leading-[1.1]">
              Sẵn sàng bứt phá <br />
              <span className="text-[#193366]/80">kết quả học tập?</span>
            </h2>

            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Tham gia cộng đồng <strong className="text-[#193366]">50,000+</strong> thành viên ngay hôm nay.
              Hoàn toàn miễn phí để bắt đầu kết nối.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
              {/* Primary Button: Navy Solid */}
              <button className="group relative px-8 py-4 bg-[#193366] text-white font-bold rounded-full text-lg shadow-xl shadow-[#193366]/20 hover:shadow-2xl hover:shadow-[#193366]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden min-w-[200px]">
                <span className="relative flex items-center justify-center gap-3">
                  Tìm Gia sư ngay <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Secondary Button: White with Navy Border */}
              <button className="group px-8 py-4 bg-white text-[#193366] border-2 border-[#193366]/10 font-bold rounded-full text-lg hover:border-[#193366] hover:bg-[#193366]/5 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 min-w-[200px]">
                <FaCheckCircle className="text-[#193366] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                Đăng ký làm Gia sư
              </button>
            </div>

            <p className="mt-8 text-sm text-gray-400 font-medium">
              Không cần thẻ tín dụng • Hủy bất kỳ lúc nào
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsAndCTA;