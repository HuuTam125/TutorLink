import React, { useState } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from 'recharts';
import { FiUsers, FiBookOpen, FiActivity, FiCheckCircle, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

// --- CONFIGURATION: COLOR PALETTE 2025 (GREEN SOFT) ---
const THEME = {
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981', // Green Main
    600: '#059669',
    gradientStart: '#10b981',
    gradientEnd: '#ecfdf5',
  },
  neutral: {
    bgPage: '#f8fafc',
    bgCard: '#ffffff',
    border: '#e5e7eb',
    textTitle: '#0f172a',
    textBody: '#334155',
    textMuted: '#94a3b8',
    gridLines: '#f1f5f9'
  },
  accent: {
    blue: '#3b82f6',
    yellow: '#f59e0b',
    purple: '#8b5cf6'
  }
};

const AdminDashboard = ({ stats }) => {
  // State để xử lý hiệu ứng hover cho PieChart (nâng cao)
  const [activeIndex, setActiveIndex] = useState(0);

  // Nếu chưa có data thì return null hoặc loading
  if (!stats || !stats.counts) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#10b981] mb-4"></div>
      <span className="text-slate-400 font-medium">Đang phân tích dữ liệu...</span>
    </div>
  );

  // --- DATA PREPARATION ---

  // 1. Dữ liệu PieChart
  const pieData = [
    { name: 'Đang tìm', value: stats.counts.activeClasses, color: THEME.accent.blue },
    { name: 'Đã kết nối', value: stats.counts.matchedClasses, color: THEME.primary[500] },
    { name: 'Chờ duyệt', value: stats.counts.pendingClasses, color: THEME.accent.yellow },
  ];

  // 2. Dữ liệu Doanh thu (Mockup)
  const revenueData = [
    { name: 'T8', deposit: 4000000, revenue: 240000 },
    { name: 'T9', deposit: 3000000, revenue: 139800 },
    { name: 'T10', deposit: 2000000, revenue: 980000 },
    { name: 'T11', deposit: 2780000, revenue: 390800 },
    { name: 'T12', deposit: 1890000, revenue: 480000 },
    { name: 'T1', deposit: 2390000, revenue: 380000 },
  ];

  // 3. Dữ liệu Top Môn học (Sort lại để hiển thị đẹp hơn từ cao xuống thấp)
  const subjectData = [...stats.subjectChart]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Lấy top 5
    .map(s => ({ name: s._id, count: s.count }));


  // --- CUSTOM COMPONENTS FOR CHARTS ---

  // 1. Tooltip tùy chỉnh (Siêu đẹp)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 min-w-[200px]">
          <p className="font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <span className="text-xs font-medium flex items-center gap-2" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}:
              </span>
              <span className="text-sm font-bold text-slate-600">
                {/* Format tiền tệ nếu giá trị lớn, format số thường nếu nhỏ */}
                {entry.value > 1000
                  ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(entry.value)
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // 2. Active Shape cho PieChart (Hiệu ứng phình to khi hover)
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    return (
      <g>
        <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={THEME.neutral.textTitle} className="text-2xl font-bold">
          {value}
        </text>
        <text x={cx} y={cy} dy={15} textAnchor="middle" fill={THEME.neutral.textMuted} className="text-xs">
          {payload.name}
        </text>
        <Sector
          cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} // Phình ra 8px
          startAngle={startAngle} endAngle={endAngle} fill={fill} cornerRadius={6}
        />
        <Sector
          cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle}
          innerRadius={innerRadius - 6} outerRadius={innerRadius - 2} fill={fill} // Vòng nhỏ trang trí bên trong
        />
      </g>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in-up p-2 font-sans text-slate-600 bg-[#f8fafc]">

      {/* --- DEFINITION FOR GRADIENTS (Quan trọng để chart đẹp) --- */}
      <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
        <svg>
          <defs>
            {/* Gradient Xanh lá cho Revenue */}
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={THEME.primary[500]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={THEME.primary[500]} stopOpacity={0} />
            </linearGradient>
            {/* Gradient Blue cho Deposit */}
            <linearGradient id="colorDeposit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={THEME.accent.blue} stopOpacity={0.2} />
              <stop offset="95%" stopColor={THEME.accent.blue} stopOpacity={0} />
            </linearGradient>
            {/* Gradient Purple cho Subjects */}
            <linearGradient id="colorSubject" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* --- SECTION 1: STAT CARDS (Giữ nguyên style gọn gàng của bản trước) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Tổng Người dùng" value={stats.counts.users} icon={<FiUsers />} variant="blue" sub="Active Users" />
        <StatCard title="Lớp đã kết nối" value={stats.counts.matchedClasses} icon={<FiCheckCircle />} variant="green" sub="Success Rate" />
        <StatCard title="Lớp đang tìm" value={stats.counts.activeClasses} icon={<FiBookOpen />} variant="purple" sub="Open Requests" />
        <StatCard title="Cần xử lý gấp" value={stats.counts.pendingTutors + stats.counts.pendingClasses} icon={<FiActivity />} variant="red" sub="Action Needed" />
      </div>

      {/* --- SECTION 2: ADVANCED CHARTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CHART 1: DOANH THU (Chiếm 2/3 chiều rộng) - Dùng ComposedChart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FiDollarSign className="text-emerald-500" /> Hiệu quả Kinh doanh
              </h3>
              <p className="text-sm text-slate-400 mt-1">So sánh tiền nạp vào hệ thống vs Doanh thu thực</p>
            </div>
            <div className="flex gap-2 text-xs font-medium">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Tiền nạp
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Doanh thu
              </span>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData} barGap={-20} /* barGap âm để lồng nhau nếu muốn, hoặc dương để tách */>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME.neutral.gridLines} />
                <XAxis
                  dataKey="name" axisLine={false} tickLine={false} dy={10}
                  tick={{ fill: THEME.neutral.textMuted, fontSize: 12 }}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fill: THEME.neutral.textMuted, fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', opacity: 0.5 }} />

                {/* 1. Bar: Tiền nạp (Nền phía sau) */}
                <Bar
                  dataKey="deposit" name="Tiền nạp"
                  barSize={30} radius={[8, 8, 8, 8]}
                  fill="url(#colorDeposit)" // Dùng gradient nhẹ
                />

                {/* 2. Area: Doanh thu (Đường cong phía trước) - Nhấn mạnh */}
                <Area
                  type="monotone" dataKey="revenue" name="Doanh thu"
                  stroke={THEME.primary[500]} strokeWidth={3}
                  fill="url(#colorRevenue)"
                />

                {/* 3. Dot: Điểm nhấn trên đường line */}
                <Line
                  type="monotone" dataKey="revenue" stroke="none"
                  dot={{ r: 4, fill: THEME.primary[500], strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: TRẠNG THÁI LỚP (Chiếm 1/3 chiều rộng) - Dùng Active Shape Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <FiBookOpen className="text-indigo-500" /> Phân bổ Lớp học
          </h3>
          <p className="text-sm text-slate-400 mb-6">Tương tác để xem chi tiết</p>

          <div className="flex-1 min-h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape} // Hàm render custom khi hover
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4} // Tạo khe hở giữa các miếng
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    // cornerRadius tạo bo góc cho từng miếng bánh -> Rất hiện đại
                    <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={6} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend nhỏ gọn bên dưới */}
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center cursor-pointer" onClick={() => setActiveIndex(idx)}>
                <span className="w-8 h-1 rounded-full mb-1 transition-all"
                  style={{ backgroundColor: activeIndex === idx ? item.color : '#e2e8f0' }}></span>
                <span className={`text-xs font-medium ${activeIndex === idx ? 'text-slate-800' : 'text-slate-400'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECTION 3: TOP SUBJECTS (Style Progress Bar) --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <FiTrendingUp className="text-purple-500" /> Xu hướng Môn học
        </h3>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart layout="vertical" data={subjectData} margin={{ left: 10, right: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name" type="category" width={100}
                tick={{ fill: THEME.neutral.textTitle, fontWeight: 600, fontSize: 13 }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

              {/* Background Bar (Màu xám mờ làm nền cho thanh progress) */}
              <Bar dataKey="count" barSize={12} radius={[0, 6, 6, 0]} fill="#f1f5f9" isAnimationActive={false} />

              {/* Foreground Bar (Màu gradient chính) */}
              <Bar
                dataKey="count"
                barSize={12}
                radius={[0, 6, 6, 0]}
                fill="url(#colorSubject)" // Dùng gradient tím
                background={{ fill: '#f8fafc' }} // Fallback background
              >
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

// Component StatCard giữ nguyên nhưng đảm bảo import đúng icon
const StatCard = ({ title, value, icon, variant = 'green', sub }) => {
  const variants = {
    green: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
    purple: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-100' },
    red: { bg: 'bg-rose-50', text: 'text-rose-600', ring: 'ring-rose-100' },
  };
  const style = variants[variant];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h4 className="text-3xl font-extrabold text-slate-800 group-hover:text-green-600 transition-colors">
            {value.toLocaleString()}
          </h4>
        </div>
        <div className={`p-3 rounded-xl ${style.bg} ${style.text} ring-1 ${style.ring}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 w-fit px-2 py-1 rounded-md">
        {sub}
      </div>
    </div>
  );
};

export default AdminDashboard;