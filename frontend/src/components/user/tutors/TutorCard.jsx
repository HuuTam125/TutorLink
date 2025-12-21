import React from 'react';
import {
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBookOpen,
  FaWifi
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
      className="
        group relative w-full bg-white rounded-2xl 
        border border-gray-200/80
        hover:border-blue-300/50
        shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]
        hover:shadow-[0_12px_30px_-8px_rgba(59,130,246,0.15)]
        transition-all duration-300 ease-out cursor-pointer
        flex flex-col overflow-hidden
      "
    >
      {/* Badge Method (Góc trên phải) */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`
          flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
          ${method === 'online' ? 'bg-green-50 text-green-600 border-green-100' :
            method === 'offline' ? 'bg-orange-50 text-orange-600 border-orange-100' :
              'bg-blue-50 text-blue-600 border-blue-100'}
        `}>
          {method === 'online' ? <FaWifi /> : null}
          {method === 'both' ? 'Hybrid' : method}
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
              <span className="text-[10px] font-bold text-gray-700">{rating}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-1 mb-1">
              <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
                {name}
              </h3>
              <FaCheckCircle className="text-blue-500 text-xs flex-shrink-0" title="Đã xác thực" />
            </div>

            {/* NEW: University Section - Điểm nhấn uy tín */}
            <div className="flex items-start gap-1.5 text-xs text-gray-500">
              <FaGraduationCap className="mt-0.5 text-blue-500 flex-shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-gray-700 line-clamp-1">{university}</span>
                <span className="text-gray-400 font-medium line-clamp-1">{major}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Info Grid (Subjects & Area) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg p-2.5 flex flex-col justify-center border border-gray-100">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <FaBookOpen /> <span className="uppercase font-semibold tracking-wider text-[10px]">Môn dạy</span>
            </div>
            <p className="text-sm font-medium text-gray-700 truncate" title={tutor.subjects?.join(', ')}>
              {subjects}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 flex flex-col justify-center border border-gray-100">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <FaMapMarkerAlt /> <span className="uppercase font-semibold tracking-wider text-[10px]">Khu vực</span>
            </div>
            <p className="text-sm font-medium text-gray-700 truncate">
              {area}
            </p>
          </div>
        </div>

        {/* 3. Bio (Short) */}
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-5 flex-grow">
          {bio}
        </p>

        {/* 4. Footer: Pricing & Action */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Học phí tham khảo</p>
            <div className="flex items-baseline gap-0.5 text-blue-600">
              <span className="text-xl font-extrabold">{formattedPrice}</span>
              <span className="text-xs font-semibold">đ/h</span>
            </div>
          </div>

          <button className="
            relative overflow-hidden
            px-6 py-2.5 rounded-xl text-sm font-bold
            bg-gray-900 text-white
            group-hover:bg-blue-600 
            transition-all duration-300
            shadow-md group-hover:shadow-blue-200
            transform group-hover:-translate-y-0.5
          ">
            <span className="relative z-10">Xem chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;