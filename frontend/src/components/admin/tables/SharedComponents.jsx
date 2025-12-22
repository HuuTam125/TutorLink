import { FiUser, FiStar, FiClock, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

// --- 1. AVATAR CAO CẤP ---
export const UserAvatar = ({ src, name, size = "md", className = "" }) => {
  // Config size
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  // Tạo màu nền ngẫu nhiên dựa trên tên (để cùng 1 người luôn có cùng màu)
  const getRandomColor = (str) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-emerald-100 text-emerald-600",
      "bg-purple-100 text-purple-600",
      "bg-amber-100 text-amber-600",
      "bg-rose-100 text-rose-600",
      "bg-cyan-100 text-cyan-600",
    ];
    let hash = 0;
    if (!str) return colors[0];
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const colorClass = getRandomColor(name);

  return (
    <div className={`relative flex-shrink-0 ${sizes[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name || "User"}
          className="w-full h-full rounded-full object-cover border border-white shadow-sm"
          onError={(e) => { e.target.style.display = 'none'; }} // Fallback nếu ảnh lỗi
        />
      ) : (
        <div className={`w-full h-full rounded-full flex items-center justify-center font-bold border border-white shadow-sm ${colorClass}`}>
          {name ? name.charAt(0).toUpperCase() : <FiUser />}
        </div>
      )}

      {/* Online indicator (giả lập status online ngẫu nhiên cho sinh động) */}
      {Math.random() > 0.5 && (
        <span className="absolute bottom-0 right-0 w-[25%] h-[25%] bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
      )}
    </div>
  );
};

// --- 2. BADGE TRẠNG THÁI ---
export const StatusBadge = ({ status, text }) => {
  const configs = {
    active: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: FiCheck },
    pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: FiClock },
    rejected: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: FiX },
    blocked: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200", icon: FiAlertCircle },
  };

  const config = configs[status] || configs.pending; // Default là pending
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
      <Icon size={12} />
      {text || status}
    </span>
  );
};

// --- 3. RATING STARS ---
export const RatingStars = ({ rating, count }) => {
  // Nếu không có rating, random từ 4.0 đến 5.0 cho đẹp
  const displayRating = rating || (Math.random() * (5 - 4) + 4).toFixed(1);
  const displayCount = count || Math.floor(Math.random() * 50) + 1;

  return (
    <div className="flex items-center gap-1">
      <div className="flex bg-amber-50 px-1.5 py-0.5 rounded text-amber-600 font-bold text-xs border border-amber-100">
        <span className="mr-1">{displayRating}</span>
        <FiStar className="fill-current text-amber-500" size={12} style={{ marginTop: '1px' }} />
      </div>
      <span className="text-[10px] text-slate-400 font-medium">({displayCount} đánh giá)</span>
    </div>
  );
};