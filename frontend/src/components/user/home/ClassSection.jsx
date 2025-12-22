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
      status: "urgent",
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
      status: "new",
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

  // Helper colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'from-red-500 to-rose-600';
      case 'new': return 'from-emerald-400 to-green-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'urgent': return 'Gấp';
      case 'new': return 'Mới';
      default: return 'Đang tìm';
    }
  };

  // Animation Variants (Hiệu ứng xuất hiện lần lượt)
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

  // Màu nền section (Dùng chung cho cutout để tạo ảo giác trong suốt)
  const SECTION_BG = "bg-[#F8F9FC]";

  return (
    <section className={`py-24 ${SECTION_BG} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm bg-indigo-50 px-3 py-1 rounded-full">New Jobs</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-3 mb-2">Lớp mới <span className="text-indigo-600">đang chờ bạn</span></h2>
            <p className="text-gray-500 text-lg">Hàng trăm lớp học mới được cập nhật mỗi ngày. Nhận lớp phù hợp và bắt đầu dạy ngay.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/classes" className="flex items-center gap-2 font-bold text-gray-700 hover:text-indigo-600 transition-colors group">
              <span>Xem tất cả 240+ lớp</span>
              <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all">
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
              getStatusColor={getStatusColor}
              getStatusLabel={getStatusLabel}
              variants={itemVariants}
              bgClass={SECTION_BG}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

// --- SUB-COMPONENT: TICKET ITEM ---
const ClassTicket = ({ item, getStatusColor, getStatusLabel, variants, bgClass }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, scale: 1.01 }} // Hiệu ứng hover nổi lên
      className="group flex flex-col sm:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-indigo-100 transition-all duration-300 overflow-hidden relative cursor-pointer"
    >
      {/* 1. Status Bar (Left Stripe) */}
      <div className={`absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b ${getStatusColor(item.status)}`}></div>

      {/* 2. Main Content (Left) */}
      <div className="flex-1 p-6 pl-8 flex flex-col justify-between relative">
        {/* Top Meta */}
        <div className="flex justify-between items-start mb-3">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide text-white bg-gradient-to-r ${getStatusColor(item.status)} shadow-sm ${item.status === 'urgent' ? 'animate-pulse' : ''}`}>
            {getStatusLabel(item.status)}
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <FaClock size={10} /> {item.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-4 line-clamp-1" title={item.subject}>
          {item.subject}
        </h3>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600">
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
        <div className="w-[1px] h-[80%] border-l-2 border-dashed border-gray-200"></div>

        {/* Cutout Circles (Màu nền cutout phải trùng với bgClass của Section) */}
        <div className={`absolute -top-3 w-6 h-6 rounded-full border-b border-gray-200 ${bgClass}`}></div>
        <div className={`absolute -bottom-3 w-6 h-6 rounded-full border-t border-gray-200 ${bgClass}`}></div>
      </div>

      {/* Mobile Horizontal Divider */}
      <div className="sm:hidden w-full h-[1px] border-t-2 border-dashed border-gray-200 relative">
        <div className={`absolute -left-3 -top-3 w-6 h-6 rounded-full border-r border-gray-200 ${bgClass}`}></div>
        <div className={`absolute -right-3 -top-3 w-6 h-6 rounded-full border-l border-gray-200 ${bgClass}`}></div>
      </div>

      {/* 4. Action Area (Right) */}
      <div className="sm:w-48 p-6 bg-gray-50/50 flex flex-col justify-center items-center gap-4 text-center group-hover:bg-indigo-50/30 transition-colors">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Thu nhập dự kiến</p>
          <div className="text-xl font-extrabold text-gray-900 flex items-center justify-center">
            {item.price}<sup className="text-[10px] text-gray-500 font-normal mt-2">đ{item.per}</sup>
          </div>
        </div>

        <button className="w-full py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-indigo-200 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn">
          Nhận lớp <FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

    </motion.div>
  );
}

export default LatestClasses;