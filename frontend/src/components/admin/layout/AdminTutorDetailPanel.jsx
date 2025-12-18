import { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

const TutorDetailPanel = ({ tutorId, onBack }) => {
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axiosClient.get(`/admin/tutors-profile/${tutorId}`);
        setTutor(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Không thể tải hồ sơ gia sư');
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [tutorId]);

  if (loading) return <div className="p-8 text-gray-500">Đang tải...</div>;
  if (!tutor) return <div className="p-8 text-gray-500">Không tìm thấy hồ sơ.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <FiArrowLeft className="mr-1" /> Quay lại danh sách
      </button>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={tutor.user?.avatar || '/default-avatar.png'}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{tutor.user?.fullName}</h1>
          <p className="text-sm text-gray-500">{tutor.user?.email}</p>
          <p className="text-sm text-gray-500">{tutor.user?.phone || '---'}</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="space-y-3 text-gray-700">
        <p><b>Giới thiệu:</b> {tutor.bio}</p>
        <p><b>Khu vực:</b> {tutor.area}</p>
        <p><b>Phương thức dạy:</b> {tutor.teachingMethod}</p>
        <p><b>Kinh nghiệm:</b> {tutor.experience || 'Chưa cập nhật'}</p>
        <p><b>Học phí mong muốn:</b> {tutor.hourlyRate ? tutor.hourlyRate + ' đ/giờ' : 'Thỏa thuận'}</p>

        <div>
          <b>Môn dạy:</b>
          <div className="flex flex-wrap gap-2 mt-1">
            {tutor.subjects.map((s) => (
              <span key={s} className="bg-blue-50 border border-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{s}</span>
            ))}
          </div>
        </div>

        <div>
          <b>Các khối lớp:</b>
          <div className="flex flex-wrap gap-2 mt-1">
            {tutor.grades.map((g) => (
              <span key={g} className="bg-green-50 border border-green-100 text-green-700 px-2 py-1 rounded text-sm">{g}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailPanel;
