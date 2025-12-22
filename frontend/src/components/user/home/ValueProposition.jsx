import { motion } from 'framer-motion';
import { FaShieldAlt, FaRocket, FaHandHoldingUsd, FaUserClock, FaArrowRight } from 'react-icons/fa';

const ValuePropositionSection = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      color: "blue",
      title: "Hồ sơ xác thực 100%",
      desc: "Tất cả gia sư đều được kiểm duyệt bằng cấp, thẻ sinh viên và CCCD. An tâm tuyệt đối khi nhận lớp."
    },
    {
      icon: <FaRocket className="text-2xl text-orange-600" />,
      color: "orange",
      title: "Kết nối siêu tốc",
      desc: "Tìm gia sư ưng ý chỉ trong 24 giờ. Hệ thống AI tự động gợi ý ứng viên phù hợp nhất."
    },
    {
      icon: <FaHandHoldingUsd className="text-2xl text-emerald-600" />,
      color: "emerald", // Dùng emerald thay vì green để màu tây hơn
      title: "Chi phí minh bạch",
      desc: "Không phí môi giới ẩn. Học phí được niêm yết rõ ràng. Bảo vệ quyền lợi thu nhập cho gia sư."
    },
    {
      icon: <FaUserClock className="text-2xl text-purple-600" />,
      color: "purple",
      title: "Học thử miễn phí",
      desc: "Quyền lợi học thử 02 buổi để đánh giá phương pháp dạy và sự tương tác trước khi cam kết."
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">

      {/* Background Decor (Optional - Subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4"
          >
            Tại sao chọn TutorLink?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Nền tảng giáo dục <br />
            <span className="relative inline-block">
              <span className="relative z-10">Tin cậy & Hiệu quả</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/50 -z-0"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-500 leading-relaxed"
          >
            Chúng tôi xóa bỏ rào cản tìm kiếm tri thức bằng công nghệ và quy trình kiểm duyệt nghiêm ngặt nhất.
          </motion.p>
        </div>

        {/* Grid Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Hover Gradient Border Effect */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-${feature.color}-100 transition-colors pointer-events-none`}></div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                {feature.desc}
              </p>

              {/* Learn More Link (Optional - adds interactivity) */}
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span>Chi tiết</span>
                <FaArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ValuePropositionSection;