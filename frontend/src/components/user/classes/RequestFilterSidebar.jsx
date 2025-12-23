import { useState } from "react";
import { FaFilter, FaSearch, FaUndo } from "react-icons/fa";

// Component Section
const FilterSection = ({ title, children }) => {
  return (
    <div className="border-b border-gray-100 last:border-0 py-5">
      <h4 className="font-bold text-[#193366] text-sm mb-3">
        {title}
      </h4>
      <div>
        {children}
      </div>
    </div>
  );
};

const RequestFilterSidebar = ({ onApply }) => {
  const [filters, setFilters] = useState({
    subjects: [],
    grades: [],
    method: "",
    gender: "",
    area: "",
  });

  const handleToggleArray = (field, value) => {
    setFilters((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSingleSelect = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field] === value ? "" : value
    }));
  }

  const handleApply = () => { if (onApply) onApply(filters); };

  const handleReset = () => {
    const resetState = { subjects: [], grades: [], method: "", gender: "", area: "" };
    setFilters(resetState);
    if (onApply) onApply(resetState);
  };

  const SUBJECTS = ['Toán', 'Lý', 'Hóa', 'Tiếng Anh', 'Văn', 'Tiểu học', 'Tin học'];
  const GRADES = ['Lớp 1-5', 'Lớp 6-9', 'Lớp 10-12', 'Ôn thi ĐH'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#193366]/5 sticky top-24 font-sans">

      {/* --- HEADER --- */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#193366]">
          <FaFilter className="text-sm" />
          <h3 className="font-bold text-base">Lọc lớp học</h3>
        </div>
        <button onClick={handleReset} className="text-gray-400 text-xs font-bold flex items-center gap-1 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50">
          <FaUndo className="text-[10px]" /> Đặt lại
        </button>
      </div>

      {/* --- BODY --- */}
      <div className="px-5">

        {/* 1. Môn học */}
        <FilterSection title="Môn học">
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((sub) => {
              const isActive = filters.subjects.includes(sub);
              return (
                <button
                  key={sub}
                  onClick={() => handleToggleArray("subjects", sub)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200
                    ${isActive
                      ? "bg-[#193366] border-[#193366] text-white shadow-md shadow-[#193366]/20"
                      : "bg-white border-gray-200 text-gray-500 hover:border-[#193366]/50 hover:text-[#193366]"}
                  `}
                >
                  {sub}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* 2. Cấp lớp */}
        <FilterSection title="Cấp lớp">
          <div className="flex flex-wrap gap-2">
            {GRADES.map((grade) => {
              const isActive = filters.grades.includes(grade);
              return (
                <button
                  key={grade}
                  onClick={() => handleToggleArray("grades", grade)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200
                    ${isActive
                      ? "bg-[#193366] border-[#193366] text-white shadow-md shadow-[#193366]/20"
                      : "bg-white border-gray-200 text-gray-500 hover:border-[#193366]/50 hover:text-[#193366]"}
                  `}
                >
                  {grade}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* 3. Hình thức dạy */}
        <FilterSection title="Hình thức dạy">
          <div className="flex bg-[#f9f9f6] p-1 rounded-xl">
            {["Online", "Offline", "Kết hợp"].map((method) => {
              const value = method === "Kết hợp" ? "both" : method.toLowerCase();
              const isActive = filters.method === value;
              return (
                <button
                  key={method}
                  onClick={() => handleSingleSelect("method", value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200
                    ${isActive
                      ? "bg-white text-[#193366] shadow-sm ring-1 ring-gray-200"
                      : "text-gray-400 hover:text-gray-600"}
                  `}
                >
                  {method}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* 4. Yêu cầu giới tính */}
        <FilterSection title="Yêu cầu giới tính">
          <div className="grid grid-cols-3 gap-2">
            {["Nam", "Nữ", "Tùy chọn"].map((genderLabel) => {
              const value = genderLabel;
              const isActive = filters.gender === value;
              return (
                <button
                  key={genderLabel}
                  onClick={() => handleSingleSelect("gender", value)}
                  className={`py-2 rounded-lg border text-xs font-bold transition-all duration-200
                    ${isActive
                      ? "bg-[#193366]/5 border-[#193366] text-[#193366]"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"}
                  `}
                >
                  {genderLabel}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* 5. Khu vực */}
        <FilterSection title="Khu vực">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#193366] transition-colors">
              <FaSearch />
            </span>
            <input
              type="text"
              name="area"
              value={filters.area}
              onChange={handleChange}
              placeholder="Quận/Huyện..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#f9f9f6] border border-gray-200 rounded-xl text-sm text-[#193366] font-bold 
              focus:outline-none focus:border-[#193366]/30 focus:ring-2 focus:ring-[#193366]/10 transition-all placeholder:text-gray-400"
            />
          </div>
        </FilterSection>

      </div>

      {/* --- FOOTER BUTTON --- */}
      <div className="p-5 pt-2">
        <button
          onClick={handleApply}
          className="w-full py-3 bg-[#193366] hover:bg-[#193366]/90 text-white text-sm font-bold rounded-xl 
            shadow-lg shadow-[#193366]/20 active:scale-[0.98] transition-all"
        >
          Áp dụng bộ lọc
        </button>
      </div>

    </div>
  );
};

export default RequestFilterSidebar;