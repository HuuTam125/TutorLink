import { useState } from "react";
import { FaFilter, FaChevronDown, FaChevronUp, FaSearch, FaUndo } from "react-icons/fa";

// Component con: Accordion Section (Để đóng mở từng mục)
const FilterSection = ({ title, isOpenDefault = true, children }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  return (
    <div className="border-b border-gray-100 last:border-0 py-4">
      <div
        className="flex justify-between items-center cursor-pointer mb-3 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <span className="text-gray-400 text-xs">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {/* Hiệu ứng mở mượt mà */}
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

  // Checkbox/Tag logic
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

  // --- DỮ LIỆU MẪU ---
  const SUBJECTS = ["Toán", "Lý", "Hóa", "Tiếng Anh", "Văn", "Sinh", "Tin học", "Piano"];
  const GRADES = ["Cấp 1", "Cấp 2", "Cấp 3", "Đại học", "Người đi làm"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">

      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-800">
          <FaFilter className="text-blue-600" />
          <h3 className="font-bold text-lg">Bộ lọc</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-gray-500 text-xs font-medium flex items-center gap-1 hover:text-red-500 transition-colors"
        >
          <FaUndo className="text-[10px]" /> Đặt lại
        </button>
      </div>

      <div className="p-5 pt-0">

        {/* 1. Môn học (Dạng Tags) */}
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

        {/* 2. Cấp học (Dạng Tags) */}
        <FilterSection title="Cấp học">
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

        {/* 3. Hình thức (Radio Custom) */}
        <FilterSection title="Hình thức học">
          <div className="grid grid-cols-3 gap-2">
            {["Online", "Offline", "Kết hợp"].map((method) => {
              const value = method === "Kết hợp" ? "both" : method.toLowerCase();
              const isActive = filters.method === value;
              return (
                <label key={method} className={`
                        cursor-pointer text-center py-2 rounded-lg border text-xs font-medium transition-all
                        ${isActive
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}
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

        {/* 4. Mức học phí (Select Custom) */}
        <FilterSection title="Mức học phí">
          <div className="relative">
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">Tất cả mức giá</option>
              <option value="under100">Dưới 100k / buổi</option>
              <option value="100-200">100k - 200k / buổi</option>
              <option value="over200">Trên 200k / buổi</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute right-3 top-3.5 pointer-events-none text-gray-500 text-xs">
              <FaChevronDown />
            </div>
          </div>
        </FilterSection>

        {/* 5. Khu vực (Input có Icon) */}
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
              focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </FilterSection>

        {/* Footer Button */}
        <div className="mt-4 pt-2">
          <button
            onClick={handleApply}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl 
            shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
            Áp dụng bộ lọc
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterSidebar;