import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaStar, FaCheckCircle, FaHeart, FaMapMarkerAlt,
  FaArrowRight, FaRegHeart, FaGraduationCap, FaBolt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedTutors = () => {
  // Mock Data
  const tutors = [
    {
      id: 1,
      name: "Nguyễn Bá Hoàng",
      avatar: "https://vcdn1-thethao.vnecdn.net/2022/08/11/01g65pycxasfyy3pqa55-166018425-7273-9947-1660184392.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=oVOlc2gzMCDicEBoNXECOQ",
      title: "IELTS 8.0 & TOEIC 990",
      school: "ĐH Công Nghệ Thông Tin",
      rating: 5.0,
      reviews: 124,
      subjects: ["Tiếng Anh", "IELTS", "Giao tiếp"],
      location: "TP. HCM",
      price: "300.000đ",
      isSuperTutor: true
    },
    {
      id: 2,
      name: "Bùi Văn Thạch",
      avatar: "https://www.shutterstock.com/image-photo/leipzig-germany-june-18-2024-600nw-2480563319.jpg",
      title: "Chuyên Toán Luyện Thi ĐH",
      school: "ĐH Công Nghệ Thông Tin",
      rating: 4.9,
      reviews: 86,
      subjects: ["Toán 12", "Luyện thi ĐH", "Tư duy"],
      location: "TP. HCM",
      price: "400.000đ",
      isSuperTutor: true
    },
    {
      id: 3,
      name: "Trần Hữu Tâm",
      avatar: "https://vcdn1-thethao.vnecdn.net/2022/12/19/fkscvpyvqaa1fv9-jfif-167139012-9444-5939-1671391905.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=3hRZ0Szr15s7C7xncexxuw",
      title: "Gia sư Văn & Rèn chữ",
      school: "ĐH Công Nghệ Thông Tin",
      rating: 5.0,
      reviews: 42,
      subjects: ["Văn", "Tiếng Việt", "Rèn chữ"],
      location: "TP. HCM",
      price: "200.000đ",
      isSuperTutor: true
    },
    {
      id: 4,
      name: "Nguyễn Quốc Nhật Khang",
      avatar: "https://www.shutterstock.com/image-photo/leipzig-germany-june-18-2024-600nw-2480563319.jpg",
      title: "Piano & Thanh nhạc",
      school: "ĐH Công Nghệ Thông Tin",
      rating: 4.8,
      reviews: 55,
      subjects: ["Piano", "Organ", "Nhạc lý"],
      location: "TP. HCM",
      price: "350.000đ",
      isSuperTutor: true
    }
  ];

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    // Nền Section: Màu kem ấm #f9f9f6
    <section className="py-24 bg-[#f9f9f6] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            {/* Tag nhỏ: Nền Navy nhạt 5%, Chữ Navy đậm */}
            <span className="text-[#193366] font-bold tracking-wider uppercase text-xs bg-[#193366]/5 px-3 py-1 rounded-full border border-[#193366]/10">
              Top Rated
            </span>
            <h2 className="text-4xl font-extrabold text-[#193366] mt-3 mb-4 leading-tight">
              Gia sư <span className="text-[#193366]/80 underline decoration-[#193366]/20 underline-offset-4 decoration-4">Nổi bật tuần này</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Đội ngũ gia sư ưu tú, được xác thực kỹ càng và nhận được đánh giá cao nhất từ cộng đồng phụ huynh.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Nút Xem tất cả: Border Navy nhạt, Hover Navy đậm */}
            <Link to="/tutors" className="group flex items-center gap-3 px-6 py-3 bg-white border border-[#193366]/20 rounded-full font-bold text-[#193366] hover:bg-[#193366] hover:text-white transition-all shadow-sm hover:shadow-lg">
              <span>Xem tất cả</span>
              <div className="w-8 h-8 rounded-full bg-[#193366]/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <FaArrowRight className="text-sm group-hover:-rotate-45 transition-transform duration-300" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* --- TUTOR GRID --- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} variants={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

