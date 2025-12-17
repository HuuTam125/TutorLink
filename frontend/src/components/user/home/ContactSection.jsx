import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebookMessenger } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="py-24 bg-[#F8F9FC] relative overflow-hidden">

      {/* Background Decoration (Họa tiết nền) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* --- CỘT TRÁI: THÔNG TIN & TEXT --- */}
          <div>
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Hỗ trợ 24/7
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Bạn cần tư vấn thêm? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                Đừng ngần ngại liên hệ
              </span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Đội ngũ tư vấn của GiaSuVN luôn sẵn sàng giải đáp mọi thắc mắc của bạn về việc tìm gia sư, đăng ký lớp học hoặc các vấn đề thanh toán.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Hotline Card */}
              <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase">Hotline tư vấn</p>
                  <p className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">1900 6868</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase">Email hỗ trợ</p>
                  <p className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">support@giasuvn.com</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group cursor-pointer">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase">Văn phòng</p>
                  <p className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">Tầng 5, Tòa nhà Tech, Cầu Giấy, HN</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- CỘT PHẢI: FORM GỬI TIN NHẮN --- */}
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-10 border border-gray-100 relative">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100 to-transparent rounded-tr-3xl -z-0"></div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Gửi tin nhắn trực tuyến</h3>

            <form className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="0912 xxx xxx"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Nội dung cần hỗ trợ</label>
                <textarea
                  rows="4"
                  placeholder="Tôi muốn tìm gia sư môn Toán cho con lớp 9..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <button type="button" className="w-full py-4 bg-yellow-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                <FaPaperPlane /> Gửi yêu cầu tư vấn
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-400 mt-4">
                  Hoặc chat ngay qua <a href="#" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"><FaFacebookMessenger /> Messenger</a>
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;