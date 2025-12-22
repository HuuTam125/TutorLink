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
        console.log("⚠️ Chưa có hồ sơ, tạo mới khi lưu");
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
      toast.success('✅ Cập nhật hồ sơ thành công! Vui lòng chờ duyệt.');

    } catch (error) {
      toast.error('❌ Lỗi cập nhật hồ sơ');
      console.error(error);
    }
  };
  // --- KẾT THÚC LOGIC CŨ ---

  // Helper định dạng tiền tệ (chỉ để hiển thị UI)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><FaChalkboardTeacher /></span>
            Hồ sơ gia sư
          </h2>
          <p className="text-slate-500 mt-2 text-sm">Cập nhật thông tin giảng dạy. <span className="text-orange-500 font-medium">Lưu ý: Mọi chỉnh sửa sẽ cần Admin duyệt lại.</span></p>
        </div>

        {/* Status Badge Modern */}
        <div className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border shadow-sm
          ${profile.isApproved === true
            ? 'bg-green-50 text-green-700 border-green-200'
            : profile.isApproved === false
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
          {profile.isApproved === true && <><FaCheckCircle /> Đã được duyệt</>}
          {profile.isApproved === false && <><FaExclamationTriangle /> Chờ duyệt / Cần sửa</>}
          {profile.isApproved === null && <><FaClock /> Hồ sơ mới</>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* --- SECTION 1: HỌC VẤN --- */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <FaUniversity /> Thông tin học vấn
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Trường đại học</label>
              <div className="relative">
                <FaUniversity className="absolute top-4 left-4 text-slate-400" />
                <input
                  type="text"
                  value={profile.university}
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800"
                  placeholder="VD: ĐH Bách Khoa TP.HCM"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Ngành học</label>
              <div className="relative">
                <FaGraduationCap className="absolute top-4 left-4 text-slate-400" />
                <input
                  type="text"
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800"
                  placeholder="VD: Khoa học máy tính"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kinh nghiệm & Giới thiệu</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 resize-y"
                placeholder="Hãy giới thiệu về kinh nghiệm, phương pháp dạy và thành tích của bạn..."
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100"></div>

        {/* --- SECTION 2: CHI TIẾT LỚP DẠY --- */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <FaBriefcase /> Chi tiết giảng dạy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Môn dạy</label>
              <input
                type="text"
                value={profile.subjects}
                onChange={(e) => setProfile({ ...profile, subjects: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800"
                placeholder="VD: Toán, Lý, Hóa (cách nhau dấu phẩy)"
                required
              />
              <p className="text-xs text-slate-400 mt-1.5 ml-1">Nhập các môn cách nhau bởi dấu phẩy (,)</p>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Khối lớp</label>
              <input
                type="text"
                value={profile.grades}
                onChange={(e) => setProfile({ ...profile, grades: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800"
                placeholder="VD: Lớp 10, Lớp 11 (cách nhau dấu phẩy)"
                required
              />
              <p className="text-xs text-slate-400 mt-1.5 ml-1">Nhập các lớp cách nhau bởi dấu phẩy (,)</p>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Khu vực dạy</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-4 left-4 text-slate-400" />
                <input
                  type="text"
                  value={profile.area}
                  onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800"
                  placeholder="VD: Quận 1, Quận 3, TP.HCM"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Học phí / Giờ</label>
              <div className="relative">
                <FaMoneyBillWave className="absolute top-4 left-4 text-green-500" />
                <input
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-bold text-slate-800"
                  min="0"
                  required
                />
                {/* Visual Helper: Hiển thị tiền đã format bên góc phải */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  {formatCurrency(profile.hourlyRate)}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kinh nghiệm chi tiết</label>
              <input
                type="text"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800"
                placeholder="VD: 2 năm dạy trung tâm, IELTS 7.5..."
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100"></div>

        {/* --- SECTION 3: HÌNH THỨC DẠY (Visual Selection) --- */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-4">Hình thức giảng dạy</label>
          {/* Thay thế Select bằng Grid Cards nhưng vẫn update state string */}
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
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                    : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50'
                  }`}
              >
                <opt.icon className="text-2xl mb-1" />
                <span className="font-bold">{opt.label}</span>
                <span className="text-[10px] opacity-80">{opt.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg
               hover:bg-blue-600 hover:shadow-md hover:shadow-blue-500/30
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