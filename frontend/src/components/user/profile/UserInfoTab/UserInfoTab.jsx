import { useState, useEffect } from 'react';
import {
  FaPen, FaSave, FaTimes, FaCamera,
  FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt, FaBirthdayCake, FaVenusMars
} from 'react-icons/fa';

const UserInfoTab = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  // State quản lý form
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
    // Reset lại data cũ nếu cần (logic này tùy bạn implement thêm)
  };

  return (
    // Card Container: White bg, Rounded, Navy Shadow
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_4px_30px_-10px_rgba(25,51,102,0.05)] border border-[#193366]/5 animate-fade-in-up space-y-8 font-sans">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#193366]">Thông tin cá nhân</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">Quản lý thông tin hiển thị trên hồ sơ của bạn.</p>
        </div>

        {/* Toggle Edit Button */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-[#f9f9f6] hover:text-[#193366] hover:border-[#193366]/20 transition-all shadow-sm"
          >
            <FaPen size={12} /> <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f9f9f6] text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
            >
              <FaTimes size={14} /> <span>Hủy</span>
            </button>
            <button
              onClick={() => { /* Call API Update here */ setIsEditing(false); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#193366] text-white font-bold rounded-xl hover:bg-[#193366]/90 shadow-lg shadow-[#193366]/30 transition-all"
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
            <div className={`w-40 h-40 rounded-full p-1.5 border-2 ${isEditing ? 'border-[#193366] border-dashed' : 'border-gray-100'}`}>
              <div className="w-full h-full rounded-full overflow-hidden relative bg-[#f9f9f6]">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-[#193366]/20 bg-[#f9f9f6]">
                    {formData.fullname?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Overlay khi Edit */}
                {isEditing && (
                  <div className="absolute inset-0 bg-[#193366]/60 flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCamera className="text-white text-2xl" />
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                )}
              </div>
            </div>
            {isEditing && <p className="text-xs text-center text-gray-400 mt-2 font-medium">Chạm để thay đổi ảnh</p>}
          </div>

          {/* User Role Badge */}
          <div className="text-center">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border 
              ${user?.role === 'tutor'
                ? 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]'
                : 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]'
              }`}>
              {user?.role === 'tutor' ? 'Gia sư đối tác' : 'Phụ huynh'}
            </span>
            <p className="text-xs text-gray-400 mt-2 font-medium">Tham gia từ 20/12/2024</p>
          </div>

          {/* Bio Field */}
          <div className="w-full">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Giới thiệu ngắn</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-[#193366] font-medium focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none transition-all resize-none text-sm"
                placeholder="Viết đôi dòng về bản thân bạn..."
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed bg-[#f9f9f6] p-4 rounded-xl border border-transparent italic font-medium">
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
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Họ và tên</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-xl font-bold text-[#193366] outline-none transition-all
                  ${isEditing
                    ? 'bg-white border border-gray-200 focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10'
                    : 'bg-[#f9f9f6] border border-transparent'}`}
              />
            </div>

            {/* Email (Read-only usually) */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email đăng nhập
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-5 py-3.5 rounded-xl font-medium text-gray-500 bg-[#f9f9f6] border border-transparent cursor-not-allowed"
                />
                {/* Verified Badge */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#137333] flex items-center gap-1 text-xs font-bold bg-[#E6F4EA] px-2 py-1 rounded-md border border-[#CEEAD6]">
                  <FaCheckCircle /> Đã xác thực
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Số điện thoại</label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-5 py-3.5 rounded-xl font-bold text-[#193366] outline-none transition-all
                    ${isEditing
                      ? 'bg-white border border-gray-200 focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10'
                      : 'bg-[#f9f9f6] border border-transparent'}`}
                />
                {!isEditing && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#137333] tooltip" title="Đã xác thực">
                    <FaCheckCircle />
                  </div>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <FaVenusMars /> Giới tính
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-5 py-3.5 rounded-xl font-bold text-[#193366] outline-none appearance-none transition-all
                    ${isEditing
                      ? 'bg-white border border-gray-200 focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 cursor-pointer'
                      : 'bg-[#f9f9f6] border border-transparent cursor-default'}`}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <FaBirthdayCake /> Ngày sinh
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-xl font-bold text-[#193366] outline-none transition-all
                  ${isEditing
                    ? 'bg-white border border-gray-200 focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10'
                    : 'bg-[#f9f9f6] border border-transparent'}`}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <FaMapMarkerAlt /> Địa chỉ liên hệ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="VD: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM"
                className={`w-full px-5 py-3.5 rounded-xl font-bold text-[#193366] outline-none transition-all
                  ${isEditing
                    ? 'bg-white border border-gray-200 focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10'
                    : 'bg-[#f9f9f6] border border-transparent'}`}
              />
            </div>

          </div>

          {/* Warning Note (chỉ hiện khi Edit) */}
          {isEditing && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-[#FFF9E6] border border-[#FFE082] rounded-xl text-[#B7791F] text-sm font-medium">
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