import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomSuccessToast, CustomErrorToast } from '../../components/user/toast/CustomToast'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
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
      toast.success(
        <CustomSuccessToast
          title={`Xin chào, ${userData.fullName}!`}
          message="Đăng nhập thành công. Chúc bạn một ngày tốt lành."
        />,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true, // Ẩn thanh chạy để nhìn sạch sẽ hơn
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "!bg-white !rounded-xl !shadow-2xl !p-2 !border !border-gray-100", // Tailwind override class mặc định
          bodyClassName: "!p-0 !m-0",
          icon: false // Tắt icon mặc định
        }
      );

      setTimeout(() => {
        if (userData.role === 'admin') navigate('/admin');
        else navigate('/');
      }, 800); // Tăng delay xíu để user kịp đọc toast

    } catch (error) {

      // --- CUSTOM TOAST ERROR ---
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans pt-25">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[650px] transition-all duration-300">

        {/* --- CỘT TRÁI: NỘI DUNG TỪ ẢNH MẪU --- */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative flex-col justify-between p-12 text-white">

          {/* Họa tiết nền mờ (Optional) */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-60 h-60 bg-blue-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Header Text */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                T
              </div>
              <h1 className="text-2xl font-bold tracking-wide">TutorLink</h1>
            </div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-6 tracking-tight">Chào mừng trở lại</h1>
              <p className="text-blue-100 text-lg opacity-90 leading-relaxed">
                Nền tảng chuyên nghiệp giúp phụ huynh kết nối gia sư chất lượng và hỗ trợ gia sư xây dựng thương hiệu cá nhân.
              </p>
            </div>



            {/* List Features (01, 02, 03) */}
            <div className="space-y-6 mb-8 flex-1">
              {/* Item 1 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-lg border border-white/20 group-hover:bg-white/20 transition-all">
                  01
                </div>
                <p className="mt-2 text-blue-50 leading-snug">
                  So khớp gia sư theo mục tiêu học tập cụ thể của học sinh.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-lg border border-white/20 group-hover:bg-white/20 transition-all">
                  02
                </div>
                <p className="mt-2 text-blue-50 leading-snug">
                  Quản lý lịch học, học phí và tiến trình ngay trong một bảng điều khiển.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center font-bold text-lg border border-white/20 group-hover:bg-white/20 transition-all">
                  03
                </div>
                <p className="mt-2 text-blue-50 leading-snug">
                  Đội ngũ tư vấn hỗ trợ xuyên suốt giúp phụ huynh và gia sư kết nối hiệu quả.
                </p>
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
        </div>

        {/* --- CỘT PHẢI: FORM ĐĂNG NHẬP (GIỮ NGUYÊN) --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Đăng nhập</h3>
            <p className="text-gray-500">Nhập email và mật khẩu của bạn để tiếp tục.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-800 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Đang xử lý...' : (
                <>Đăng nhập <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 text-sm">
              <FcGoogle size={22} /> <span>Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all font-medium text-gray-700 text-sm">
              <FaFacebook size={22} className="text-blue-600" /> <span>Facebook</span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            Bạn chưa có tài khoản? <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Đăng ký ngay</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;




