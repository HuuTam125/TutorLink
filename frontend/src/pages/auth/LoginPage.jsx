import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomSuccessToast, CustomErrorToast } from '../../components/user/toast/CustomToast'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaCheckCircle, FaGraduationCap } from 'react-icons/fa';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = await login(email, password);

      // --- LOGIC TOAST GIỮ NGUYÊN ---
      toast.success(
        <CustomSuccessToast
          title={`Xin chào, ${userData.fullName}!`}
          message="Đăng nhập thành công. Chúc bạn một ngày tốt lành."
        />,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "!bg-white !rounded-xl !shadow-2xl !p-2 !border !border-gray-100",
          bodyClassName: "!p-0 !m-0",
          icon: false
        }
      );

      setTimeout(() => {
        if (userData.role === 'admin') navigate('/admin');
        else navigate('/');
      }, 800);

    } catch (error) {
      toast.error(
        <CustomErrorToast
          title="Đăng nhập thất bại"
          message={error.response?.data?.message || 'Email hoặc mật khẩu không đúng'}
        />,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          className: "!bg-white !rounded-xl !shadow-2xl !p-2 !border !border-red-50",
          bodyClassName: "!p-0 !m-0",
          icon: false
        }
      );
      setIsLoading(false);
    }
  };

  return (
    // Nền trang: Kem ấm #f9f9f6
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f6] p-4 font-sans">

      {/* Card Container: Shadow Navy, Bo góc lớn */}
      <div className="flex w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(25,51,102,0.15)] overflow-hidden min-h-[650px] transition-all duration-300 border border-[#193366]/5">

        {/* --- CỘT TRÁI: BRANDING (Navy Theme) --- */}
        <div className="hidden md:flex w-1/2 bg-[#193366] relative flex-col justify-between p-12 text-white overflow-hidden">

          {/* Họa tiết nền */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-[-50px] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#193366] font-bold text-xl shadow-lg">
                <FaGraduationCap />
              </div>
              <h1 className="text-2xl font-extrabold tracking-wide">TutorLink</h1>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-6 tracking-tight leading-tight">
                Kết nối tri thức <br />
                <span className="text-blue-200">Kiến tạo tương lai</span>
              </h1>
              <p className="text-blue-100/80 text-lg font-medium leading-relaxed max-w-sm">
                Nền tảng uy tín giúp phụ huynh tìm gia sư chất lượng và hỗ trợ gia sư xây dựng sự nghiệp bền vững.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-5 mb-8 flex-1">
              {[
                "So khớp gia sư thông minh bằng AI",
                "Quản lý lịch học & học phí minh bạch",
                "Đội ngũ hỗ trợ tận tâm 24/7"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-sm border border-white/10 group-hover:bg-white/20 transition-all">
                    {idx + 1}
                  </div>
                  <p className="text-blue-50 font-medium">{item}</p>
                </div>
              ))}
            </div>

            {/* Stats Cards */}
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
        </div>

        {/* --- CỘT PHẢI: FORM ĐĂNG NHẬP --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">

          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-extrabold text-[#193366] mb-3">Đăng nhập</h3>
            <p className="text-gray-500 font-medium">Chào mừng trở lại! Vui lòng nhập thông tin.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#193366] transition-colors">
                  <FiMail size={20} />
                </div>
                {/* Input: Nền Kem, Text Navy */}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#193366] focus:ring-4 focus:ring-[#193366]/10 transition-all text-[#193366] font-medium placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#193366] uppercase tracking-wider mb-2">Mật khẩu</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#193366] transition-colors">
                  <FiLock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-[#f9f9f6] border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#193366] focus:ring-4 focus:ring-[#193366]/10 transition-all text-[#193366] font-medium placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#193366] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              <div className="flex justify-end mt-3">
                <Link to="/forgot-password" className="text-sm font-bold text-[#193366] hover:underline hover:text-[#193366]/80">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {/* Button: Navy Solid */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#193366] hover:bg-[#193366]/90 text-white font-bold rounded-xl shadow-lg shadow-[#193366]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Đang xử lý...' : (
                <>Đăng nhập <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 font-medium">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-[#f9f9f6] transition-all font-bold text-gray-600 text-sm">
              <FcGoogle size={22} /> <span>Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-[#f9f9f6] transition-all font-bold text-gray-600 text-sm">
              <FaFacebook size={22} className="text-[#1877F2]" /> <span>Facebook</span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500 font-medium">
            Bạn chưa có tài khoản? <Link to="/register" className="font-bold text-[#193366] hover:underline">Đăng ký ngay</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;