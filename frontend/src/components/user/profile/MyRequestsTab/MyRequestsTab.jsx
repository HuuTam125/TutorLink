import { useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChalkboardTeacher, FaMapMarkerAlt, FaMoneyBillWave, FaClock,
  FaUserGraduate, FaCheckCircle, FaChevronDown,
  FaPhoneAlt, FaEnvelope, FaStar, FaInfoCircle
} from 'react-icons/fa';

// --- SUB-COMPONENT: THẺ ỨNG VIÊN (CANDIDATE CARD) ---
const ApplicantCard = ({ app, onAccept }) => {
  return (
    <div className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-4 transition-all
      ${app.status === 'approved'
        ? 'bg-[#E6F4EA] border-[#CEEAD6]' // Xanh lá nhạt khi Approved
        : 'bg-white border-[#193366]/10 hover:border-[#193366]/30 hover:shadow-sm'} 
    `}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#f9f9f6] flex items-center justify-center text-[#193366]/50 font-bold text-lg overflow-hidden border-2 border-white shadow-sm">
          {app.tutor?.avatar ? <img src={app.tutor.avatar} alt="Ava" className="w-full h-full object-cover" /> : app.tutor?.fullName?.charAt(0)}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-[#193366] flex items-center gap-2">
              {app.tutor?.fullName}
              {app.status === 'approved' && <FaCheckCircle className="text-[#137333]" />}
            </h4>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
              <FaStar className="text-yellow-400" /> 4.8/5.0 • {app.tutor?.experience || 'Gia sư kinh nghiệm'}
            </p>
          </div>

          {/* Status Badge */}
          <div className="text-right">
            {app.status === 'approved' ? (
              <span className="text-xs font-bold text-[#137333] bg-white px-2 py-1 rounded-md border border-[#CEEAD6]">Đã chọn</span>
            ) : (
              <span className="text-xs font-bold text-gray-500 bg-[#f9f9f6] px-2 py-1 rounded-md border border-gray-200">Ứng tuyển</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="mt-3 bg-[#f9f9f6] p-3 rounded-lg text-sm text-gray-600 italic border border-[#193366]/5 relative">
          <div className="absolute top-0 left-4 -mt-1 w-2 h-2 bg-[#f9f9f6] border-t border-l border-[#193366]/5 transform rotate-45"></div>
          "{app.message || 'Tôi rất muốn nhận lớp này...'}"
        </div>

        {/* Actions */}
        {app.status === 'pending' && (
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => onAccept(app._id)}
              className="px-4 py-2 bg-[#193366] text-white text-xs font-bold rounded-lg hover:bg-[#193366]/90 shadow-md shadow-[#193366]/20 transition-all"
            >
              Chấp nhận gia sư này
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-[#f9f9f6] hover:text-[#193366]">
              Xem hồ sơ chi tiết
            </button>
          </div>
        )}

        {/* Contact Info (Only if accepted & paid) */}
        {app.paymentStatus === 'paid' && (
          <div className="mt-3 flex gap-4 text-xs font-bold text-[#193366] bg-white p-2.5 rounded-lg border border-[#CEEAD6]">
            <span className="flex items-center gap-1"><FaPhoneAlt className="text-[#137333]" /> {app.tutor?.phone}</span>
            <span className="flex items-center gap-1"><FaEnvelope className="text-[#193366]" /> {app.tutor?.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---
const MyRequestsTab = () => {
  const [requests, setRequests] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // ID của lớp đang mở rộng
  const [applicantsData, setApplicantsData] = useState({}); // Cache ứng viên
  const [loadingApp, setLoadingApp] = useState(false);

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const res = await axiosClient.get('/requests/my-requests');
      setRequests(res.data);
    } catch (error) { console.error(error); }
  };

  // Toggle xem ứng viên
  const toggleApplicants = async (reqId) => {
    if (expandedId === reqId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(reqId);

    // Nếu chưa có data thì mới fetch
    if (!applicantsData[reqId]) {
      setLoadingApp(true);
      try {
        const res = await axiosClient.get(`/requests/${reqId}/applications`);
        setApplicantsData(prev => ({ ...prev, [reqId]: res.data }));
      } catch (error) {
        console.error("Lỗi tải ứng viên", error);
      } finally {
        setLoadingApp(false);
      }
    }
  };

  const handleAcceptTutor = async (appId, reqId) => {
    if (!window.confirm("Bạn có chắc chắn chọn gia sư này không?")) return;

    try {
      await axiosClient.put(`/requests/application/${appId}/accept`);

      setApplicantsData(prev => ({
        ...prev,
        [reqId]: prev[reqId].map(app =>
          app._id === appId ? { ...app, status: 'approved' } : app
        )
      }));

      fetchMyRequests();

    } catch (error) {
      alert("Lỗi: " + (error.response?.data?.message || error.message));
    }
  };

  // Helper render status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="bg-[#FFF9E6] text-[#B7791F] border border-[#FFE082] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><FaClock /> Chờ duyệt</span>;
      case 'approved': return <span className="bg-[#E8F0FE] text-[#1967D2] border border-[#D2E3FC] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><FaChalkboardTeacher /> Đang tìm gia sư</span>;
      case 'closed': return <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><FaCheckCircle /> Đã tìm thấy</span>;
      default: return null;
    }
  };

  return (
    // Card Container: White bg, Navy Shadow
    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_4px_30px_-10px_rgba(25,51,102,0.05)] border border-[#193366]/5 animate-fade-in-up min-h-[600px] font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
        <div>
          <h3 className="text-2xl font-extrabold text-[#193366] flex items-center gap-2">
            <span className="p-2 bg-[#f9f9f6] text-[#193366] rounded-lg"><FaChalkboardTeacher /></span>
            Lớp học đã đăng
          </h3>
          <p className="text-gray-500 mt-1 text-sm font-medium">Quản lý các yêu cầu tìm gia sư của bạn.</p>
        </div>
        <div className="bg-[#193366]/10 text-[#193366] font-bold px-4 py-1.5 rounded-full text-xs border border-[#193366]/10">
          {requests.length} Lớp
        </div>
      </div>

      {/* LIST CONTENT */}
      {requests.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-[#f9f9f6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#193366]/20">
            <FaChalkboardTeacher size={40} />
          </div>
          <p className="text-gray-500 font-bold">Bạn chưa đăng yêu cầu tìm gia sư nào.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {requests.map((req, index) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                // Item Container
                className={`border rounded-2xl overflow-hidden transition-all duration-300
                  ${expandedId === req._id
                    ? 'border-[#193366]/30 shadow-md ring-1 ring-[#193366]/10'
                    : 'border-gray-200 hover:border-[#193366]/30'}
                `}
              >
                {/* --- REQUEST SUMMARY (HEADER) --- */}
                <div
                  onClick={() => toggleApplicants(req._id)}
                  className="p-6 bg-white cursor-pointer flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:bg-[#f9f9f6]/50 transition-colors"
                >
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-[#193366]">{req.subject}</h4>
                      <span className="text-sm text-gray-500 font-bold px-2 py-0.5 bg-[#f9f9f6] rounded border border-gray-100">Lớp {req.grade}</span>
                      {renderStatusBadge(req.status)}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <FaMoneyBillWave className="text-[#137333]" />
                        <span className="font-bold text-[#193366]">{req.budget.toLocaleString()}đ</span>/tháng
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-red-400" />
                        <span className="truncate max-w-[200px]">{req.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaClock className="text-orange-400" />
                        <span>{new Date(req.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Applicants Count & Toggle Icon */}
                  <div className="flex items-center gap-4">
                    {req.status === 'approved' && (
                      <div className="text-right">
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide">Ứng viên</span>
                        <div className="flex items-center gap-1 justify-end">
                          <FaUserGraduate className="text-[#193366]" />
                          <span className="text-lg font-extrabold text-[#193366]">
                            {applicantsData[req._id]?.length || (req.applicantCount || 0)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className={`w-8 h-8 rounded-full bg-[#f9f9f6] flex items-center justify-center transition-transform duration-300 border border-gray-200 ${expandedId === req._id ? 'rotate-180 bg-[#193366] text-white border-[#193366]' : 'text-gray-400'}`}>
                      <FaChevronDown />
                    </div>
                  </div>
                </div>

                {/* --- EXPANDABLE APPLICANTS LIST (BODY) --- */}
                <AnimatePresence>
                  {expandedId === req._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-[#f9f9f6] border-t border-gray-200"
                    >
                      <div className="p-6">
                        <h5 className="font-bold text-[#193366] mb-4 flex items-center gap-2">
                          <FaInfoCircle className="text-[#193366]/50" /> Danh sách gia sư ứng tuyển
                          {loadingApp && <span className="text-xs font-normal text-gray-400 animate-pulse">(Đang tải...)</span>}
                        </h5>

                        {loadingApp && !applicantsData[req._id] ? (
                          <div className="space-y-3">
                            {[1, 2].map(i => <div key={i} className="h-24 bg-white rounded-xl animate-pulse"></div>)}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {applicantsData[req._id]?.length > 0 ? (
                              applicantsData[req._id].map(app => (
                                <ApplicantCard
                                  key={app._id}
                                  app={app}
                                  onAccept={(appId) => handleAcceptTutor(appId, req._id)}
                                />
                              ))
                            ) : (
                              <div className="text-center py-8 text-gray-400 italic bg-white rounded-xl border border-dashed border-gray-300 font-medium">
                                Chưa có gia sư nào ứng tuyển.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyRequestsTab;