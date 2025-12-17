import { FaUserPlus, FaSearchPlus, FaComments, FaHandshake } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Đăng ký tài khoản",
      desc: "Tạo hồ sơ nhanh chóng. Phụ huynh đăng yêu cầu, Gia sư cập nhật bằng cấp."
    },
    {
      id: 2,
      icon: <FaSearchPlus />,
      title: "Tìm kiếm & Kết nối",
      desc: "Hệ thống gợi ý danh sách phù hợp. Phụ huynh mời dạy hoặc Gia sư ứng tuyển."
    },
    {
      id: 3,
      icon: <FaComments />,
      title: "Trao đổi & Dạy thử",
      desc: "Hai bên phỏng vấn trực tiếp. Sắp xếp 01 - 02 buổi dạy thử để đánh giá."
    },
    {
      id: 4,
      icon: <FaHandshake />,
      title: "Nhận lớp chính thức",
      desc: "Chốt lịch học và học phí. Bắt đầu hành trình học tập hiệu quả."
    }
  ];

  return (
    <section className="py-20 bg-[#F8F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Quy trình đơn giản</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Dễ dàng bắt đầu chỉ với 4 bước. Chúng tôi tối ưu hóa trải nghiệm để tiết kiệm thời gian cho bạn.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[12%] w-[76%] h-0.5 border-t-2 border-dashed border-gray-300 z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
              {/* Icon Circle */}
              <div className="w-24 h-24 bg-white rounded-full border-4 border-[#F8F9FC] shadow-lg flex items-center justify-center text-3xl text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>

              {/* Step Number Badge */}
              <div className="absolute top-0 right-[25%] bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                {step.id}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;