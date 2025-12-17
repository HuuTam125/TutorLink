import {
  FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 relative mt-24">

      {/* 1. CTA SECTION (Nổi lên trên Footer) */}
      {/* Phần này tạo điểm nhấn bắt mắt, kêu gọi user đăng ký trước khi rời đi */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Họa tiết trang trí chìm */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Sẵn sàng để bứt phá điểm số?
            </h2>
            <p className="text-blue-100 text-sm md:text-base">
              Đăng ký ngay để kết nối với hàng nghìn gia sư giỏi trên toàn quốc.
            </p>
          </div>

          <div className="flex gap-3 relative z-10">
            <button className="bg-white text-blue-700 font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-50 transition-transform transform hover:-translate-y-1">
              Tìm Gia Sư
            </button>
            <button className="bg-blue-800 text-white font-bold py-3 px-6 rounded-xl border border-blue-600 hover:bg-blue-900 transition-transform transform hover:-translate-y-1">
              Trở thành Gia sư
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      {/* pt-32 để tránh bị phần CTA đè lên nội dung */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {/* Logo Text giả lập */}
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
                T
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Tutor<span className="text-blue-500">Link</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nền tảng kết nối gia sư và học viên uy tín hàng đầu Việt Nam.
              Chúng tôi cam kết chất lượng dạy và học thực chất, minh bạch và hiệu quả.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Về chúng tôi
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {['Giới thiệu chung', 'Đội ngũ chuyên gia', 'Tin tức & Sự kiện', 'Tuyển dụng', 'Liên hệ'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Users */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Hỗ trợ
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {['Trung tâm trợ giúp', 'Quy định bảo mật', 'Điều khoản sử dụng', 'Quy chế hoạt động', 'Giải quyết khiếu nại'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Liên hệ
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            </h3>

            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <span>Tầng 5, Tòa nhà Tech, Quận Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaPhoneAlt className="text-blue-500 flex-shrink-0" />
                <span className="font-bold text-white">1900 1234</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaEnvelope className="text-blue-500 flex-shrink-0" />
                <span>support@giasupro.vn</span>
              </li>
            </ul>

            {/* Mini Newsletter Form */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email nhận tin..."
                className="w-full bg-slate-800 text-white text-sm py-3 pl-4 pr-12 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700 placeholder-slate-500"
              />
              <button className="absolute right-1 top-1 bottom-1 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white hover:bg-blue-700 transition">
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM BAR (Copyright) */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 GiaSuPro. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;