import React from 'react';
import { motion } from 'framer-motion';
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane,
  FaFacebookMessenger, FaUser, FaRegCommentDots
} from 'react-icons/fa';

const ContactSection = () => {

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    // Nền kem ấm #f9f9f6 trùng với theme
    <section className="py-24 bg-[#f9f9f6] relative overflow-hidden font-sans">

      {/* --- BACKGROUND DECORATION (Minimalist) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated Blobs: Thay màu xanh sáng bằng Navy nhạt */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#193366]/5 rounded-full mix-blend-multiply filter blur-[80px]"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#193366]/5 rounded-full mix-blend-multiply filter blur-[80px]"
        ></motion.div>

        {/* Dotted Grid Pattern: Màu Navy cực nhạt */}
        <div className="absolute inset-0 bg-[radial-gradient(#193366_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* --- CỘT TRÁI: THÔNG TIN LIÊN HỆ --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block py-1 px-3 rounded-lg bg-[#193366]/5 text-[#193366] text-xs font-bold tracking-wider uppercase mb-3 border border-[#193366]/10">
                Hỗ trợ 24/7
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#193366] mb-6 leading-tight">
                Bạn cần tư vấn? <br />
                <span className="text-[#193366]/80">
                  Chúng tôi ở đây để lắng nghe
                </span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                Đừng ngần ngại liên hệ. Đội ngũ GiaSuVN cam kết phản hồi trong vòng <span className="font-bold text-[#193366]">30 phút</span> làm việc.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <ContactCard
                icon={<FaPhoneAlt />}
                title="Hotline tư vấn"
                value="1900 6868"
                delay={0}
              />
              <ContactCard
                icon={<FaEnvelope />}
                title="Email hỗ trợ"
                value="support@giasuvn.com"
                delay={0.1}
              />
              <ContactCard
                icon={<FaMapMarkerAlt />}
                title="Văn phòng chính"
                value="Tầng 5, Tòa nhà Tech, Cầu Giấy, HN"
                delay={0.2}
              />
            </div>

            {/* Social Proof Text */}
            <div className="pt-4 flex items-center gap-3 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 5}`} className="w-8 h-8 rounded-full border-2 border-[#f9f9f6]" alt="support team" />)}
              </div>
              <span>Hơn 50+ tư vấn viên đang trực tuyến</span>
            </div>
          </motion.div>

          {/* --- CỘT PHẢI: FORM GỬI TIN NHẮN --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            // Form nền trắng, đổ bóng Navy nhạt
            className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(25,51,102,0.1)] p-8 md:p-10 border border-[#193366]/5 relative"
          >
            {/* Form Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#193366]">Gửi tin nhắn trực tuyến</h3>
              <p className="text-gray-500 text-sm mt-2 font-medium">Vui lòng điền thông tin, chúng tôi sẽ liên hệ lại ngay.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-sm font-bold text-[#193366] mb-2 ml-1">Họ và tên</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#193366] transition-colors">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="group">
                  <label className="block text-sm font-bold text-[#193366] mb-2 ml-1">Số điện thoại</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#193366] transition-colors">
                      <FaPhoneAlt />
                    </div>
                    <input
                      type="tel"
                      placeholder="0912 xxx xxx"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-bold text-[#193366] mb-2 ml-1">Email (Không bắt buộc)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#193366] transition-colors">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="group">
                <label className="block text-sm font-bold text-[#193366] mb-2 ml-1">Nội dung hỗ trợ</label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#193366] transition-colors">
                    <FaRegCommentDots />
                  </div>
                  <textarea
                    rows="4"
                    placeholder="Tôi muốn tìm gia sư môn Toán cho con lớp 9..."
                    className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all resize-none font-medium placeholder-gray-400"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button: Navy Gradient nhẹ hoặc Solid */}
              <button type="button" className="w-full group relative py-4 bg-[#193366] text-white font-bold rounded-xl shadow-lg shadow-[#193366]/20 hover:shadow-[#193366]/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Gửi yêu cầu tư vấn
                </span>
              </button>

              <div className="text-center pt-2">
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#193366] transition-colors">
                  <FaFacebookMessenger className="text-xl text-[#0084FF]" /> Chat qua Messenger
                </a>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: CONTACT CARD ---
const ContactCard = ({ icon, title, value, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      // Card nền trắng, border nhạt, hover đổi viền Navy
      className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-[#193366]/5 hover:shadow-lg hover:border-[#193366]/20 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
    >
      {/* Icon Box: Mặc định Navy nhạt, Hover Navy đậm */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-colors duration-300 bg-[#193366]/5 text-[#193366] group-hover:bg-[#193366] group-hover:text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-0.5">{title}</p>
        <p className="text-lg font-bold text-[#193366] group-hover:text-[#193366]/80 transition-colors">{value}</p>
      </div>
    </motion.div>
  );
};

export default ContactSection;