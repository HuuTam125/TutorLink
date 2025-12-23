import React from 'react';
import {
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBookOpen,
  FaWifi,
  FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();

  // Safe data access
  const name = tutor.user?.fullName || 'Gia sư';
  const avatar = tutor.user?.avatar || 'https://via.placeholder.com/150';
  const bio = tutor.bio || 'Chưa có giới thiệu...';
  const area = tutor.area || 'Toàn quốc';

  // New fields data
  const university = tutor.university || 'Đại học Sư Phạm';
  const major = tutor.major || 'Sư phạm Toán';

  const subjects = tutor.subjects?.length ? tutor.subjects.slice(0, 3).join(', ') + (tutor.subjects.length > 3 ? '...' : '') : 'Nhiều môn';
  const method = tutor.teachingMethod || 'online';
  const price = tutor.hourlyRate || 0;
  const rating = tutor.rating || 5.0;

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);

  return (
    <div
      onClick={() => navigate(`/tutors/${tutor._id}`)}
      // Card Style: White bg, Navy border hover, Navy shadow hover
      className="
        group relative w-full bg-white rounded-2xl 
        border border-[#193366]/5
        hover:border-[#193366]/30
        shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)]
        hover:shadow-[0_12px_30px_-8px_rgba(25,51,102,0.15)]
        hover:-translate-y-1
        transition-all duration-300 ease-out cursor-pointer
        flex flex-col overflow-hidden font-sans
      "
    >
      {/* Badge Method (Góc trên phải) */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`
          flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm
          ${method === 'online' ? 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]' :
            method === 'offline' ? 'bg-[#FFF9E6] text-[#B7791F] border-[#FFE082]' :
              'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]'}
        `}>
          {method === 'online' ? <FaWifi /> : null}
          {method === 'both' ? 'offline' : method}
        </span>
      </div>

      <div className="p-5 flex flex-col h-full">
        {/* 1. Header: Avatar & Name */}
        <div className="flex gap-4 items-start mb-4">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            {/* Rating Pill overlapping avatar */}
            <div className="absolute -bottom-2 -right-2 bg-white px-1.5 py-0.5 rounded-lg shadow-sm border border-gray-100 flex items-center gap-1">
              <FaStar className="text-yellow-400 text-[10px]" />
              <span className="text-[10px] font-bold text-[#193366]">{rating}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-1 mb-1">
              {/* Name: Navy Color */}
              <h3 className="font-bold text-[#193366] text-lg truncate group-hover:text-[#193366]/80 transition-colors">
                {name}
              </h3>
              <FaCheckCircle className="text-blue-500 text-xs flex-shrink-0" title="Đã xác thực" />
            </div>

            {/* University Section */}
            <div className="flex items-start gap-1.5 text-xs text-gray-500">
              <FaGraduationCap className="mt-0.5 text-[#193366]/60 flex-shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-gray-700 line-clamp-1">{university}</span>
                <span className="text-gray-400 font-medium line-clamp-1">{major}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Info Grid (Subjects & Area) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#f9f9f6] rounded-xl p-2.5 flex flex-col justify-center border border-transparent group-hover:border-[#193366]/10 transition-colors">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <FaBookOpen /> <span className="uppercase font-bold tracking-wider text-[10px]">Môn dạy</span>
            </div>
            <p className="text-sm font-bold text-[#193366] truncate" title={tutor.subjects?.join(', ')}>
              {subjects}
            </p>
          </div>
          <div className="bg-[#f9f9f6] rounded-xl p-2.5 flex flex-col justify-center border border-transparent group-hover:border-[#193366]/10 transition-colors">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <FaMapMarkerAlt /> <span className="uppercase font-bold tracking-wider text-[10px]">Khu vực</span>
            </div>
            <p className="text-sm font-bold text-[#193366] truncate">
              {area}
            </p>
          </div>
        </div>

        {/* 3. Bio (Short) */}
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-5 flex-grow font-medium">
          {bio}
        </p>

        {/* 4. Footer: Pricing & Action */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Học phí</p>
            <div className="flex items-baseline gap-0.5 text-[#193366]">
              <span className="text-xl font-extrabold">{formattedPrice}</span>
              <span className="text-xs font-bold text-gray-400">đ/h</span>
            </div>
          </div>

          {/* Button: Navy Solid Hover Effect */}
          <button className="
            relative overflow-hidden
            px-5 py-2.5 rounded-xl text-sm font-bold
            bg-[#193366] text-white
            hover:bg-[#193366]/90
            transition-all duration-300
            shadow-md shadow-[#193366]/20
            group/btn flex items-center gap-2
          ">
            <span className="relative z-10">Chi tiết</span>
            <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;