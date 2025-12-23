import { useState, useEffect } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { toast } from 'react-toastify';
import {
  FaUniversity, FaGraduationCap, FaChalkboardTeacher, FaMapMarkerAlt,
  FaMoneyBillWave, FaBriefcase, FaCheckCircle, FaClock, FaExclamationTriangle,
  FaLaptop, FaUserFriends, FaGlobe
} from 'react-icons/fa';

const TutorProfileTab = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    university: '',
    major: '',
    bio: '',
    subjects: '',
    grades: '',
    area: '',
    teachingMethod: 'both',
    hourlyRate: 0,
    experience: '',
    isApproved: null
  });

  // --- LOGIC GIỮ NGUYÊN ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get('/tutors/me');
        if (res.data) {
          setProfile({
            ...res.data,
            subjects: Array.isArray(res.data.subjects) ? res.data.subjects.join(', ') : '',
            grades: Array.isArray(res.data.grades) ? res.data.grades.join(', ') : ''
          });
        }
      } catch (error) {
        console.log("Chưa có hồ sơ, tạo mới khi lưu");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...profile,
        subjects: profile.subjects.split(',').map((s) => s.trim()).filter(Boolean),
        grades: profile.grades.split(',').map((g) => g.trim()).filter(Boolean)
      };
      await axiosClient.post('/tutors', dataToSend);
      setProfile(prev => ({
        ...prev,
        isApproved: false
      }));
      toast.success('Cập nhật hồ sơ thành công! Vui lòng chờ duyệt.');

    } catch (error) {
      toast.error('Lỗi cập nhật hồ sơ');
      console.error(error);
    }
  };
  // --- KẾT THÚC LOGIC CŨ ---

  // Helper định dạng tiền tệ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#193366]"></div>
    </div>
  );

  return (
    // Card Style: White bg, Rounded, Navy Shadow
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_4px_30px_-10px_rgba(25,51,102,0.05)] border border-[#193366]/5 animate-fade-in-up font-sans">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#193366] flex items-center gap-3">
            <span className="p-2.5 bg-[#f9f9f6] text-[#193366] rounded-xl"><FaChalkboardTeacher /></span>
            Hồ sơ gia sư
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">Cập nhật thông tin giảng dạy. <span className="text-orange-500 font-bold">Lưu ý: Mọi chỉnh sửa sẽ cần Admin duyệt lại.</span></p>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border shadow-sm
          ${profile.isApproved === true
            ? 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]'
            : profile.isApproved === false
              ? 'bg-[#FFF9E6] text-[#B7791F] border-[#FFE082]'
              : 'bg-[#f9f9f6] text-gray-500 border-gray-200'
          }`}>
          {profile.isApproved === true && <><FaCheckCircle /> Đã được duyệt</>}
          {profile.isApproved === false && <><FaExclamationTriangle /> Chờ duyệt / Cần sửa</>}
          {profile.isApproved === null && <><FaClock /> Hồ sơ mới</>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* --- SECTION 1: HỌC VẤN --- */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-[#193366]/60 uppercase tracking-wider flex items-center gap-2">
            <FaUniversity /> Thông tin học vấn
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Trường đại học</label>
              <div className="relative">
                <FaUniversity className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="text"
                  value={profile.university}
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none font-medium text-[#193366] placeholder-gray-400"
                  placeholder="VD: ĐH Bách Khoa TP.HCM"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Ngành học</label>
              <div className="relative">
                <FaGraduationCap className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="text"
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none font-medium text-[#193366] placeholder-gray-400"
                  placeholder="VD: Khoa học máy tính"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Kinh nghiệm & Giới thiệu</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none text-gray-700 resize-y font-medium placeholder-gray-400"
                placeholder="Hãy giới thiệu về kinh nghiệm, phương pháp dạy và thành tích của bạn..."
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100"></div>

        {/* --- SECTION 2: CHI TIẾT LỚP DẠY --- */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-[#193366]/60 uppercase tracking-wider flex items-center gap-2">
            <FaBriefcase /> Chi tiết giảng dạy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Môn dạy</label>
              <input
                type="text"
                value={profile.subjects}
                onChange={(e) => setProfile({ ...profile, subjects: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none font-medium text-[#193366] placeholder-gray-400"
                placeholder="VD: Toán, Lý, Hóa (cách nhau dấu phẩy)"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5 ml-1 font-medium">Nhập các môn cách nhau bởi dấu phẩy (,)</p>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Khối lớp</label>
              <input
                type="text"
                value={profile.grades}
                onChange={(e) => setProfile({ ...profile, grades: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none font-medium text-[#193366] placeholder-gray-400"
                placeholder="VD: Lớp 10, Lớp 11 (cách nhau dấu phẩy)"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5 ml-1 font-medium">Nhập các lớp cách nhau bởi dấu phẩy (,)</p>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Khu vực dạy</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="text"
                  value={profile.area}
                  onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none font-medium text-[#193366] placeholder-gray-400"
                  placeholder="VD: Quận 1, Quận 3, TP.HCM"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Học phí / Giờ</label>
              <div className="relative">
                <FaMoneyBillWave className="absolute top-4 left-4 text-[#137333]" />
                <input
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none font-bold text-[#193366]"
                  min="0"
                  required
                />
                {/* Visual Helper */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#137333] bg-[#E6F4EA] px-2 py-1 rounded-md">
                  {formatCurrency(profile.hourlyRate)}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-sm font-bold text-[#193366] mb-2">Kinh nghiệm chi tiết</label>
              <input
                type="text"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all outline-none font-medium text-[#193366] placeholder-gray-400"
                placeholder="VD: 2 năm dạy trung tâm, IELTS 7.5..."
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100"></div>

        {/* --- SECTION 3: HÌNH THỨC DẠY --- */}
        <div>
          <label className="block text-sm font-bold text-[#193366] mb-4">Hình thức giảng dạy</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { val: 'online', label: 'Online', icon: FaLaptop, desc: 'Dạy trực tuyến qua Zoom/Meet' },
              { val: 'offline', label: 'Offline', icon: FaUserFriends, desc: 'Dạy trực tiếp tại nhà' },
              { val: 'both', label: 'Cả hai', icon: FaGlobe, desc: 'Linh hoạt Online & Offline' }
            ].map((opt) => (
              <div
                key={opt.val}
                onClick={() => setProfile({ ...profile, teachingMethod: opt.val })}
                className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col items-center justify-center text-center gap-2
                  ${profile.teachingMethod === opt.val
                    ? 'border-[#193366] bg-[#193366]/5 text-[#193366] shadow-sm'
                    : 'border-transparent bg-[#f9f9f6] text-gray-400 hover:bg-[#f9f9f6]/80 hover:text-gray-600'
                  }`}
              >
                <opt.icon className="text-2xl mb-1" />
                <span className="font-bold">{opt.label}</span>
                <span className="text-[10px] opacity-80 font-medium">{opt.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#193366] text-white font-bold rounded-xl
               hover:bg-[#193366]/90 hover:shadow-lg hover:shadow-[#193366]/30
               hover:-translate-y-0.5 transition-all duration-200
               flex items-center gap-2 text-sm"
          >
            <FaCheckCircle className="text-base" />
            Lưu & Gửi duyệt
          </button>
        </div>

      </form>
    </div>
  );
};

export default TutorProfileTab;