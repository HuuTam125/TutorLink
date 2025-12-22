import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      {/* Header nhỏ */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Thông tin liên hệ</h3>
        <p className="text-slate-500 leading-relaxed">
          Chúng tôi luôn sẵn sàng lắng nghe. Đội ngũ tư vấn sẽ phản hồi bạn trong thời gian sớm nhất (Thường là trong 2h làm việc).
        </p>
      </div>

      {/* Danh sách Cards */}
      <div className="space-y-4">
        <InfoCard
          icon={<FaMapMarkerAlt />}
          label="Văn phòng chính"
          content="Tầng 5, Tòa nhà Tech, Thủ Đức, Hồ Chí Minh"
        />
        <InfoCard
          icon={<FaEnvelope />}
          label="Email hỗ trợ"
          content="support@tutorlink.vn"
          isLink={true}
          href="mailto:support@tutorlink.vn"
        />
        <InfoCard
          icon={<FaPhoneAlt />}
          label="Hotline tư vấn"
          content="1900 6868"
          isLink={true}
          href="tel:19006868"
        />
        <InfoCard
          icon={<FaClock />}
          label="Giờ làm việc"
          content="Thứ 2 - Thứ 7: 8:00 - 17:30"
        />
      </div>

      {/* Social Links (Đơn giản) */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Mạng xã hội</p>
        <div className="flex gap-3">
          {[FaFacebookF, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
            <a key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-component cho từng dòng thông tin
const InfoCard = ({ icon, label, content, isLink, href }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-blue-100 transition-colors">
    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-500 shadow-sm border border-slate-50 flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      {isLink ? (
        <a href={href} className="text-slate-700 font-medium hover:text-blue-600 transition-colors">
          {content}
        </a>
      ) : (
        <p className="text-slate-700 font-medium">{content}</p>
      )}
    </div>
  </div>
);

export default ContactInfo;