import { FaShieldAlt, FaRocket, FaHandHoldingUsd, FaUserClock } from 'react-icons/fa';

const ValuePropositionSection = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-2xl text-white" />,
      bg: "bg-blue-500",
      title: "Hồ sơ xác thực 100%",
      desc: "Tất cả gia sư đều được kiểm duyệt kỹ càng về bằng cấp, thẻ sinh viên và CMND/CCCD trước khi nhận lớp."
    },
    {
      icon: <FaRocket className="text-2xl text-white" />,
      bg: "bg-orange-500",
      title: "Kết nối siêu tốc",
      desc: "Tìm được gia sư ưng ý chỉ trong vòng 24 giờ. Hệ thống tự động gợi ý ứng viên phù hợp nhất với yêu cầu."
    },
    {
      icon: <FaHandHoldingUsd className="text-2xl text-white" />,
      bg: "bg-green-500",
      title: "Chi phí minh bạch",
      desc: "Học phí được thỏa thuận rõ ràng. Phụ huynh không mất phí môi giới. Gia sư được bảo vệ quyền lợi thu nhập."
    },
    {
      icon: <FaUserClock className="text-2xl text-white" />,
      bg: "bg-purple-500",
      title: "Học thử miễn phí",
      desc: "Quyền lợi học thử 01 - 02 buổi để đánh giá sự phù hợp về phương pháp dạy trước khi cam kết lâu dài."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-blue-600 font-bold tracking-wide uppercase mb-2">Tại sao chọn TutorLink?</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Nền tảng giáo dục <span className="text-blue-600">Tin cậy</span> & <span className="text-blue-600">Hiệu quả</span>
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Chúng tôi giải quyết mọi lo lắng của phụ huynh và gia sư bằng quy trình chuyên nghiệp.
          </p>
        </div>

        {/* Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon Box */}
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValuePropositionSection;