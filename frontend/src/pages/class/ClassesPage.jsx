import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import ClassHeader from '../../components/user/classes/ClassHeader';
import RequestFilterSidebar from '../../components/user/classes/RequestFilterSidebar';
import RequestCard from '../../components/user/classes/RequestCard';
import { FaLayerGroup, FaPlusCircle } from 'react-icons/fa';

const ClassesPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Query lưu các tham số lọc và sắp xếp
  const [queryParams, setQueryParams] = useState({
    sort: 'newest',
    subjects: [],
    grades: [],
    method: '',
    gender: '',
    area: '',
  });

  // Dọn params rỗng trước khi gửi
  const cleanParams = (params) => {
    const cleaned = {};
    for (const key in params) {
      const value = params[key];
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
      cleaned[key] = Array.isArray(value) ? value.join(',') : value;
    }
    return cleaned;
  };

  // GỌI API
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = cleanParams(queryParams);
      const res = await axiosClient.get('/requests', { params });
      setRequests(res.data);
      setTotal(res.data.length);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách lớp:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [queryParams]);

  // Khi click "Áp dụng bộ lọc" từ sidebar
  const handleApplyFilters = (filters) => {
    setQueryParams((prev) => ({
      ...prev,
      subjects: filters.subjects,
      grades: filters.grades,
      method: filters.method,
      gender: filters.gender,
      area: filters.area,
    }));
  };

  // Hàm xử lý khi nhấn nút "Đăng yêu cầu"
  const handlePostRequestClick = () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      toast.warning('Vui lòng đăng nhập để đăng yêu cầu!');
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);

    if (user.role !== 'student') {
      toast.error('Chỉ tài khoản Học viên/Phụ huynh mới có thể đăng yêu cầu tìm gia sư.');
      return;
    }

    // Điều hướng và truyền "state" 
    navigate('/profile', { state: { defaultTab: 'post-request' } });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans pb-20">
      <ClassHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- SIDEBAR --- */}
          <div className="hidden lg:block w-1/4">
            <RequestFilterSidebar onApply={handleApplyFilters} />
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="w-full lg:w-3/4">

            {/* HERO BANNER */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-8 border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 translate-x-10 -translate-y-10"></div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-bold mb-3">
                  Danh sách lớp mới
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Khám phá yêu cầu gia sư</h1>
                <p className="text-gray-600 mb-6 max-w-2xl">
                  Duyệt qua các yêu cầu tìm gia sư từ phụ huynh và học sinh. Sử dụng bộ lọc để tìm cơ hội dạy phù hợp với bạn.
                </p>

                <div className="flex gap-8 border-t border-blue-200 pt-6">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">350+</div>
                    <div className="text-sm text-gray-500">Lớp mới tuần này</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">120</div>
                    <div className="text-sm text-gray-500">Đang tuyển gấp</div>
                  </div>
                </div>
              </div>
            </div>

            {/* HANH SORT + ACTION */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  <FaLayerGroup className="text-blue-500" /> Kết quả tìm kiếm
                </h2>
                <p className="text-sm text-gray-500">
                  Tìm thấy <span className="font-bold text-gray-900">{total}</span> lớp phù hợp
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Nút đăng tin nhanh */}
                <button className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-bold border border-green-200 hover:bg-green-100 transition">
                  <FaPlusCircle /> Đăng yêu cầu
                </button>

                {/* Sort */}
                <select
                  value={queryParams.sort}
                  onChange={(e) =>
                    setQueryParams((prev) => ({ ...prev, sort: e.target.value }))
                  }
                  className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="budget_desc">Ngân sách cao nhất</option>
                  <option value="budget_asc">Ngân sách thấp nhất</option>
                </select>
              </div>
            </div>

            {/* DANH SÁCH LỚP */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Đang tải danh sách lớp...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {requests.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Chưa có lớp học nào phù hợp.</p>
                  </div>
                ) : (
                  requests.map((req) => (
                    <RequestCard key={req._id} request={req} />
                  ))
                )}
              </div>
            )}

            {/* PAGINATION (Mock) */}
            {!loading && requests.length > 0 && (
              <div className="flex justify-center mt-10 gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">Trước</button>
                <button className="w-10 h-10 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md">1</button>
                <button className="w-10 h-10 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm font-medium">2</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-blue-600 hover:bg-blue-50 text-sm font-medium">Tiếp</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
