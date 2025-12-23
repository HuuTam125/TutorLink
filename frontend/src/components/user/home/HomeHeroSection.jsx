import React from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch, FaMapMarkerAlt, FaBookOpen,
  FaUserGraduate, FaChevronDown
} from 'react-icons/fa';

// Component Select tùy chỉnh
const CustomSelect = ({ icon, placeholder, options }) => (
  <div className="relative group">
    {/* Icon bên trái - đổi sang màu xanh chủ đạo nhưng nhạt hơn chút để tinh tế */}
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#193366]/60 z-10">
      {icon}
    </div>

    <div className="relative">
      <select className="w-full h-12 pl-10 pr-10 bg-white hover:bg-white border border-[#193366]/10 rounded-xl text-sm font-semibold text-[#193366] outline-none focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/40 transition-all appearance-none cursor-pointer placeholder-gray-400 shadow-sm">
        <option value="" disabled selected className="text-gray-400">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value} className="text-gray-700">{opt.label}</option>
        ))}
      </select>

      {/* Icon Chevron bên phải */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#193366]/40 pointer-events-none">
        <FaChevronDown size={10} />
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  return (
    // Background chính: #f9f9f6 (Màu kem ấm)
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#f9f9f6] font-sans">

      {/* --- BACKGROUND EFFECTS --- */}
      {/* Hiệu ứng nền mờ nhẹ, sử dụng chính màu xanh #193366 với độ trong suốt cực thấp (5%) để hòa vào nền kem */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#193366]/5 via-[#f9f9f6] to-[#f9f9f6]"></div>

      {/* Grid Pattern màu xám cực nhạt để giữ nền sạch */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* --- LEFT CONTENT --- */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-4">
              {/* Badge: Nền xanh nhạt 10%, Chữ xanh đậm */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-[#193366]/10 text-[#193366] rounded-full text-sm font-bold tracking-wide border border-[#193366]/10"
              >
                🎓 Nền tảng gia sư #1 Việt Nam
              </motion.span>

              {/* Heading: Màu xanh đậm #193366 toàn bộ */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#000000] leading-[1.15] tracking-tight">
                Tìm Gia Sư Giỏi <br />
                <span className="text-[#193366]">Nâng Tầm Tri Thức</span>
              </h1>

              {/* Description: Màu xám trung tính để dễ đọc trên nền kem */}
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed font-medium">
                Kết nối với hơn 10,000+ gia sư uy tín trên toàn quốc. Hồ sơ minh bạch, học thử miễn phí, cam kết chất lượng.
              </p>
            </div>

            {/* --- SEARCH BOX --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              // Card nền trắng để nổi bật trên nền kem #f9f9f6
              className="bg-white p-4 md:p-6 rounded-2xl shadow-[0_8px_30px_rgb(25,51,102,0.06)] border border-[#193366]/5 space-y-4"
            >
              <div className="grid md:grid-cols-3 gap-3">
                <CustomSelect
                  icon={<FaBookOpen size={16} />}
                  placeholder="Chọn môn học"
                  options={[
                    { value: 'math', label: 'Toán học' },
                    { value: 'lit', label: 'Ngữ văn' },
                    { value: 'eng', label: 'Tiếng Anh' },
                  ]}
                />

                <CustomSelect
                  icon={<FaUserGraduate size={16} />}
                  placeholder="Chọn lớp"
                  options={[
                    { value: '1-5', label: 'Lớp 1 - 5' },
                    { value: '6-9', label: 'Lớp 6 - 9' },
                    { value: '10-12', label: 'Lớp 10 - 12' },
                  ]}
                />

                <CustomSelect
                  icon={<FaMapMarkerAlt size={16} />}
                  placeholder="Khu vực"
                  options={[
                    { value: 'hn', label: 'Hà Nội' },
                    { value: 'hcm', label: 'TP. Hồ Chí Minh' },
                  ]}
                />
              </div>

              {/* Button: Màu xanh đậm #193366 */}
              <button className="w-full h-12 bg-[#193366] hover:bg-[#193366]/90 text-white text-base font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#193366]/20 active:scale-[0.98]">
                <FaSearch size={16} />
                Tìm gia sư ngay
              </button>
            </motion.div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
              {[
                'Miễn phí đăng ký',
                'Học thử trước khi chọn',
                'Hỗ trợ 24/7'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {/* Dot xanh đậm */}
                  <div className="w-1.5 h-1.5 bg-[#193366] rounded-full" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- RIGHT IMAGE --- */}
          <div className="relative hidden lg:block">
            <motion.div
              className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-[#193366]/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <img
                src="https://giasunhattam.vn/wp-content/uploads/2021/07/gia-su-online.jpg"
                alt="Gia sư hướng dẫn"
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
              />

              {/* Overlay nhẹ */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#193366]/20 via-transparent to-transparent"></div>

              {/* Floating Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                    ].map((src, i) => (
                      <img key={i} src={src} alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                    ))}
                  </div>
                  <div>
                    {/* Text xanh đậm */}
                    <p className="font-bold text-[#193366] text-sm leading-tight">+2,500 gia sư mới</p>
                    <p className="text-xs text-gray-500 font-medium">tham gia trong tháng này</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;