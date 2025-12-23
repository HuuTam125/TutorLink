import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt, FaClock, FaChalkboardTeacher,
  FaArrowRight, FaCalendarAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LatestClasses = () => {
  // Mock Data
  const classes = [
    {
      id: 1,
      subject: "Toán Lớp 9 (Ôn thi vào 10)",
      location: "Cầu Giấy, Hà Nội",
      price: "250.000",
      per: "/buổi",
      schedule: "3 buổi/tuần",
      time: "2 giờ trước",
      status: "urgent", // Gấp
      type: "Offline"
    },
    {
      id: 2,
      subject: "Tiếng Anh Giao Tiếp (Người đi làm)",
      location: "Online (Qua Zoom)",
      price: "300.000",
      per: "/buổi",
      schedule: "2 buổi/tuần (Tối)",
      time: "15 phút trước",
      status: "new", // Mới
      type: "Online"
    },
    {
      id: 3,
      subject: "Hóa Học Lớp 11 (Nâng cao)",
      location: "Quận 1, TP. HCM",
      price: "4.000.000",
      per: "/tháng",
      schedule: "Thỏa thuận",
      time: "1 ngày trước",
      status: "normal",
      type: "Offline"
    },
    {
      id: 4,
      subject: "Dạy đàn Piano cơ bản",
      location: "Thanh Xuân, Hà Nội",
      price: "350.000",
      per: "/buổi",
      schedule: "Cuối tuần",
      time: "3 ngày trước",
      status: "normal",
      type: "Offline"
    }
  ];

  // Helper colors - Chuyển sang tông màu trầm hơn, không dùng gradient quá gắt
  const getStatusStyle = (status) => {
    switch (status) {
      case 'urgent': return 'bg-red-50 text-red-600 border border-red-100'; // Đỏ nhạt sang trọng
      case 'new': return 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]'; // Xanh lá Google style
      default: return 'bg-[#193366]/5 text-[#193366] border border-[#193366]/10'; // Navy nhạt
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'urgent': return 'Gấp';
      case 'new': return 'Mới';
      default: return 'Đang tìm';
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, duration: 0.5 }
    }
  };

  // Màu nền section trùng với theme
  const SECTION_BG = "bg-[#f9f9f6]";
  // Màu cutout trùng với màu section để tạo hiệu ứng trong suốt
  const CUTOUT_COLOR = "bg-[#f9f9f6]";

  return (
    <section className={`py-24 ${SECTION_BG} overflow-hidden font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            {/* Tag nhỏ: Navy Style */}
            <span className="text-[#193366] font-bold tracking-wider uppercase text-xs bg-[#193366]/5 px-3 py-1 rounded-full border border-[#193366]/10">
              New Jobs
            </span>
            <h2 className="text-4xl font-extrabold text-[#193366] mt-3 mb-2">
              Lớp mới <span className="text-[#193366]/70 font-bold">đang chờ bạn</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Hàng trăm lớp học mới được cập nhật mỗi ngày. Nhận lớp phù hợp và bắt đầu dạy ngay.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/classes" className="flex items-center gap-2 font-bold text-[#193366] hover:text-[#193366]/80 transition-colors group">
              <span>Xem tất cả 240+ lớp</span>
              <span className="w-8 h-8 rounded-full bg-white border border-[#193366]/20 flex items-center justify-center group-hover:bg-[#193366] group-hover:text-white transition-all shadow-sm">
                <FaArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* --- TICKET GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {classes.map((item) => (
            <ClassTicket
              key={item.id}
              item={item}
              getStatusStyle={getStatusStyle}
              getStatusLabel={getStatusLabel}
              variants={itemVariants}
              cutoutClass={CUTOUT_COLOR}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

// --- SUB-COMPONENT: TICKET ITEM ---
const ClassTicket = ({ item, getStatusStyle, getStatusLabel, variants, cutoutClass }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -4 }}
      // Card: Nền trắng, Border Navy nhạt, Shadow nhẹ
      className="group flex flex-col sm:flex-row bg-white rounded-2xl shadow-sm border border-[#193366]/10 hover:shadow-[0_8px_30px_rgba(25,51,102,0.08)] hover:border-[#193366]/30 transition-all duration-300 overflow-hidden relative cursor-pointer"
    >
      {/* 1. Status Bar (Left Stripe - Màu Navy đậm làm điểm nhấn bên trái) */}
      <div className={`absolute top-0 bottom-0 left-0 w-1.5 bg-[#193366]`}></div>

      {/* 2. Main Content (Left) */}
      <div className="flex-1 p-6 pl-8 flex flex-col justify-between relative">
        {/* Top Meta */}
        <div className="flex justify-between items-start mb-3">
          {/* Status Badge: Style theo từng loại (Gấp, Mới...) */}
          <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide shadow-sm ${getStatusStyle(item.status)}`}>
            {getStatusLabel(item.status)}
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md font-medium border border-gray-100">
            <FaClock size={10} /> {item.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#193366] group-hover:text-[#193366]/80 transition-colors mb-4 line-clamp-1" title={item.subject}>
          {item.subject}
        </h3>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-2 overflow-hidden">
            <FaMapMarkerAlt className="text-gray-400 min-w-[14px]" />
            <span className="truncate" title={item.location}>{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-gray-400 min-w-[14px]" />
            <span className="truncate">{item.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400 min-w-[14px]" />
            <span className="truncate">{item.schedule}</span>
          </div>
        </div>
      </div>

      {/* 3. Perforated Line (Dashed Divider) */}
      <div className="relative hidden sm:flex flex-col items-center justify-center">
        {/* Đường đứt nét màu xám nhạt */}
        <div className="w-[1px] h-[80%] border-l-2 border-dashed border-gray-200"></div>

        {/* Cutout Circles: Dùng class cutoutClass để trùng màu nền cha (#f9f9f6) */}
        <div className={`absolute -top-3 w-5 h-5 rounded-full border-b border-[#193366]/10 ${cutoutClass}`}></div>
        <div className={`absolute -bottom-3 w-5 h-5 rounded-full border-t border-[#193366]/10 ${cutoutClass}`}></div>
      </div>

      {/* Mobile Horizontal Divider */}
      <div className="sm:hidden w-full h-[1px] border-t-2 border-dashed border-gray-200 relative">
        <div className={`absolute -left-3 -top-3 w-5 h-5 rounded-full border-r border-[#193366]/10 ${cutoutClass}`}></div>
        <div className={`absolute -right-3 -top-3 w-5 h-5 rounded-full border-l border-[#193366]/10 ${cutoutClass}`}></div>
      </div>

      {/* 4. Action Area (Right) */}
      <div className="sm:w-48 p-6 bg-[#f9f9f6]/50 flex flex-col justify-center items-center gap-4 text-center group-hover:bg-[#193366]/5 transition-colors">
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Thu nhập</p>
          <div className="text-xl font-extrabold text-[#193366] flex items-center justify-center">
            {item.price}<sup className="text-[10px] text-gray-500 font-normal mt-2 ml-0.5">đ{item.per}</sup>
          </div>
        </div>

        {/* Nút Nhận lớp: Viền Navy, Hover Navy đặc */}
        <button className="w-full py-2.5 px-4 bg-white border border-[#193366]/20 text-[#193366] font-bold text-sm rounded-xl shadow-sm hover:bg-[#193366] hover:text-white hover:border-[#193366] hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn">
          Nhận lớp <FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

    </motion.div>
  );
}

export default LatestClasses;