import React from 'react';
import {
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF,
  FaLinkedinIn, FaYoutube, FaPaperPlane, FaUser, FaRegCommentDots
} from 'react-icons/fa';

// --- SUB-COMPONENT 1: CONTACT INFO (Cột trái) ---
const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-extrabold text-[#193366] mb-4">Thông tin liên hệ</h3>
        <p className="text-gray-500 font-medium leading-relaxed">
          Đừng ngần ngại liên hệ với chúng tôi. Đội ngũ tư vấn sẵn sàng hỗ trợ bạn từ 8:00 - 21:00 hàng ngày (kể cả T7, CN).
        </p>
      </div>

      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-white rounded-xl border border-[#193366]/10 flex items-center justify-center text-[#193366] shadow-sm group-hover:bg-[#193366] group-hover:text-white transition-all duration-300">
            <FaMapMarkerAlt size={20} />
          </div>
          <div>
            <h4 className="font-bold text-[#193366] text-sm uppercase tracking-wide mb-1">Địa chỉ</h4>
            <p className="text-gray-600 font-medium">Tầng 5, Tòa nhà Tech, Thủ Đức, Hồ Chí Minh</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-white rounded-xl border border-[#193366]/10 flex items-center justify-center text-[#193366] shadow-sm group-hover:bg-[#193366] group-hover:text-white transition-all duration-300">
            <FaPhoneAlt size={18} />
          </div>
          <div>
            <h4 className="font-bold text-[#193366] text-sm uppercase tracking-wide mb-1">Hotline</h4>
            <p className="text-gray-600 font-medium">1900 6868</p>
            <p className="text-sm text-gray-400">024 3333 8888</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-white rounded-xl border border-[#193366]/10 flex items-center justify-center text-[#193366] shadow-sm group-hover:bg-[#193366] group-hover:text-white transition-all duration-300">
            <FaEnvelope size={18} />
          </div>
          <div>
            <h4 className="font-bold text-[#193366] text-sm uppercase tracking-wide mb-1">Email</h4>
            <p className="text-gray-600 font-medium">support@giasulink.vn</p>
            <p className="text-sm text-gray-400">hr@giasulink.vn</p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="pt-6 border-t border-[#193366]/10">
        <h4 className="font-bold text-[#193366] text-sm mb-4">Mạng xã hội</h4>
        <div className="flex gap-3">
          {[FaFacebookF, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
            <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white border border-[#193366]/10 flex items-center justify-center text-[#193366] hover:bg-[#193366] hover:text-white transition-all duration-300">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT 2: CONTACT FORM (Cột phải) ---
const ContactForm = () => {
  return (
    <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(25,51,102,0.1)] p-8 md:p-10 border border-[#193366]/5">
      <h3 className="text-2xl font-extrabold text-[#193366] mb-6">Gửi tin nhắn</h3>
      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#193366] transition-colors">
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium placeholder-gray-400 text-[#193366]"
            />
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#193366] transition-colors">
              <FaPhoneAlt />
            </div>
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium placeholder-gray-400 text-[#193366]"
            />
          </div>
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#193366] transition-colors">
            <FaEnvelope />
          </div>
          <input
            type="email"
            placeholder="Email của bạn"
            className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium placeholder-gray-400 text-[#193366]"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#193366] transition-colors">
            <FaRegCommentDots />
          </div>
          <textarea
            rows="4"
            placeholder="Nội dung cần hỗ trợ..."
            className="w-full pl-11 pr-4 py-3.5 bg-[#f9f9f6] border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#193366]/10 focus:border-[#193366]/30 transition-all font-medium placeholder-gray-400 text-[#193366] resize-none"
          ></textarea>
        </div>

        <button className="w-full py-4 bg-[#193366] text-white font-bold rounded-xl shadow-lg shadow-[#193366]/20 hover:shadow-[#193366]/40 hover:bg-[#193366]/90 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98]">
          <FaPaperPlane /> Gửi yêu cầu
        </button>
      </form>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const ContactPage = () => {
  return (
    // Nền kem ấm #f9f9f6
    <div className="bg-[#f9f9f6] min-h-screen font-sans">

      {/* 1. HEADER SECTION */}
      <div className="relative py-16 md:py-24 border-b border-[#193366]/5 overflow-hidden">
        {/* Decor Blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#193366]/5 rounded-full blur-3xl pointer-events-none translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#193366]/5 rounded-full blur-2xl pointer-events-none -translate-x-10 translate-y-10"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-[#193366]/5 text-[#193366] text-xs font-bold uppercase tracking-widest mb-4 border border-[#193366]/10">
            Liên hệ
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#193366] mb-6">Kết nối với chúng tôi</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Chúng tôi tin rằng mọi thắc mắc đều xứng đáng được giải đáp tận tình. <br className="hidden md:block" />
            Hãy để lại tin nhắn, chúng tôi sẽ hỗ trợ bạn ngay lập tức.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Cột trái: Thông tin (Chiếm 5 phần) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* Cột phải: Form (Chiếm 7 phần) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ContactForm />
          </div>

        </div>
      </div>

      {/* 3. SIMPLE MAP SECTION */}
      <div className="w-full h-96 bg-gray-200 relative grayscale-[20%] border-t border-[#193366]/10">
        <iframe
          src="https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Map"
          className="absolute inset-0 opacity-80 hover:opacity-100 transition-opacity duration-500"
        ></iframe>
      </div>

    </div>
  );
};

export default ContactPage;