import { motion } from 'framer-motion';
import { FaShieldAlt, FaRocket, FaHandHoldingUsd, FaUserClock, FaArrowRight } from 'react-icons/fa';

const ValuePropositionSection = () => {
  const features = [
    {
      // SỬA LỖI: Xóa 'text-[#193366]' ở đây để icon nhận màu từ thẻ cha
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Hồ sơ xác thực 100%",
      desc: "Tất cả gia sư đều được kiểm duyệt bằng cấp, thẻ sinh viên và CCCD. An tâm tuyệt đối khi nhận lớp."
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Kết nối siêu tốc",
      desc: "Tìm gia sư ưng ý chỉ trong 24 giờ. Hệ thống AI tự động gợi ý ứng viên phù hợp nhất."
    },
    {
      icon: <FaHandHoldingUsd className="text-2xl" />,
      title: "Chi phí minh bạch",
      desc: "Không phí môi giới ẩn. Học phí được niêm yết rõ ràng. Bảo vệ quyền lợi thu nhập cho gia sư."
    },
    {
      icon: <FaUserClock className="text-2xl" />,
      title: "Học thử miễn phí",
      desc: "Quyền lợi học thử 02 buổi để đánh giá phương pháp dạy và sự tương tác trước khi cam kết."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#193366]/[0.02] rounded-bl-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-[#193366]/5 text-[#193366] text-xs font-bold uppercase tracking-wider mb-4 border border-[#193366]/10"
          >
            Tại sao chọn TutorLink?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#193366] leading-tight"
          >
            Nền tảng giáo dục <br />
            <span className="relative inline-block">
              <span className="relative z-10">Tin cậy & Hiệu quả</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#193366]/10 -z-0"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-500 leading-relaxed font-medium"
          >
            Chúng tôi xóa bỏ rào cản tìm kiếm tri thức bằng công nghệ và quy trình kiểm duyệt nghiêm ngặt nhất.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              // Thêm group vào đây để xử lý hover
              className="group relative bg-[#f9f9f6] rounded-2xl p-8 border border-transparent hover:border-[#193366]/10 hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(25,51,102,0.08)] transition-all duration-300"
            >
              {/* Icon Box */}
              {/* SỬA LỖI: Thêm text-[#193366] (mặc định) và group-hover:text-white (khi hover) vào thẻ cha này */}
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-[#193366]/5 flex items-center justify-center mb-6 
                              text-[#193366] group-hover:bg-[#193366] group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-[#193366] mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-medium">
                {feature.desc}
              </p>

              <div className="flex items-center gap-2 text-sm font-bold text-[#193366] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span>Tìm hiểu thêm</span>
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