import { useState } from "react";
import { FaFilter, FaChevronDown, FaChevronUp, FaSearch, FaUndo } from "react-icons/fa";

// Component con: Accordion Section
const FilterSection = ({ title, isOpenDefault = true, children }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  return (
    <div className="border-b border-gray-100 last:border-0 py-4">
      <div
        className="flex justify-between items-center cursor-pointer mb-3 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-bold text-[#193366] text-sm group-hover:text-[#193366]/80 transition-colors">
          {title}
        </h4>
        <span className="text-gray-400 text-xs transition-transform duration-300">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

const FilterSidebar = ({ onApply }) => {
  const [filters, setFilters] = useState({
    subjects: [],
    grades: [],
    method: "",
    area: "",
    priceRange: "all",
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

  const convertPriceRange = (range) => {
    switch (range) {
      case "under100": return { priceMax: 100000 };
      case "100-200": return { priceMin: 100000, priceMax: 200000 };
      case "over200": return { priceMin: 200000 };
      default: return {};
    }
  };

  const handleApply = () => {
    const { priceRange, ...rest } = filters;
    onApply({ ...rest, ...convertPriceRange(priceRange) });
  };

  const handleReset = () => {
    setFilters({ subjects: [], grades: [], method: "", area: "", priceRange: "all" });
    onApply({});
  };

  const SUBJECTS = ["Toán", "Lý", "Hóa", "Tiếng Anh", "Văn", "Sinh", "Tin học", "Piano"];
  const GRADES = ["Cấp 1", "Cấp 2", "Cấp 3", "Đại học", "Người đi làm"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#193366]/5 sticky top-24 overflow-hidden font-sans">

      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-[#f9f9f6] flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#193366]">
          <FaFilter />
          <h3 className="font-bold text-base">Bộ lọc</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-gray-400 text-xs font-bold flex items-center gap-1 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
        >
          <FaUndo className="text-[10px]" /> Đặt lại
        </button>
      </div>

      <div className="p-5 pt-0">

        {/* 1. Môn học (Tags) */}
        <FilterSection title="Môn học">
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((sub) => {
              const isActive = filters.subjects.includes(sub);
              return (
                <button
                  key={sub}
                  onClick={() => handleToggleArray("subjects", sub)}
                  // Active: Navy Background
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200
                    ${isActive
                      ? "bg-[#193366] border-[#193366] text-white shadow-md shadow-[#193366]/20"
                      : "bg-white border-gray-200 text-gray-500 hover:border-[#193366]/30 hover:text-[#193366]"}
                  `}
                >
                  {sub}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* 2. Cấp học (Tags) */}
        <FilterSection title="Cấp học">
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
                      : "bg-white border-gray-200 text-gray-500 hover:border-[#193366]/30 hover:text-[#193366]"}
                  `}
                >
                  {grade}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* 3. Hình thức (Radio Custom) */}
        <FilterSection title="Hình thức học">
          <div className="grid grid-cols-3 gap-2">
            {["Online", "Offline", "Kết hợp"].map((method) => {
              const value = method === "Kết hợp" ? "both" : method.toLowerCase();
              const isActive = filters.method === value;
              return (
                <label key={method} className={`
                  cursor-pointer text-center py-2 rounded-lg border text-xs font-bold transition-all
                  ${isActive
                    ? "bg-[#193366] text-white border-[#193366] shadow-md shadow-[#193366]/20"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}
                `}>
                  <input
                    type="radio"
                    name="method"
                    value={value}
                    checked={isActive}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {method}
                </label>
              )
            })}
          </div>
        </FilterSection>

        {/* 4. Mức học phí (Select) */}
        <FilterSection title="Mức học phí">
          <div className="relative">
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleChange}
              className="w-full p-2.5 bg-[#f9f9f6] border border-gray-200 rounded-xl text-sm text-[#193366] font-bold
                focus:outline-none focus:border-[#193366]/30 focus:ring-2 focus:ring-[#193366]/10 appearance-none cursor-pointer transition-all"
            >
              <option value="all">Tất cả mức giá</option>
              <option value="under100">Dưới 100k / buổi</option>
              <option value="100-200">100k - 200k / buổi</option>
              <option value="over200">Trên 200k / buổi</option>
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-gray-500 text-xs">
              <FaChevronDown />
            </div>
          </div>
        </FilterSection>

        {/* 5. Khu vực (Input) */}
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
              focus:outline-none focus:bg-white focus:border-[#193366]/30 focus:ring-2 focus:ring-[#193366]/10 transition-all placeholder:text-gray-400"
            />
          </div>
        </FilterSection>

        {/* Footer Button */}
        <div className="mt-4 pt-2 pb-5">
          <button
            onClick={handleApply}
            className="w-full py-3 bg-[#193366] hover:bg-[#193366]/90 text-white font-bold rounded-xl 
            shadow-lg shadow-[#193366]/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
            Áp dụng bộ lọc
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterSidebar;