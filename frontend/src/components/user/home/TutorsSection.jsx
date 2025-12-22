import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaStar, FaCheckCircle, FaHeart, FaMapMarkerAlt,
  FaArrowRight, FaRegHeart, FaGraduationCap, FaBolt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedTutors = () => {
  // Mock Data (Đã thêm trường isSuperTutor để demo badge)
  const tutors = [
    {
      id: 1,
      name: "Nguyễn Thùy Linh",
      avatar: "https://i.pravatar.cc/150?img=5",
      title: "IELTS 8.0 & TOEIC 990",
      school: "ĐH Ngoại Thương",
      rating: 5.0,
      reviews: 124,
      subjects: ["Tiếng Anh", "IELTS", "Giao tiếp"],
      location: "Hà Nội",
      price: "300.000đ",
      isSuperTutor: true
    },
    {
      id: 2,
      name: "Trần Minh Tuấn",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "Chuyên Toán Luyện Thi ĐH",
      school: "ĐH Sư Phạm TP.HCM",
      rating: 4.9,
      reviews: 86,
      subjects: ["Toán 12", "Luyện thi ĐH", "Tư duy"],
      location: "TP. HCM",
      price: "400.000đ",
      isSuperTutor: true
    },
    {
      id: 3,
      name: "Lê Bảo Châu",
      avatar: "https://i.pravatar.cc/150?img=9",
      title: "Gia sư Văn & Rèn chữ",
      school: "ĐH KHXH & NV",
      rating: 5.0,
      reviews: 42,
      subjects: ["Văn", "Tiếng Việt", "Rèn chữ"],
      location: "Đà Nẵng",
      price: "200.000đ",
      isSuperTutor: false
    },
    {
      id: 4,
      name: "Hoàng Văn Nam",
      avatar: "https://i.pravatar.cc/150?img=3",
      title: "Piano & Thanh nhạc",
      school: "Nhạc viện Hà Nội",
      rating: 4.8,
      reviews: 55,
      subjects: ["Piano", "Organ", "Nhạc lý"],
      location: "Hà Nội",
      price: "350.000đ",
      isSuperTutor: false
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
    <section className="py-24 bg-[#F8F9FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-50 px-3 py-1 rounded-full">Top Rated</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-3 mb-4 leading-tight">
              Gia sư <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Nổi bật tuần này</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Đội ngũ gia sư ưu tú, được xác thực kỹ càng và nhận được đánh giá cao nhất từ cộng đồng phụ huynh.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/tutors" className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md">
              <span>Xem tất cả</span>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
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

// --- SUB-COMPONENT: TUTOR CARD (Tách ra để code gọn hơn) ---
const TutorCard = ({ tutor, variants }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      variants={variants}
      className="group relative bg-white rounded-[2rem] border border-gray-100 hover:border-blue-100/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
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

        {/* Badge Super Tutor */}
        {tutor.isSuperTutor && (
          <div className="absolute top-6 left-6 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
            <FaBolt size={10} /> SUPER
          </div>
        )}

        {/* Avatar Container */}
        <div className="relative mb-4 group-hover:scale-105 transition-transform duration-500">
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>

          <img src={tutor.avatar} alt={tutor.name} className="relative w-28 h-28 rounded-full object-cover border-[4px] border-white shadow-md" />

          {/* Verified Badge */}
          <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full border-[3px] border-white shadow-sm" title="Đã xác thực">
            <FaCheckCircle size={10} />
          </div>
        </div>

        {/* Basic Info */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-1 group-hover:text-blue-600 transition-colors">
          {tutor.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <FaGraduationCap className="text-gray-400" />
          <span className="truncate max-w-[180px]">{tutor.school}</span>
        </div>

        {/* Rating Pill */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="font-bold text-sm text-gray-900">{tutor.rating}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="text-xs text-gray-500 font-medium">{tutor.reviews} đánh giá</span>
        </div>
      </div>

      {/* 2. Body Info (Subjects) */}
      <div className="p-6 py-4 flex-grow">
        <div className="flex flex-wrap justify-center gap-2">
          {tutor.subjects.map((sub, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors cursor-default">
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Footer (Price & Action) */}
      <div className="p-5 border-t border-gray-100 bg-gray-50/30 rounded-b-[2rem] flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
            <FaMapMarkerAlt size={10} /> {tutor.location}
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-extrabold text-blue-600">{tutor.price}</span>
            <span className="text-[10px] text-gray-400 font-medium">/buổi</span>
          </div>
        </div>

        <button className="relative overflow-hidden px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-lg shadow-gray-900/20 hover:shadow-blue-600/30 group/btn transition-all duration-300 active:scale-95">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            Mời dạy <FaArrowRight size={10} className="-rotate-45 group-hover/btn:rotate-0 transition-transform" />
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default FeaturedTutors;