// --- SUB-COMPONENT: TUTOR CARD ---
const TutorCard = ({ tutor, variants }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      variants={variants}
      // Card: Nền trắng, Border siêu nhạt, Hover: Shadow màu Navy
      className="group relative bg-white rounded-[2rem] border border-[#193366]/5 hover:border-[#193366]/20 shadow-[0_4px_20px_-10px_rgba(25,51,102,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(25,51,102,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      {/* 1. Header & Avatar */}
      <div className="p-6 pb-0 flex flex-col items-center relative">

        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm active:scale-90"
        >
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>

        {/* Badge Super Tutor (Giữ màu Vàng Cam để nổi bật đặc biệt) */}
        {tutor.isSuperTutor && (
          <div className="absolute top-6 left-6 z-10 flex items-center gap-1 bg-[#FFF9E6] border border-[#FFD700]/30 text-[#B7791F] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
            <FaBolt size={10} /> Nổi bật
          </div>
        )}

        {/* Avatar Container */}
        <div className="relative mb-4 group-hover:scale-105 transition-transform duration-500">
          {/* Decorative Ring: Navy nhạt */}
          <div className="absolute inset-0 rounded-full bg-[#193366]/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <img src={tutor.avatar} alt={tutor.name} className="relative w-28 h-28 rounded-full object-cover border-[4px] border-white shadow-md" />

          {/* Verified Badge: Navy Blue */}
          <div className="absolute bottom-1 right-1 bg-[#193366] text-white p-1.5 rounded-full border-[3px] border-white shadow-sm" title="Đã xác thực">
            <FaCheckCircle size={10} />
          </div>
        </div>

        {/* Basic Info */}
        <h3 className="text-xl font-bold text-[#193366] text-center mb-1 group-hover:text-[#193366]/80 transition-colors">
          {tutor.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2 font-medium">
          <FaGraduationCap className="text-gray-400" />
          <span className="truncate max-w-[180px]">{tutor.school}</span>
        </div>

        {/* Rating Pill */}
        <div className="flex items-center gap-2 bg-[#f9f9f6] px-3 py-1.5 rounded-xl border border-gray-100">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="font-bold text-sm text-[#193366]">{tutor.rating}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="text-xs text-gray-500 font-medium">{tutor.reviews} đánh giá</span>
        </div>
      </div>

      {/* 2. Body Info (Subjects) */}
      <div className="p-6 py-4 flex-grow">
        <div className="flex flex-wrap justify-center gap-2">
          {tutor.subjects.map((sub, idx) => (
            // Tag môn học: Hover đổi sang nền Navy, chữ trắng
            <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg group-hover:border-[#193366]/20 group-hover:bg-[#193366]/5 group-hover:text-[#193366] transition-colors cursor-default">
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Footer (Price & Action) */}
      <div className="p-5 border-t border-gray-100 bg-[#f9f9f6]/50 rounded-b-[2rem] flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
            <FaMapMarkerAlt size={10} /> {tutor.location}
          </span>
          <div className="flex items-baseline gap-0.5">
            {/* Giá tiền màu Navy đậm */}
            <span className="text-lg font-extrabold text-[#193366]">{tutor.price}</span>
            <span className="text-[10px] text-gray-400 font-medium">/buổi</span>
          </div>
        </div>

        {/* Nút Mời dạy: Nền Navy đậm #193366 */}
        <button className="relative overflow-hidden px-5 py-2.5 bg-[#193366] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#193366]/20 hover:shadow-[#193366]/40 hover:bg-[#193366]/90 transition-all duration-300 active:scale-95 group/btn">
          <span className="relative flex items-center gap-2">
            Mời dạy <FaArrowRight size={10} className="-rotate-45 group-hover/btn:rotate-0 transition-transform" />
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default FeaturedTutors;