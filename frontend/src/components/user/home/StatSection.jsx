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
    <div className="relative w-full px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-20 z-30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        {/* Glass Container */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100/80 gap-y-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center group px-2">
                <div className="relative">
                  {/* Decorative Blob behind number */}
                  <div className="absolute -inset-4 bg-blue-100/50 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-2">
                    <CountUp
                      end={stat.val}
                      duration={2.5}
                      decimals={stat.isDecimal ? 1 : 0}
                      separator=","
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    <span className="ml-1 text-2xl md:text-4xl text-indigo-500">{stat.suffix}</span>
                  </div>
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-500 group-hover:text-blue-600 transition-colors uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsSection;