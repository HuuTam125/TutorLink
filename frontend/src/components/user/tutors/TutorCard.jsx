import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();

  const name = tutor.user?.fullName || 'Gia sư';
  const avatar = tutor.user?.avatar || 'https://via.placeholder.com/150';
  const bio = tutor.bio || 'Chưa có giới thiệu...';
  const area = tutor.area || 'Toàn quốc';
  const subjects = tutor.subjects?.length ? tutor.subjects.join(', ') : 'Nhiều môn';
  const method = tutor.teachingMethod || 'online';
  const price = tutor.hourlyRate || 0;

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);

  return (
    <div
      onClick={() => navigate(`/tutors/${tutor._id}`)}
      className="
        group relative bg-white rounded-2xl border border-gray-100
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
        hover:shadow-[0_10px_30px_-4px_rgba(37,99,235,0.15)] 
        hover:border-blue-200 hover:-translate-y-1
        transition-all duration-300 ease-out cursor-pointer overflow-hidden
        flex flex-col h-full
      "
    >
      <div className="p-5 flex flex-col h-full">

        {/* 1. Header Section */}
        <div className="flex justify-between items-start gap-3 mb-4">
          <div className="flex gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <img
                src={avatar}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm group-hover:scale-105 transition-transform"
              />
              {/* Online indicator */}
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-blue-600 transition-colors">
                  {name}
                </h3>
                <FaCheckCircle className="text-blue-500 text-[10px] flex-shrink-0" title="Đã xác thực" />
              </div>
              <p className="text-xs text-gray-500 truncate" title={subjects}>
                {subjects}
              </p>
            </div>
          </div>

          {/* Rating Badge (Compact) */}
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100 flex-shrink-0">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-yellow-700 font-bold text-xs">{tutor.rating || '5.0'}</span>
          </div>
        </div>

        {/* 2. Divider mờ */}
        <div className="w-full h-px bg-gray-50 mb-4"></div>

        {/* 3. Bio & Details */}
        <div className="flex-grow space-y-3">
          {/* Tags Info */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-gray-500">
              <FaMapMarkerAlt className="text-gray-400" />
              <span className="truncate max-w-[100px]">{area}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-gray-500">
              <FaChalkboardTeacher className="text-gray-400" />
              <span className="capitalize">
                {method === 'both' ? 'Online & Offline' : method}
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed h-[2.6rem]">
            {bio}
          </p>
        </div>

        {/* 4. Footer: Price & Action */}
        <div className="mt-5 pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Học phí / giờ</span>
            <span className="text-lg font-bold text-blue-600">
              {formattedPrice}<span className="text-sm align-top">đ</span>
            </span>
          </div>

          <button className="
                px-5 py-2.5 rounded-xl text-sm font-semibold
                bg-blue-50 text-blue-600 
                group-hover:bg-blue-600 group-hover:text-white
                transition-all duration-300 shadow-sm
             ">
            Xem chi tiết
          </button>
        </div>

      </div>
    </div>
  );
};

export default TutorCard;