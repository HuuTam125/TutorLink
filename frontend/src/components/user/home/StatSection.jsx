import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    { val: 15000, label: "Gia sư chất lượng", suffix: "+" },
    { val: 98, label: "Tỷ lệ đỗ ĐH/C3", suffix: "%" },
    { val: 4.9, label: "Điểm đánh giá", suffix: "/5", isDecimal: true },
    { val: 30, label: "Phút kết nối", suffix: "p" },
  ];

  return (
    // THAY ĐỔI: Dùng section riêng biệt, padding trên dưới rộng rãi (py-12), nền màu kem #f9f9f6
    <section className="w-full py-12 bg-[#f9f9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          // Card màu trắng nằm giữa nền kem, tạo sự tách biệt nhẹ nhàng
          className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(25,51,102,0.05)] border border-[#193366]/5 p-8 md:p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 relative">
            {stats.map((stat, idx) => (
              <div key={idx} className="relative flex flex-col items-center justify-center text-center group">

                {/* Border ngăn cách dọc (Chỉ hiện trên Desktop) */}
                {idx !== stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-[#193366]/10"></div>
                )}

                {/* Border ngăn cách ngang (Chỉ hiện trên Mobile cho 2 item đầu) */}
                {idx < 2 && (
                  <div className="md:hidden absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-16 h-[1px] bg-[#193366]/10"></div>
                )}

                {/* Số liệu */}
                <div className="mb-2">
                  <div className="text-4xl md:text-5xl font-extrabold text-[#193366] tracking-tight">
                    <CountUp
                      end={stat.val}
                      duration={2.5}
                      decimals={stat.isDecimal ? 1 : 0}
                      separator=","
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    <span className="text-2xl md:text-3xl text-[#193366]/60 ml-1 font-bold align-super">
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                {/* Label */}
                <p className="text-sm font-semibold text-gray-500 group-hover:text-[#193366] transition-colors uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;