import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import TutorHeader from '../../components/user/tutors/TutorHeader'
import FilterSidebar from '../../components/user/tutors/FilterSidebar';
import TutorCard from '../../components/user/tutors/TutorCard';

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
  // Fetch tutors
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
    <div className="min-h-screen bg-[#F8F9FC] font-sans pb-20">
      <TutorHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <div className="hidden lg:block w-1/4">
            <FilterSidebar onApply={handleFilterApply} />
          </div>

          {/* MAIN */}
          <div className="w-full lg:w-3/4">
            {/* HERO */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-8 border border-blue-100">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold mb-3">
                Danh sách gia sư
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Khám phá gia sư chất lượng</h1>
              <p className="text-gray-600 mb-6 max-w-2xl">
                Tìm kiếm và so sánh hồ sơ gia sư phù hợp với nhu cầu của bạn. Sử dụng bộ lọc bên trái để thu hẹp kết quả.
              </p>
            </div>

            {/* SORT & COUNT */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="font-bold text-gray-800 text-lg">Kết quả tìm kiếm</h2>
                <p className="text-sm text-gray-500">
                  Tìm thấy <span className="font-bold text-gray-900">{total}</span> gia sư phù hợp
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                <select
                  onChange={(e) => {
                    const newSort = e.target.value;
                    const newParams = { ...queryParams, sort: newSort };
                    setQueryParams(newParams);
                    fetchTutors(newParams); // gọi luôn API
                  }}
                  value={queryParams.sort}
                  className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 cursor-pointer hover:border-blue-500 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="rating_desc">Đánh giá cao nhất</option>
                  <option value="price_asc">Học phí thấp - cao</option>
                  <option value="price_desc">Học phí cao - thấp</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>
            </div>

            {/* GRID */}
            {loading ? (
              <p className="text-center py-10 text-gray-500">Đang tải dữ liệu...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutors.length > 0 ? (
                  tutors.map(tutor => <TutorCard key={tutor._id} tutor={tutor} />)
                ) : (
                  <p className="text-center col-span-2 text-gray-500">Không tìm thấy gia sư phù hợp.</p>
                )}
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center mt-10 gap-2">
              <button
                onClick={() => handlePageChange(queryParams.page - 1)}
                disabled={queryParams.page === 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${queryParams.page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                Trước
              </button>

              {[...Array(totalPages)].map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold ${page === queryParams.page
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(queryParams.page + 1)}
                disabled={queryParams.page === totalPages}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${queryParams.page === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
              >
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;
