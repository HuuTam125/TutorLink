import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import TutorHeader from '../../components/user/tutors/TutorHeader'
import FilterSidebar from '../../components/user/tutors/FilterSidebar';
import TutorCard from '../../components/user/tutors/TutorCard';
import { FaLayerGroup, FaSortAmountDown } from 'react-icons/fa';

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    sort: 'rating_desc'
  });

  const cleanParams = (params) => {
    const cleaned = {};
    for (const key in params) {
      const value = params[key];
      if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) continue;
      cleaned[key] = Array.isArray(value) ? value.join(",") : value;
    }
    return cleaned;
  };

  // Fetch tutors (LOGIC GIỮ NGUYÊN)
  const fetchTutors = async (paramsOverride = null) => {
    try {
      setLoading(true);
      const params = cleanParams(paramsOverride || queryParams);
      const res = await axiosClient.get('/tutors', { params });
      setTutors(res.data.tutors);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {
      console.error('Lỗi tải danh sách:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [queryParams]);

  const handleFilterApply = (filterData) => {
    const newParams = {
      ...queryParams,
      subjects: filterData.subjects,
      grades: filterData.grades,
      area: filterData.area,
      teachingMethod: filterData.teachingMethod,
      priceMin: filterData.priceMin,
      priceMax: filterData.priceMax,
      page: 1,
    };
    setQueryParams(newParams);
    fetchTutors(newParams);
  };

  // Đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQueryParams((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    // Nền trang: Kem ấm #f9f9f6
    <div className="min-h-screen bg-[#f9f9f6] font-sans pb-20">

      {/* Header (Cần update style Navy cho component này sau) */}
      <TutorHeader />

      {/* Container chính: Margin âm để đè lên Header tạo chiều sâu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR */}
          <div className="hidden lg:block w-1/4">
            <FilterSidebar onApply={handleFilterApply} />
          </div>

          {/* MAIN */}
          <div className="w-full lg:w-3/4">

            {/* HERO BANNER (Navy Theme) */}
            <div className="bg-white rounded-2xl p-8 mb-8 border border-[#193366]/5 relative overflow-hidden shadow-sm">
              {/* Decor Blob */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#193366]/5 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>

              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-[#193366]/5 text-[#193366] rounded-full text-xs font-bold mb-3 border border-[#193366]/10">
                  Danh sách gia sư
                </div>
                <h1 className="text-3xl font-extrabold text-[#193366] mb-3">Khám phá gia sư chất lượng</h1>
                <p className="text-gray-500 mb-6 max-w-2xl font-medium">
                  Tìm kiếm và so sánh hồ sơ gia sư phù hợp với nhu cầu của bạn. Sử dụng bộ lọc bên trái để thu hẹp kết quả.
                </p>
              </div>
            </div>

            {/* SORT & COUNT */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#193366]/5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="font-bold text-[#193366] text-lg flex items-center gap-2">
                  <FaLayerGroup className="text-[#193366]/60" /> Kết quả tìm kiếm
                </h2>
                <p className="text-sm text-gray-400 font-medium">
                  Tìm thấy <span className="font-bold text-[#193366]">{total}</span> gia sư phù hợp
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Custom Select Sort */}
                <div className="relative w-full sm:w-auto">
                  <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                  <select
                    onChange={(e) => {
                      const newSort = e.target.value;
                      const newParams = { ...queryParams, sort: newSort };
                      setQueryParams(newParams);
                      fetchTutors(newParams);
                    }}
                    value={queryParams.sort}
                    className="w-full sm:w-auto pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 text-[#193366] text-sm font-bold rounded-lg focus:ring-2 focus:ring-[#193366]/20 focus:border-[#193366]/20 cursor-pointer outline-none hover:bg-white transition-colors appearance-none min-w-[180px]"
                  >
                    <option value="rating_desc">Đánh giá cao nhất</option>
                    <option value="price_asc">Học phí thấp - cao</option>
                    <option value="price_desc">Học phí cao - thấp</option>
                    <option value="newest">Mới nhất</option>
                  </select>
                </div>
              </div>
            </div>

            {/* GRID */}
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#193366] mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Đang tải danh sách gia sư...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutors.length > 0 ? (
                  tutors.map(tutor => <TutorCard key={tutor._id} tutor={tutor} />)
                ) : (
                  <div className="col-span-2 text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">Không tìm thấy gia sư phù hợp với bộ lọc.</p>
                  </div>
                )}
              </div>
            )}

            {/* PAGINATION (Navy Style) */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <button
                  onClick={() => handlePageChange(queryParams.page - 1)}
                  disabled={queryParams.page === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${queryParams.page === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-[#193366]'
                    }`}
                >
                  Trước
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  // Logic thu gọn trang nếu quá nhiều trang (Optional: hiện tại render hết)
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${page === queryParams.page
                        ? 'bg-[#193366] text-white shadow-md shadow-[#193366]/20'
                        : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#193366]'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(queryParams.page + 1)}
                  disabled={queryParams.page === totalPages}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${queryParams.page === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent'
                    : 'bg-white text-[#193366] border-gray-200 hover:bg-[#193366]/5'
                    }`}
                >
                  Tiếp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;