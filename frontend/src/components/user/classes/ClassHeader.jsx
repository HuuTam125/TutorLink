
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"></link>
const ClassHeader = () => {
  return (
    <div className="relative bg-[#F9FAFB] pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">

      {/* --- BACKGROUND DECORATION (Nhẹ nhàng & Tinh tế) --- */}
      {/* Blob xanh dương nhạt bên phải */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      {/* Blob tím nhạt bên trái */}
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-[400px] h-[400px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      {/* Grid Pattern mờ dưới nền để đỡ trống */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge nhỏ thông báo */}
        <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 shadow-sm mb-8 transform transition hover:scale-105 cursor-default">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600">
            Hơn <span className="font-bold text-blue-600">350+</span> lớp mới đang chờ bạn
          </span>
        </div>

        {/* TIÊU ĐỀ CHÍNH */}
        <h1
          className="
            font-['Plus_Jakarta_Sans']
            text-4xl md:text-5xl lg:text-6xl
            font-extrabold
            tracking-[-0.015em]
           [ text-shadow: 0px 0px 8px rgba(255,255,255,0.25) ]
            mb-6
          "
        >
          Tìm lớp gia sư <br className="hidden md:block" />
          <span
            className="
              text-transparent bg-clip-text
              bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400
            "
          >
            phù hợp nhất với bạn
          </span>
        </h1>
        <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto font-light mb-10">
          Kết nối trực tiếp với phụ huynh. Tự do lựa chọn môn học, khu vực và mức lương mong muốn.
        </p>

        {/* --- SEARCH BOX (Màu trắng, Shadow mềm) --- */}
        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-blue-900/5 max-w-4xl mx-auto border border-gray-100">
          <div className="flex flex-col md:flex-row gap-3">

            {/* Input Môn học */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all"
                placeholder="Nhập môn học (Toán, Lý, Piano...)"
              />
            </div>

            {/* Select Khu vực */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <select className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 appearance-none cursor-pointer transition-all">
                <option value="">Toàn quốc</option>
                <option value="hn">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="dn">Đà Nẵng</option>
              </select>
            </div>

            {/* Button Search */}
            <button className="md:w-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap">
              Tìm lớp ngay
            </button>
          </div>
        </div>

        {/* Quick Filters / Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in-up">
          <span className="text-sm text-gray-500 py-1">Gợi ý:</span>
          {['Toán lớp 12', 'Tiếng Anh giao tiếp', 'Ngữ Văn', 'IELTS', 'Tiểu học'].map((tag) => (
            <button key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              {tag}
            </button>
          ))}
        </div>

        {/* --- STATS SECTION (Đơn giản hóa) --- */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800">1.2K+</div>
            <div className="text-sm text-slate-500 mt-1">Lớp học active</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800">800+</div>
            <div className="text-sm text-slate-500 mt-1">Gia sư mới</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800">100%</div>
            <div className="text-sm text-slate-500 mt-1">Miễn phí nhận lớp</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800">24/7</div>
            <div className="text-sm text-slate-500 mt-1">Hỗ trợ nhanh</div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ClassHeader;