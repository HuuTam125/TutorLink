import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiUser, FiMail, FiLock, FiPhone, FiArrowRight, FiArrowLeft, FiMapPin,
  FiBookOpen, FiDollarSign, FiCheckCircle
} from 'react-icons/fi';
// THÊM: FaUniversity, FaBriefcase
import { FaChalkboardTeacher, FaUserGraduate, FaGraduationCap, FaUniversity, FaBriefcase } from 'react-icons/fa';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', phone: '', role: 'student',
    // THÊM: university, major
    university: '', major: '',
    bio: '', subjects: '', grades: '', area: '', teachingMethod: 'both', hourlyRate: '', experience: ''
  });

  const { role } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  };

  const handleAction = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.password) {
        return toast.warn("Vui lòng điền đầy đủ thông tin tài khoản!");
      }
      if (role === 'student') {
        doRegister();
      } else {
        setStep(2);
      }
    } else {
      // CẬP NHẬT: Kiểm tra thêm university và major
      if (!formData.university || !formData.major || !formData.subjects || !formData.area || !formData.hourlyRate) {
        return toast.warn("Vui lòng nhập đầy đủ: Trường, Ngành, Môn, Khu vực và Học phí!");
      }
      doRegister();
    }
  };

  const doRegister = async () => {
    setIsLoading(true);
    try {
      await register(formData);
      toast.success('Đăng ký tài khoản thành công!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
      setIsLoading(false);
    }
  };

  const goBack = () => setStep(1);

  return (
    // Nền trang: Kem ấm #f9f9f6
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f6] p-4 font-sans">

      {/* Card Container */}
      <div className="flex w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(25,51,102,0.15)] overflow-hidden min-h-[650px] transition-all duration-300 border border-[#193366]/5">

        {/* --- CỘT TRÁI: BRANDING (Giữ nguyên) --- */}
        <div className="hidden md:flex w-1/2 bg-[#193366] relative flex-col justify-between p-12 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-[-50px] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#193366] font-bold text-xl shadow-lg">
                <FaGraduationCap />
              </div>
              <h1 className="text-2xl font-extrabold tracking-wide">TutorLink</h1>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              Bắt đầu hành trình <br /> <span className="text-blue-200">tri thức mới.</span>
            </h2>
            <p className="text-blue-100/80 text-lg font-medium leading-relaxed mb-8">
              {role === 'tutor'
                ? "Trở thành đối tác gia sư, tiếp cận hàng ngàn học viên và xây dựng thương hiệu cá nhân."
                : "Tìm kiếm gia sư chất lượng cao phù hợp với mục tiêu học tập của bạn."
              }
            </p>

            <div className="space-y-4 pb-12">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-[#4ADE80] flex-shrink-0" size={24} />
                <span className="text-blue-50 font-medium">Đăng ký nhanh chóng & Miễn phí</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-[#4ADE80] flex-shrink-0" size={24} />
                <span className="text-blue-50 font-medium">Bảo mật thông tin tuyệt đối</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-[#4ADE80] flex-shrink-0" size={24} />
                <span className="text-blue-50 font-medium">Hỗ trợ 24/7 từ đội ngũ Admin</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-[#152a55] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-2xl font-bold mb-1">1.500+</h3>
                <p className="text-blue-200/70 text-xs font-medium uppercase tracking-wider">Gia sư hoạt động</p>
              </div>
              <div className="bg-[#152a55] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-2xl font-bold mb-1">4.8/5</h3>
                <p className="text-blue-200/70 text-xs font-medium uppercase tracking-wider">Đánh giá hài lòng</p>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-8 text-xs font-medium text-blue-200/50">© 2026 TutorLink Platform.</div>
        </div>

        {/* --- CỘT PHẢI: FORM ĐA BƯỚC --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-white relative">

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-3xl font-extrabold text-[#193366]">Đăng ký</h3>
              {role === 'tutor' && (
                <span className="text-xs font-bold text-[#193366] bg-[#f9f9f6] px-3 py-1 rounded-full border border-[#193366]/10">
                  Bước {step} / 2
                </span>
              )}
            </div>
            <p className="text-gray-500 font-medium text-sm">
              {step === 1 ? "Nhập thông tin tài khoản để bắt đầu." : "Hoàn thiện hồ sơ chuyên môn của bạn."}
            </p>
          </div>

          <form onSubmit={handleAction} className="flex-1 flex flex-col justify-between">
            <div className="space-y-5 overflow-y-auto max-h-[450px] p-2 custom-scrollbar">

              {/* --- NỘI DUNG BƯỚC 1 (Giữ nguyên) --- */}
              {step === 1 && (
                <div className="animate-fade-in space-y-5">
                  {/* Role Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => handleRoleSelect('student')}
                      className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all 
                        ${role === 'student'
                          ? 'border-[#193366] bg-[#193366]/5 text-[#193366] ring-1 ring-[#193366]'
                          : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                        }`}
                    >
                      <FaUserGraduate size={24} />
                      <span className="font-bold text-sm">Học viên</span>
                    </div>
                    <div
                      onClick={() => handleRoleSelect('tutor')}
                      className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all 
                        ${role === 'tutor'
                          ? 'border-[#193366] bg-[#193366]/5 text-[#193366] ring-1 ring-[#193366]'
                          : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                        }`}
                    >
                      <FaChalkboardTeacher size={24} />
                      <span className="font-bold text-sm">Gia sư</span>
                    </div>
                  </div>

                  {/* Inputs Step 1 */}
                  <div>
                    <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Họ và tên</label>
                    <div className="relative group">
                      <FiUser className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                      <input type="text" name="fullName" value={formData.fullName} onChange={onChange} required
                        className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]"
                        placeholder="Nguyễn Văn A" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Email</label>
                    <div className="relative group">
                      <FiMail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                      <input type="email" name="email" value={formData.email} onChange={onChange} required
                        className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]"
                        placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Mật khẩu</label>
                      <div className="relative group">
                        <FiLock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                        <input type="password" name="password" value={formData.password} onChange={onChange} required
                          className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]"
                          placeholder="••••••" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Số điện thoại</label>
                      <div className="relative group">
                        <FiPhone className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                        <input type="text" name="phone" value={formData.phone} onChange={onChange} required
                          className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]"
                          placeholder="09xxxx" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- NỘI DUNG BƯỚC 2 (CHỈ GIA SƯ) --- */}
              {step === 2 && (
                <div className="animate-fade-in space-y-4">
                  <div className="p-4 bg-[#f9f9f6] rounded-xl border border-[#193366]/10 text-sm text-gray-600 mb-4 font-medium">
                    👋 Chào <b className="text-[#193366]">{formData.fullName}</b>, hãy cho học viên biết thế mạnh của bạn nhé!
                  </div>

                  {/* CẬP NHẬT: Thêm Trường ĐH & Chuyên Ngành */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Trường Đại học</label>
                      <div className="relative group">
                        <FaUniversity className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                        <input type="text" name="university" value={formData.university} onChange={onChange} placeholder="ĐH Bách Khoa..."
                          className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Chuyên ngành</label>
                      <div className="relative group">
                        <FaBriefcase className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                        <input type="text" name="major" value={formData.major} onChange={onChange} placeholder="CNTT, Sư phạm Anh..."
                          className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Khu vực dạy</label>
                      <div className="relative group">
                        <FiMapPin className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                        <input type="text" name="area" value={formData.area} onChange={onChange} placeholder="Quận/Huyện"
                          className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Hình thức</label>
                      <select name="teachingMethod" value={formData.teachingMethod} onChange={onChange}
                        className="w-full p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366] outline-none">
                        <option value="both">Online & Offline</option>
                        <option value="offline">Tại nhà</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Môn dạy (ngăn cách dấu phẩy)</label>
                    <div className="relative group">
                      <FiBookOpen className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#193366]" />
                      <input type="text" name="subjects" value={formData.subjects} onChange={onChange} placeholder="Toán, Lý, Tiếng Anh..."
                        className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Lớp dạy</label>
                      <input type="text" name="grades" value={formData.grades} onChange={onChange} placeholder="Lớp 10, 11..."
                        className="w-full p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366] outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Học phí / giờ</label>
                      <div className="relative group">
                        <FiDollarSign className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#137333]" />
                        <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={onChange} placeholder="200000"
                          className="w-full pl-12 p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-bold text-[#193366] outline-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Giới thiệu ngắn</label>
                    <textarea name="bio" rows="2" value={formData.bio} onChange={onChange} placeholder="Kinh nghiệm, thành tích..."
                      className="w-full p-3 bg-[#f9f9f6] border border-gray-200 rounded-xl focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all font-medium text-[#193366] outline-none resize-none"></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Buttons */}
            <div className="mt-6 flex gap-3">
              {step === 2 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="px-6 py-3.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-[#f9f9f6] font-bold transition-all flex items-center gap-2"
                >
                  <FiArrowLeft /> Quay lại
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3.5 bg-[#193366] hover:bg-[#193366]/90 text-white font-bold rounded-xl shadow-lg shadow-[#193366]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 transform hover:-translate-y-0.5 active:translate-y-0`}
              >
                {isLoading ? 'Đang xử lý...' : (
                  <>
                    {step === 1 && role === 'tutor' ? 'Tiếp theo' : 'Đăng ký ngay'}
                    <FiArrowRight />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 font-medium">
            Bạn đã có tài khoản? <Link to="/login" className="font-bold text-[#193366] hover:underline">Đăng nhập</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;