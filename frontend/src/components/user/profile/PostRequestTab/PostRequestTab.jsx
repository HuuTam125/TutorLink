import { useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBook, FaGraduationCap, FaMapMarkerAlt, FaVenusMars, FaLaptop,
  FaCheckCircle, FaArrowRight, FaArrowLeft, FaPen, FaChalkboardTeacher, FaCalendarAlt
} from 'react-icons/fa';

// --- CÁC COMPONENT CON (Định nghĩa bên ngoài để tránh re-render) ---
// --- KHAI BÁO DỮ LIỆU KHỞI TẠO (Để dùng lại khi reset) ---
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
    <h3 className="text-xl font-bold text-slate-800">Bước 1: Thông tin cơ bản</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <label className="block text-sm font-bold text-slate-500 mb-2">Môn học</label>
        <div className="relative">
          <FaBook className="absolute left-4 top-3.5 text-slate-400" />
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="VD: Toán, Tiếng Anh..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 outline-none font-medium transition-all"
            autoFocus
          />
        </div>
      </div>
      <div className="group">
        <label className="block text-sm font-bold text-slate-500 mb-2">Lớp / Trình độ</label>
        <div className="relative">
          <FaGraduationCap className="absolute left-4 top-3.5 text-slate-400" />
          <input
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="VD: Lớp 12, IELTS..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 outline-none font-medium transition-all"
          />
        </div>
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-slate-500 mb-3">Hình thức học</label>
      <div className="grid grid-cols-3 gap-4">
        {['offline', 'online', 'both'].map(method => (
          <div
            key={method}
            onClick={() => setFormData(prev => ({ ...prev, teachingMethod: method }))}
            className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02]
              ${formData.teachingMethod === method ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' : 'border-slate-100 hover:border-blue-200 text-slate-400'}
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
    <h3 className="text-xl font-bold text-slate-800">Bước 2: Chi tiết yêu cầu</h3>

    <div>
      <label className="block text-sm font-bold text-slate-500 mb-2">Địa chỉ học</label>
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-4 top-3.5 text-slate-400" />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Số nhà, đường, Quận/Huyện..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 outline-none font-medium transition-all"
          autoFocus
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-slate-500 mb-3">Giới tính gia sư</label>
      <div className="flex bg-slate-100 p-1 rounded-xl">
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
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-bold text-slate-500 mb-2">Mô tả thêm</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        placeholder="Ví dụ: Học sinh mất gốc, cần gia sư kiên nhẫn..."
        className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 outline-none font-medium resize-none transition-all"
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
    <h3 className="text-xl font-bold text-slate-800">Bước 3: Ngân sách & Lịch học</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-bold text-slate-500 mb-2">Số buổi / tuần</label>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setFormData(p => ({ ...p, sessionsPerWeek: Math.max(1, p.sessionsPerWeek - 1) }))} className="w-12 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xl transition-colors">-</button>
          <div className="flex-1 h-12 flex items-center justify-center font-bold text-xl bg-slate-50 rounded-xl border border-slate-100">
            {formData.sessionsPerWeek}
          </div>
          <button type="button" onClick={() => setFormData(p => ({ ...p, sessionsPerWeek: p.sessionsPerWeek + 1 }))} className="w-12 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xl transition-colors">+</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-500 mb-2">Học phí / tháng</label>
        <div className="relative">
          <input
            value={formData.budget} // Dùng giá trị thô để không bị nhảy trỏ chuột
            onChange={handleBudgetChange}
            type="text"
            inputMode="numeric"
            placeholder="0"
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 outline-none font-bold text-lg text-green-700 transition-all placeholder:font-normal"
            autoFocus
          />
          <span className="absolute right-4 top-3.5 text-slate-400 font-bold text-xs">VNĐ</span>
        </div>

        {/* Helper text hiển thị số tiền đã format */}
        {formData.budget && (
          <div className="mt-2 text-right animate-fade-in">
            <span className="text-xs text-slate-400 mr-2">Hiển thị:</span>
            <span className="text-green-600 font-extrabold text-lg">{Number(formData.budget).toLocaleString('vi-VN')} đ</span>
          </div>
        )}
      </div>
    </div>

    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-sm text-yellow-800 flex gap-3 items-start">
      <FaCheckCircle className="mt-1 flex-shrink-0" />
      <p>Yêu cầu của bạn sẽ được gửi đến hàng ngàn gia sư. Hãy kiểm tra kỹ thông tin trước khi đăng nhé!</p>
    </div>
  </motion.div>
);

const PreviewCard = ({ formData }) => (
  <div className="sticky top-6">
    <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3 pl-1">Xem trước thẻ bài đăng</h4>
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative group">
      <div className="absolute top-4 right-4">
        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">Mới</span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-2 leading-tight min-h-[1.5em]">
          {formData.subject ? `Tìm gia sư ${formData.subject}` : 'Tìm gia sư dạy...'}
        </h3>
        <p className="text-slate-500 text-sm font-medium mb-4">{formData.grade || 'Chưa nhập lớp'}</p>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
              <FaMapMarkerAlt size={14} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Địa chỉ</p>
              <p className="text-sm text-slate-700 font-medium line-clamp-1">{formData.address || '---'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
              <FaVenusMars size={14} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Yêu cầu GV</p>
              <p className="text-sm text-slate-700 font-medium capitalize">
                {formData.genderPreference === 'male' ? 'Nam' : formData.genderPreference === 'female' ? 'Nữ' : 'Tùy ý'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
              <FaCalendarAlt size={14} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Lịch học</p>
              <p className="text-sm text-slate-700 font-medium">{formData.sessionsPerWeek} buổi / tuần</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-1 w-full bg-slate-50 my-2">
        <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-white border-r border-slate-200"></div>
        <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-white border-l border-slate-200"></div>
        <div className="absolute top-1/2 w-full border-t border-dashed border-slate-200"></div>
      </div>

      <div className="p-5 pt-2 bg-slate-50/50">
        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Ngân sách dự kiến</p>
        <p className="text-xl font-extrabold text-green-600 tracking-tight">
          {formData.budget ? Number(formData.budget).toLocaleString() : '0'} đ
          <span className="text-sm font-normal text-slate-400 ml-1">/tháng</span>
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
    const val = e.target.value.replace(/\D/g, ''); // Chỉ lấy số
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

      // 1. RESET FORM VỀ BAN ĐẦU
      setFormData(INITIAL_DATA);

      // 2. QUAY VỀ BƯỚC 1
      setStep(1);

    } catch (error) {
      toast.error('Có lỗi xảy ra. Thử lại sau.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[600px]">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-100 pb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="p-2 bg-blue-600 text-white rounded-lg"><FaPen size={18} /></span>
            Đăng lớp mới
          </h2>
          <p className="text-slate-500 mt-1 text-sm">Tìm gia sư giỏi chỉ trong 3 bước đơn giản.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                 ${step === i ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/30' :
                  step > i ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}
              `}>
                {step > i ? <FaCheckCircle /> : i}
              </div>
              {i < 3 && <div className={`w-6 h-1 mx-1 rounded-full ${step > i ? 'bg-green-500' : 'bg-slate-200'}`}></div>}
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
          <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button onClick={prevStep} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 flex items-center gap-2 transition-colors">
                <FaArrowLeft /> Quay lại
              </button>
            ) : <div></div>}

            {step < 3 ? (
              <button onClick={nextStep} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:-translate-y-1">
                Tiếp tục <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-500/30 flex items-center gap-2 disabled:opacity-50 transition-all hover:-translate-y-1"
              >
                {loading ? 'Đang xử lý...' : 'Hoàn tất đăng tin'} <FaCheckCircle />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: PREVIEW CARD (COMPACT) */}
        <div className="w-full lg:w-1/3 hidden lg:block">
          <PreviewCard formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default PostRequestTab;