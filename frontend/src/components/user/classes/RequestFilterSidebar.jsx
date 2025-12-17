import { useState } from "react";
import { FaFilter, FaSearch, FaUndo } from "react-icons/fa";

// Component Section đơn giản hóa (Không còn chức năng đóng/mở)
const FilterSection = ({ title, children }) => {
  return (
    <div className="border-b border-gray-100 last:border-0 py-5">
      <h4 className="font-bold text-gray-800 text-sm mb-3">
        {title}
      </h4>
      <div>
        {children}
      </div>
    </div>
  );
};

const RequestFilterSidebar = ({ onApply }) => {
  // State lưu trữ giá trị bộ lọc
  const [filters, setFilters] = useState({
    subjects: [],
    grades: [],
    method: "",
    gender: "",
    area: "",
  });

  // Xử lý chọn nhiều (Tags)
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

  // Xử lý input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý chọn đơn (Radio - có thể bỏ chọn)
  const handleSingleSelect = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field] === value ? "" : value
    }));
  }

  // Gửi dữ liệu ra ngoài
  const handleApply = () => {
    if (onApply) onApply(filters);
  };

  // Reset về mặc định
  const handleReset = () => {
    const resetState = { subjects: [], grades: [], method: "", gender: "", area: "" };
    setFilters(resetState);
    if (onApply) onApply(resetState);
  };

  // DỮ LIỆU MẪU
  const SUBJECTS = ['Toán', 'Lý', 'Hóa', 'Tiếng Anh', 'Văn', 'Tiểu học', 'Tin học'];
  const GRADES = ['Lớp 1-5', 'Lớp 6-9', 'Lớp 10-12', 'Ôn thi ĐH'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24">

      {/* --- HEADER --- */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-800">
          <FaFilter className="text-blue-600 text-sm" />
          <h3 className="font-bold text-base">Lọc lớp học</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-gray-500 text-xs font-medium flex items-center gap-1 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
        >
          <FaUndo className="text-[10px]" /> Đặt lại
        </button>
      </div>

      {/* --- BODY (Hiển thị trực tiếp, không scroll) --- */}
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
                  className={`
                            px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200
                            ${isActive
                      ? "bg-blue-100 border-blue-200 text-blue-700 shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"}
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
                  className={`
                            px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200
                            ${isActive
                      ? "bg-indigo-100 border-indigo-200 text-indigo-700 shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"}
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
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {["Online", "Offline", "Kết hợp"].map((method) => {
              const value = method === "Kết hợp" ? "both" : method.toLowerCase();
              const isActive = filters.method === value;
              return (
                <button
                  key={method}
                  onClick={() => handleSingleSelect("method", value)}
                  className={`
                            flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200
                            ${isActive
                      ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200 font-bold"
                      : "text-gray-500 hover:text-gray-700"}
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
                  className={`
                            py-2 rounded-lg border text-xs font-medium transition-all duration-200
                            ${isActive
                      ? "bg-blue-50 border-blue-200 text-blue-700 font-bold"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}
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
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FaSearch />
            </span>
            <input
              type="text"
              name="area"
              value={filters.area}
              onChange={handleChange}
              placeholder="Quận/Huyện..."
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </FilterSection>

      </div>

      {/* --- FOOTER BUTTON --- */}
      <div className="p-5 pt-2">
        <button
          onClick={handleApply}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl 
            shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
        >
          Áp dụng bộ lọc
        </button>
      </div>

    </div>
  );
};

export default RequestFilterSidebar;