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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-[#F8F9FC] relative overflow-hidden">

      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated Blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px]"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px]"
        ></motion.div>

        {/* Dotted Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
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
              <span className="inline-block py-1 px-3 rounded-lg bg-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-3">
                Hỗ trợ 24/7
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Bạn cần tư vấn? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Chúng tôi ở đây để lắng nghe
                </span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Đừng ngần ngại liên hệ. Đội ngũ GiaSuVN cam kết phản hồi trong vòng <span className="font-bold text-gray-900">30 phút</span> làm việc.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <ContactCard
                icon={<FaPhoneAlt />}
                title="Hotline tư vấn"
                value="1900 6868"
                color="blue"
                delay={0}
              />
              <ContactCard
                icon={<FaEnvelope />}
                title="Email hỗ trợ"
                value="support@giasuvn.com"
                color="orange"
                delay={0.1}
              />
              <ContactCard
                icon={<FaMapMarkerAlt />}
                title="Văn phòng chính"
                value="Tầng 5, Tòa nhà Tech, Cầu Giấy, HN"
                color="green"
                delay={0.2}
              />
            </div>

            {/* Social Proof Text */}
            <div className="pt-4 flex items-center gap-3 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 5}`} className="w-8 h-8 rounded-full border-2 border-white" alt="support team" />)}
              </div>
              <span>Hơn 50+ tư vấn viên đang trực tuyến</span>
            </div>
          </motion.div>

          {/* --- CỘT PHẢI: FORM GỬI TIN NHẮN (GLASS EFFECT) --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 md:p-10 border border-white relative"
          >
            {/* Form Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Gửi tin nhắn trực tuyến</h3>
              <p className="text-gray-500 text-sm mt-2">Vui lòng điền thông tin, chúng tôi sẽ liên hệ lại ngay.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Họ và tên</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Số điện thoại</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <FaPhoneAlt />
                    </div>
                    <input
                      type="tel"
                      placeholder="0912 xxx xxx"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email (Không bắt buộc)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Nội dung hỗ trợ</label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <FaRegCommentDots />
                  </div>
                  <textarea
                    rows="4"
                    placeholder="Tôi muốn tìm gia sư môn Toán cho con lớp 9..."
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none font-medium"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button type="button" className="w-full group relative py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Gửi yêu cầu tư vấn
                </span>
              </button>

              <div className="text-center pt-2">
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
                  <FaFacebookMessenger className="text-xl text-blue-500" /> Chat qua Messenger
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
const ContactCard = ({ icon, title, value, color, delay }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-colors duration-300 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-0.5">{title}</p>
        <p className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{value}</p>
      </div>
    </motion.div>
  );
};

export default ContactSection;