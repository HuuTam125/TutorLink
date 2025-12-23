import { useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBook, FaGraduationCap, FaMapMarkerAlt, FaVenusMars, FaLaptop,
  FaCheckCircle, FaArrowRight, FaArrowLeft, FaPen, FaChalkboardTeacher, FaCalendarAlt
} from 'react-icons/fa';

// --- KHAI BÁO DỮ LIỆU KHỞI TẠO ---
const INITIAL_DATA = {
  subject: '',
  grade: '',
  description: '',
  sessionsPerWeek: 3,
  budget: '',
  address: '',
  genderPreference: 'any',
  teachingMethod: 'offline'
};

const Step1 = ({ formData, handleChange, setFormData }) => (
  <motion.div
    key="step1"
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <h3 className="text-xl font-bold text-[#193366]">Bước 1: Thông tin cơ bản</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <label className="block text-sm font-bold text-[#193366] mb-2">Môn học</label>
        <div className="relative">
          <FaBook className="absolute left-4 top-3.5 text-gray-400" />
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="VD: Toán, Tiếng Anh..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none font-medium text-[#193366] transition-all placeholder:text-gray-400"
            autoFocus
          />
        </div>
      </div>
      <div className="group">
        <label className="block text-sm font-bold text-[#193366] mb-2">Lớp / Trình độ</label>
        <div className="relative">
          <FaGraduationCap className="absolute left-4 top-3.5 text-gray-400" />
          <input
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="VD: Lớp 12, IELTS..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none font-medium text-[#193366] transition-all placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-[#193366] mb-3">Hình thức học</label>
      <div className="grid grid-cols-3 gap-4">
        {['offline', 'online', 'both'].map(method => (
          <div
            key={method}
            onClick={() => setFormData(prev => ({ ...prev, teachingMethod: method }))}
            className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02]
              ${formData.teachingMethod === method
                ? 'border-[#193366] bg-[#193366]/5 text-[#193366] shadow-sm'
                : 'border-transparent bg-[#f9f9f6] text-gray-400 hover:bg-[#f9f9f6]/80 hover:text-gray-600'}
            `}
          >
            {method === 'offline' && <FaMapMarkerAlt size={24} />}
            {method === 'online' && <FaLaptop size={24} />}
            {method === 'both' && <FaChalkboardTeacher size={24} />}
            <span className="font-bold text-sm capitalize">
              {method === 'offline' ? 'Tại nhà' : method === 'online' ? 'Online' : 'Linh hoạt'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Step2 = ({ formData, handleChange, setFormData }) => (
  <motion.div
    key="step2"
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <h3 className="text-xl font-bold text-[#193366]">Bước 2: Chi tiết yêu cầu</h3>

    <div>
      <label className="block text-sm font-bold text-[#193366] mb-2">Địa chỉ học</label>
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Số nhà, đường, Quận/Huyện..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none font-medium text-[#193366] transition-all placeholder:text-gray-400"
          autoFocus
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-[#193366] mb-3">Giới tính gia sư</label>
      <div className="flex bg-[#f9f9f6] p-1 rounded-xl">
        {[
          { val: 'any', label: 'Tùy ý' },
          { val: 'male', label: 'Nam' },
          { val: 'female', label: 'Nữ' }
        ].map(opt => (
          <button
            key={opt.val}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, genderPreference: opt.val }))}
            className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all
              ${formData.genderPreference === opt.val
                ? 'bg-white text-[#193366] shadow-sm ring-1 ring-[#193366]/10'
                : 'text-gray-400 hover:text-gray-600'}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-[#193366] mb-2">Mô tả thêm</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        placeholder="Ví dụ: Học sinh mất gốc, cần gia sư kiên nhẫn..."
        className="w-full p-4 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 outline-none font-medium text-[#193366] resize-none transition-all placeholder:text-gray-400"
      />
    </div>
  </motion.div>
);

const Step3 = ({ formData, setFormData, handleBudgetChange }) => (
  <motion.div
    key="step3"
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <h3 className="text-xl font-bold text-[#193366]">Bước 3: Ngân sách & Lịch học</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-bold text-[#193366] mb-2">Số buổi / tuần</label>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setFormData(p => ({ ...p, sessionsPerWeek: Math.max(1, p.sessionsPerWeek - 1) }))} className="w-12 h-12 rounded-xl bg-[#f9f9f6] text-[#193366] hover:bg-[#193366]/10 font-bold text-xl transition-colors">-</button>
          <div className="flex-1 h-12 flex items-center justify-center font-bold text-xl bg-white border border-[#193366]/10 rounded-xl text-[#193366]">
            {formData.sessionsPerWeek}
          </div>
          <button type="button" onClick={() => setFormData(p => ({ ...p, sessionsPerWeek: p.sessionsPerWeek + 1 }))} className="w-12 h-12 rounded-xl bg-[#f9f9f6] text-[#193366] hover:bg-[#193366]/10 font-bold text-xl transition-colors">+</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#193366] mb-2">Học phí / tháng</label>
        <div className="relative">
          <input
            value={formData.budget}
            onChange={handleBudgetChange}
            type="text"
            inputMode="numeric"
            placeholder="0"
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-[#f9f9f6] border border-transparent focus:bg-white focus:border-[#137333] focus:ring-2 focus:ring-[#137333]/10 outline-none font-bold text-lg text-[#137333] transition-all placeholder:font-normal placeholder:text-gray-400"
            autoFocus
          />
          <span className="absolute right-4 top-3.5 text-gray-400 font-bold text-xs">VNĐ</span>
        </div>

        {/* Helper text hiển thị số tiền đã format */}
        {formData.budget && (
          <div className="mt-2 text-right animate-fade-in">
            <span className="text-xs text-gray-400 mr-2 font-medium">Hiển thị:</span>
            <span className="text-[#137333] font-extrabold text-lg">{Number(formData.budget).toLocaleString('vi-VN')} đ</span>
          </div>
        )}
      </div>
    </div>

    <div className="bg-[#FFF9E6] p-4 rounded-xl border border-[#FFE082] text-sm text-[#B7791F] flex gap-3 items-start font-medium">
      <FaCheckCircle className="mt-1 flex-shrink-0" />
      <p>Yêu cầu của bạn sẽ được gửi đến hàng ngàn gia sư. Hãy kiểm tra kỹ thông tin trước khi đăng nhé!</p>
    </div>
  </motion.div>
);

const PreviewCard = ({ formData }) => (
  <div className="sticky top-6">
    <h4 className="font-bold text-[#193366]/50 text-xs uppercase tracking-wider mb-3 pl-1">Xem trước thẻ bài đăng</h4>

    {/* Card Style: Navy Border Hover & Shadow */}
    <div className="bg-white rounded-2xl border border-[#193366]/5 shadow-sm relative group overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#193366]"></div>

      <div className="absolute top-4 right-4">
        <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Mới</span>
      </div>

      <div className="p-5 pl-6">
        <h3 className="font-bold text-lg text-[#193366] mb-1 line-clamp-2 leading-tight min-h-[1.5em]">
          {formData.subject ? `Tìm gia sư ${formData.subject}` : 'Tìm gia sư dạy...'}
        </h3>
        <p className="text-gray-500 text-sm font-bold bg-[#f9f9f6] inline-block px-2 py-0.5 rounded mb-4 border border-gray-100">
          {formData.grade || 'Chưa nhập lớp'}
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f9f9f6] flex items-center justify-center flex-shrink-0 text-[#193366]/50">
              <FaMapMarkerAlt size={14} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Địa chỉ</p>
              <p className="text-sm text-[#193366] font-medium line-clamp-1">{formData.address || '---'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f9f9f6] flex items-center justify-center flex-shrink-0 text-[#193366]/50">
              <FaVenusMars size={14} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Yêu cầu GV</p>
              <p className="text-sm text-[#193366] font-medium capitalize">
                {formData.genderPreference === 'male' ? 'Nam' : formData.genderPreference === 'female' ? 'Nữ' : 'Tùy ý'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f9f9f6] flex items-center justify-center flex-shrink-0 text-[#193366]/50">
              <FaCalendarAlt size={14} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Lịch học</p>
              <p className="text-sm text-[#193366] font-medium">{formData.sessionsPerWeek} buổi / tuần</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-1 w-full bg-[#f9f9f6] my-2">
        <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-white border-r border-[#193366]/5"></div>
        <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-white border-l border-[#193366]/5"></div>
        <div className="absolute top-1/2 w-full border-t border-dashed border-[#193366]/10"></div>
      </div>

      <div className="p-5 pt-2">
        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Ngân sách dự kiến</p>
        <p className="text-xl font-extrabold text-[#193366] tracking-tight">
          {formData.budget ? Number(formData.budget).toLocaleString() : '0'} <span className="text-sm font-bold text-gray-400 ml-1">đ/tháng</span>
        </p>
      </div>
    </div>
  </div>
);

// --- COMPONENT CHÍNH ---

const PostRequestTab = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, budget: val }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!formData.subject || !formData.address || !formData.budget) {
      return toast.error("Vui lòng điền đầy đủ thông tin!");
    }

    setLoading(true);
    try {
      await axiosClient.post('/requests', {
        ...formData,
        budget: Number(formData.budget)
      });

      toast.success('Đăng yêu cầu thành công!');
      setFormData(INITIAL_DATA);
      setStep(1);

    } catch (error) {
      toast.error('Có lỗi xảy ra. Thử lại sau.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_4px_30px_-10px_rgba(25,51,102,0.05)] border border-[#193366]/5 min-h-[600px] font-sans">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-100 pb-6 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#193366] flex items-center gap-2">
            <span className="p-2 bg-[#193366] text-white rounded-lg"><FaPen size={18} /></span>
            Đăng lớp mới
          </h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Tìm gia sư giỏi chỉ trong 3 bước đơn giản.</p>
        </div>

        {/* Step Indicator (Navy Style) */}
        <div className="flex items-center gap-2 bg-[#f9f9f6] px-4 py-2 rounded-full border border-[#193366]/5">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                 ${step === i ? 'bg-[#193366] text-white scale-110 shadow-lg shadow-[#193366]/30' :
                  step > i ? 'bg-[#137333] text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {step > i ? <FaCheckCircle /> : i}
              </div>
              {i < 3 && <div className={`w-6 h-1 mx-1 rounded-full ${step > i ? 'bg-[#137333]' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT: FORM AREA */}
        <div className="flex-1">
          <form onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {step === 1 && <Step1 key="s1" formData={formData} handleChange={handleChange} setFormData={setFormData} />}
              {step === 2 && <Step2 key="s2" formData={formData} handleChange={handleChange} setFormData={setFormData} />}
              {step === 3 && <Step3 key="s3" formData={formData} setFormData={setFormData} handleBudgetChange={handleBudgetChange} />}
            </AnimatePresence>
          </form>

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={prevStep} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-[#f9f9f6] flex items-center gap-2 transition-colors">
                <FaArrowLeft /> Quay lại
              </button>
            ) : <div></div>}

            {step < 3 ? (
              <button onClick={nextStep} className="px-8 py-3 bg-[#193366] text-white rounded-xl font-bold hover:bg-[#193366]/90 shadow-lg shadow-[#193366]/30 flex items-center gap-2 transition-all hover:-translate-y-1">
                Tiếp tục <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-[#137333] text-white rounded-xl font-bold hover:bg-[#0f5c29] shadow-lg shadow-[#137333]/30 flex items-center gap-2 disabled:opacity-50 transition-all hover:-translate-y-1"
              >
                {loading ? 'Đang xử lý...' : 'Hoàn tất đăng tin'} <FaCheckCircle />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: PREVIEW CARD */}
        <div className="w-full lg:w-1/3 hidden lg:block">
          <PreviewCard formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default PostRequestTab;