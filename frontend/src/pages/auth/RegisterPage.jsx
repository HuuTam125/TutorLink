import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// Import icons đồng bộ với trang Login
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight, FiArrowLeft, FiMapPin, FiBookOpen, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // State quản lý bước (1 hoặc 2)
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // State dữ liệu
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', phone: '', role: 'student', // Mặc định là học sinh
    // Tutor fields
    bio: '', subjects: '', grades: '', area: '', teachingMethod: 'both', hourlyRate: '', experience: ''
  });

  const { role } = formData;

  // Xử lý nhập liệu
  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Chọn role nhanh
  const handleRoleSelect = (selectedRole) => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  };

  // Xử lý chuyển bước hoặc Submit
  const handleAction = async (e) => {
    e.preventDefault();

    // LOGIC BƯỚC 1:
    if (step === 1) {
      // Validate sơ bộ
      if (!formData.fullName || !formData.email || !formData.password) {
        return toast.warn("Vui lòng điền đầy đủ thông tin tài khoản!");
      }

      // Nếu là Student -> Đăng ký luôn (Submit)
      if (role === 'student') {
        doRegister();
      }
      // Nếu là Tutor -> Chuyển sang bước 2
      else {
        setStep(2);
      }
    }
    // LOGIC BƯỚC 2 (Chỉ Tutor mới tới đây):
    else {
      // Validate Tutor Info
      if (!formData.subjects || !formData.area || !formData.hourlyRate) {
        return toast.warn("Vui lòng nhập Môn, Khu vực và Học phí!");
      }
      doRegister();
    }
  };

  // Hàm gọi API đăng ký thực sự
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

  // Nút quay lại bước 1
  const goBack = () => setStep(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans pt-25">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[650px] transition-all duration-300">

        {/* --- CỘT TRÁI: GIỮ NGUYÊN DESIGN CỦA TRANG LOGIN --- */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative flex-col justify-between p-12 text-white">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-60 h-60 bg-blue-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">T</div>
              <h1 className="text-2xl font-bold tracking-wide">TutorLink</h1>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              Bắt đầu hành trình <br /> tri thức mới.
            </h2>
            <p className="text-blue-100 text-lg opacity-90 mb-8">
              {role === 'tutor'
                ? "Trở thành đối tác gia sư, tiếp cận hàng ngàn học viên và xây dựng thương hiệu cá nhân."
                : "Tìm kiếm gia sư chất lượng cao phù hợp với mục tiêu học tập của bạn."
              }
            </p>

            {/* Feature List thay đổi theo Role đang chọn */}
            <div className="space-y-4 pb-12">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-blue-300 flex-shrink-0" size={24} />
                <span className="text-blue-50">Đăng ký nhanh chóng & Miễn phí</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-blue-300 flex-shrink-0" size={24} />
                <span className="text-blue-50">Bảo mật thông tin tuyệt đối</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-blue-300 flex-shrink-0" size={24} />
                <span className="text-blue-50">Hỗ trợ 24/7 từ đội ngũ Admin</span>
              </div>
            </div>
            {/* Stats Cards (Thẻ thống kê ở dưới cùng) */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              {/* Card 1 */}
              <div className="bg-blue-800/40 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-blue-800/50 transition-colors">
                <h3 className="text-3xl font-bold mb-1">1.500+</h3>
                <p className="text-blue-200 text-sm">Gia sư hoạt động mỗi tháng</p>
              </div>

              {/* Card 2 */}
              <div className="bg-blue-800/40 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-blue-800/50 transition-colors">
                <h3 className="text-3xl font-bold mb-1">4.8/5</h3>
                <p className="text-blue-200 text-sm">Mức hài lòng trung bình từ phụ huynh</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 text-sm opacity-60">© 2026 TutorLink Platform.</div>
        </div>

        {/* --- CỘT PHẢI: FORM ĐA BƯỚC --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-white relative">

          {/* Header Form */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-3xl font-bold text-gray-800">Đăng ký</h3>
              {/* Chỉ hiện số bước nếu là Gia sư */}
              {role === 'tutor' && (
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Bước {step} / 2
                </span>
              )}
            </div>
            <p className="text-gray-500">
              {step === 1 ? "Nhập thông tin tài khoản để bắt đầu." : "Hoàn thiện hồ sơ chuyên môn của bạn."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAction} className="flex-1 flex flex-col justify-between">
            <div className="space-y-5 overflow-y-auto max-h-[400px] p-2 custom-scrollbar">

              {/* --- NỘI DUNG BƯỚC 1 --- */}
              {step === 1 && (
                <div className="animate-fade-in space-y-5">
                  {/* Role Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => handleRoleSelect('student')}
                      className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                      <FaUserGraduate size={24} />
                      <span className="font-semibold text-sm">Học viên</span>
                    </div>
                    <div
                      onClick={() => handleRoleSelect('tutor')}
                      className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${role === 'tutor' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                      <FaChalkboardTeacher size={24} />
                      <span className="font-semibold text-sm">Gia sư</span>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                      <input type="text" name="fullName" value={formData.fullName} onChange={onChange} required className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="Nguyễn Văn A" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={onChange} required className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                      <div className="relative">
                        <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                        <input type="password" name="password" value={formData.password} onChange={onChange} required className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="••••••" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                        <input type="text" name="phone" value={formData.phone} onChange={onChange} required className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="09xxxx" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- NỘI DUNG BƯỚC 2 (CHỈ GIA SƯ) --- */}
              {step === 2 && (
                <div className="animate-fade-in space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800 mb-4">
                    👋 Chào <b>{formData.fullName}</b>, hãy cho học viên biết thế mạnh của bạn nhé!
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Khu vực dạy</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                        <input type="text" name="area" value={formData.area} onChange={onChange} placeholder="Quận/Huyện" className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hình thức</label>
                      <select name="teachingMethod" value={formData.teachingMethod} onChange={onChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all">
                        <option value="both">Online & Offline</option>
                        <option value="offline">Tại nhà</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Môn dạy (ngăn cách dấu phẩy)</label>
                    <div className="relative">
                      <FiBookOpen className="absolute left-3 top-3.5 text-gray-400" />
                      <input type="text" name="subjects" value={formData.subjects} onChange={onChange} placeholder="Toán, Lý, Tiếng Anh..." className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lớp dạy</label>
                      <input type="text" name="grades" value={formData.grades} onChange={onChange} placeholder="Lớp 10, 11..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Học phí / giờ</label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
                        <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={onChange} placeholder="200000" className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu ngắn</label>
                    <textarea name="bio" rows="2" value={formData.bio} onChange={onChange} placeholder="Kinh nghiệm, trường đại học..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
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
                  className="px-6 py-3.5 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-all flex items-center gap-2"
                >
                  <FiArrowLeft /> Quay lại
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? 'Đang xử lý...' : (
                  <>
                    {/* Logic thay đổi Text nút bấm */}
                    {step === 1 && role === 'tutor' ? 'Tiếp theo' : 'Đăng ký ngay'}
                    <FiArrowRight />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Bạn đã có tài khoản? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Đăng nhập</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;