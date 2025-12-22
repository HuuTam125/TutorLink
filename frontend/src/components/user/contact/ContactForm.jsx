
const ContactForm = () => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Gửi tin nhắn</h3>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tên */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Họ và tên</label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-slate-700"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-slate-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Số điện thoại */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Số điện thoại</label>
            <input
              type="tel"
              placeholder="0912..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-slate-700"
            />
          </div>

          {/* Chủ đề */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Vấn đề cần hỗ trợ</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-slate-700 appearance-none cursor-pointer">
              <option>Tìm gia sư</option>
              <option>Đăng ký làm gia sư</option>
              <option>Khiếu nại / Góp ý</option>
              <option>Hợp tác doanh nghiệp</option>
            </select>
          </div>
        </div>

        {/* Nội dung */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Nội dung chi tiết</label>
          <textarea
            rows="5"
            placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all resize-none text-slate-700"
          ></textarea>
        </div>

        {/* Submit Button - Màu lì (Matte) */}
        <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg shadow-lg shadow-slate-300/50 transition-all duration-300 transform active:scale-[0.98]">
          Gửi yêu cầu
        </button>

      </form>
    </div>
  );
};

export default ContactForm;