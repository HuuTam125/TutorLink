import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialsAndCTA = () => {
  return (
    <>
      {/* 1. TESTIMONIALS (Dark Mode) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Người dùng nói gì về chúng tôi?</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-slate-800 p-8 rounded-2xl relative">
              <FaQuoteLeft className="text-blue-500 text-4xl mb-4 opacity-30" />
              <p className="text-slate-300 italic mb-6 leading-relaxed">
                "Tôi đã tìm được gia sư tiếng Anh cho con chỉ sau 2 tiếng đăng bài. Thầy giáo rất nhiệt tình và có phương pháp dạy hiện đại. Rất hài lòng!"
              </p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-12 h-12 rounded-full border-2 border-blue-500" />
                <div>
                  <h4 className="font-bold text-white">Chị Thu Hà</h4>
                  <p className="text-xs text-slate-400">Phụ huynh tại Hà Nội</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-slate-800 p-8 rounded-2xl relative transform md:-translate-y-4 shadow-xl border border-slate-700">
              <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">Nổi bật</div>
              <FaQuoteLeft className="text-blue-500 text-4xl mb-4 opacity-30" />
              <p className="text-slate-300 italic mb-6 leading-relaxed">
                "Là sinh viên Sư phạm, web giúp mình kiếm thêm thu nhập ổn định mà không mất phí môi giới cao như trung tâm. Giao diện rất dễ dùng."
              </p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-12 h-12 rounded-full border-2 border-blue-500" />
                <div>
                  <h4 className="font-bold text-white">Bạn Minh Tú</h4>
                  <p className="text-xs text-slate-400">Gia sư Sinh viên</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-slate-800 p-8 rounded-2xl relative">
              <FaQuoteLeft className="text-blue-500 text-4xl mb-4 opacity-30" />
              <p className="text-slate-300 italic mb-6 leading-relaxed">
                "Hệ thống so khớp rất thông minh. Mình tìm được lớp dạy gần nhà, tiết kiệm thời gian đi lại. Đội ngũ hỗ trợ cũng rất nhanh."
              </p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=59" alt="User" className="w-12 h-12 rounded-full border-2 border-blue-500" />
                <div>
                  <h4 className="font-bold text-white">Thầy Hoàng</h4>
                  <p className="text-xs text-slate-400">Giáo viên tự do</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BIG CTA SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Sẵn sàng <span className="text-amber-400">bứt phá</span> kết quả học tập?
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Tham gia cộng đồng học tập lớn nhất Việt Nam ngay hôm nay. Hoàn toàn miễn phí để bắt đầu.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Đăng tin tìm Gia sư
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 font-bold rounded-full text-lg hover:border-blue-600 hover:text-blue-600 hover:-translate-y-1 transition-all">
              Đăng ký làm Gia sư
            </button>
          </div>
        </div>

        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50"></div>
      </section>
    </>
  );
};

export default TestimonialsAndCTA;