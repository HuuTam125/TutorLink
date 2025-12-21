import { useState, useEffect } from 'react';
import {
  FaPen, FaSave, FaTimes, FaCamera,
  FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt, FaBirthdayCake, FaVenusMars
} from 'react-icons/fa';

const UserInfoTab = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  // State quản lý form (Giả lập dữ liệu ban đầu từ user props)
  const [formData, setFormData] = useState({
    fullname: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || 'male',
    dob: user?.dob || '2004-12-01',
    address: user?.address || '',
    bio: user?.bio || '',
    avatar: user?.avatar || null
  });

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Nút Hủy bỏ
  const handleCancel = () => {
    setIsEditing(false);
    // Reset lại data cũ nếu cần
  };

  return (
    <div className="space-y-8">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Thông tin cá nhân</h2>
          <p className="text-slate-500 text-sm mt-1">Quản lý thông tin hiển thị trên hồ sơ của bạn.</p>
        </div>

        {/* Toggle Edit Button */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
          >
            <FaPen size={14} /> <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-all"
            >
              <FaTimes size={14} /> <span>Hủy</span>
            </button>
            <button
              onClick={() => { /* Call API Update here */ setIsEditing(false); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
            >
              <FaSave size={14} /> <span>Lưu thay đổi</span>
            </button>
          </div>
        )}
      </div>

      {/* --- BODY SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* 1. LEFT COLUMN: Avatar & Bio */}
        <div className="lg:col-span-4 flex flex-col items-center space-y-6">

          {/* Avatar Upload */}
          <div className="relative group cursor-pointer">
            <div className={`w-40 h-40 rounded-full p-1.5 border-2 ${isEditing ? 'border-blue-400 border-dashed' : 'border-slate-100'}`}>
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-50">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-slate-300 bg-slate-100">
                    {formData.fullname?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Overlay khi Edit */}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCamera className="text-white text-2xl" />
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                )}
              </div>
            </div>
            {isEditing && <p className="text-xs text-center text-slate-400 mt-2">Chạm để thay đổi ảnh</p>}
          </div>

          {/* User Role Badge */}
          <div className="text-center">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${user?.role === 'tutor' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {user?.role === 'tutor' ? 'Gia sư đối tác' : 'Phụ huynh '}
            </span>
            <p className="text-xs text-slate-400 mt-2">Tham gia từ 20/12/2024</p>
          </div>

          {/* Bio Field */}
          <div className="w-full">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Giới thiệu ngắn</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-sm"
                placeholder="Viết đôi dòng về bản thân bạn..."
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                "{formData.bio || 'Chưa có thông tin giới thiệu.'}"
              </p>
            )}
          </div>
        </div>

        {/* 2. RIGHT COLUMN: Form Details */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Họ và tên</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-xl font-semibold text-slate-800 outline-none transition-all
                  ${isEditing
                    ? 'bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                    : 'bg-slate-50 border border-transparent'}`}
              />
            </div>

            {/* Email (Read-only usually) */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email đăng nhập
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-5 py-3.5 rounded-xl font-medium text-slate-500 bg-slate-100 border border-transparent cursor-not-allowed"
                />
                {/* Verified Badge */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 flex items-center gap-1 text-xs font-bold bg-green-50 px-2 py-1 rounded-md border border-green-100">
                  <FaCheckCircle /> 已 xác thực
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Số điện thoại</label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-5 py-3.5 rounded-xl font-medium text-slate-800 outline-none transition-all
                    ${isEditing
                      ? 'bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                      : 'bg-slate-50 border border-transparent'}`}
                />
                {!isEditing && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 tooltip" title="Đã xác thực">
                    <FaCheckCircle />
                  </div>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <FaVenusMars /> Giới tính
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-5 py-3.5 rounded-xl font-medium text-slate-800 outline-none appearance-none transition-all
                    ${isEditing
                      ? 'bg-white border border-slate-200 focus:border-blue-500'
                      : 'bg-slate-50 border border-transparent cursor-default'}`}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <FaBirthdayCake /> Ngày sinh
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-xl font-medium text-slate-800 outline-none transition-all
                  ${isEditing
                    ? 'bg-white border border-slate-200 focus:border-blue-500'
                    : 'bg-slate-50 border border-transparent'}`}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <FaMapMarkerAlt /> Địa chỉ liên hệ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="VD: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM"
                className={`w-full px-5 py-3.5 rounded-xl font-medium text-slate-800 outline-none transition-all
                  ${isEditing
                    ? 'bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                    : 'bg-slate-50 border border-transparent'}`}
              />
            </div>

          </div>

          {/* Warning Note (chỉ hiện khi Edit) */}
          {isEditing && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800 text-sm">
              <FaExclamationCircle className="mt-0.5 flex-shrink-0" />
              <p>Lưu ý: Thay đổi Email hoặc Số điện thoại có thể yêu cầu xác thực lại tài khoản. Hãy chắc chắn thông tin của bạn là chính xác.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoTab;