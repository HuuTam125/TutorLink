import TutorCard from './TutorCard';
import { FaInbox } from 'react-icons/fa';

const TutorList = ({ tutors, loading }) => {

  // Hiệu ứng Loading Skeleton (Khung xương)
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-2xl h-[350px] animate-pulse border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  // Trạng thái trống
  if (tutors.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
        <FaInbox className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-600">Không tìm thấy gia sư nào</h3>
        <p className="text-gray-400 mt-2">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm xem sao nhé.</p>
      </div>
    );
  }

  // Render Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tutors.map((tutor) => (
        <TutorCard key={tutor._id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorList;