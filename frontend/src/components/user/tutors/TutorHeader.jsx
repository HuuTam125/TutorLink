
const TutorHeader = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* BACKGROUND DECORATION */}
      {/* Một mảng màu xám nhạt chéo để tạo sự năng động nhưng không rối mắt */}
      <div className="hidden lg:block absolute right-0 top-0 h-full w-1/2 bg-indigo-50/50 -skew-x-12 translate-x-20"></div>

      {/* Blob trang trí mờ */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* --- CỘT TRÁI: TEXT & LỢI ÍCH --- */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Label nhỏ phía trên */}
              <span className="inline-block py-1 px-3 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                Dành cho Phụ huynh & Học sinh
              </span>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Tìm gia sư giỏi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                  chỉ trong 2 phút
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg">
                Điền thông tin lớp học, yêu cầu của bạn và nhận danh sách gia sư phù hợp nhất. Hoàn toàn miễn phí đăng tin.
              </p>
            </div>

            {/* Danh sách lợi ích (Checkmarks) */}
            <div className="space-y-3">
              {[
                "Kết nối trực tiếp, không qua trung gian",
                "Gia sư đã được xác thực danh tính & bằng cấp",
                "Học thử 01 buổi miễn phí để đánh giá",
                "Đổi gia sư miễn phí nếu không phù hợp"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Call to Action (Mũi tên chỉ xuống form) */}
            <div className="pt-4 flex items-center gap-2 text-indigo-600 font-semibold cursor-pointer hover:text-indigo-800 transition-colors">
              <span>Bắt đầu điền thông tin bên dưới</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>

          {/* --- CỘT PHẢI: HÌNH ẢNH MINH HỌA --- */}
          <div className="relative">
            {/* Hình nền tròn trang trí */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] bg-blue-100 rounded-full opacity-50"></div>

            {/* Hình ảnh chính (Cắt bo tròn hoặc dùng ảnh xóa phông) */}
            {/* Link ảnh mẫu: Học sinh đang học vui vẻ */}
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Student happy learning"
                className="rounded-2xl shadow-2xl mx-auto w-full max-w-md object-cover h-[400px] lg:h-[500px]"
              />

              {/* Floating Card: Thẻ nổi "Đã tìm được" */}
              <div className="absolute bottom-10 -left-6 lg:-left-12 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4 animate-fade-in-up">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Kết quả</p>
                  <p className="text-sm font-bold text-gray-900">Tìm được gia sư ưng ý</p>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Card: Thẻ nổi "Support" bên phải */}
              <div className="hidden sm:flex absolute top-10 -right-6 lg:-right-8 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Đường kẻ mờ ngăn cách với phần Form bên dưới */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
  );
};

export default TutorHeader;
