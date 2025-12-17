import React from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LatestClasses = () => {
  // Mock Data
  const classes = [
    {
      id: 1,
      subject: "Toán Lớp 9 (Ôn thi vào 10)",
      location: "Cầu Giấy, Hà Nội",
      price: "250.000đ",
      per: "/buổi",
      schedule: "3 buổi/tuần",
      status: "urgent", // Gấp
      statusText: "Cần gấp",
      type: "Offline"
    },
    {
      id: 2,
      subject: "Tiếng Anh Giao Tiếp (Người đi làm)",
      location: "Online (Qua Zoom)",
      price: "300.000đ",
      per: "/buổi",
      schedule: "2 buổi/tuần (Tối)",
      status: "new",
      statusText: "Mới đăng",
      type: "Online"
    },
    {
      id: 3,
      subject: "Hóa Học Lớp 11 (Nâng cao)",
      location: "Quận 1, TP. HCM",
      price: "4.000.000đ",
      per: "/tháng",
      schedule: "Thỏa thuận",
      status: "normal",
      statusText: "Đang tìm",
      type: "Offline"
    },
    {
      id: 4,
      subject: "Dạy đàn Piano cơ bản",
      location: "Thanh Xuân, Hà Nội",
      price: "350.000đ",
      per: "/buổi",
      schedule: "Cuối tuần",
      status: "normal",
      statusText: "Đang tìm",
      type: "Offline"
    }
  ];

  // Helper chọn màu viền
  const getBorderColor = (status) => {
    if (status === 'urgent') return 'border-l-red-500';
    if (status === 'new') return 'border-l-green-500';
    return 'border-l-blue-500';
  };

  const getBadgeStyle = (status) => {
    if (status === 'urgent') return 'bg-red-100 text-red-600';
    if (status === 'new') return 'bg-green-100 text-green-600';
    return 'bg-blue-100 text-blue-600';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Lớp mới cần gia sư</h2>
            <p className="text-gray-500">Cơ hội dạy học tốt nhất được cập nhật liên tục hàng giờ.</p>
          </div>
          <Link to="/classes" className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
            Xem tất cả lớp <FaArrowRight />
          </Link>
        </div>

        {/* Grid Tickets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden border-l-4 ${getBorderColor(item.status)}`}
            >

              {/* Left Content */}
              <div className="p-5 flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${getBadgeStyle(item.status)}`}>
                    {item.statusText}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FaClock /> 2 giờ trước
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer">
                  {item.subject}
                </h3>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-gray-400 w-4" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaChalkboardTeacher className="text-gray-400 w-4" />
                    <span>{item.type} • {item.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Separator (Dashed Line) */}
              <div className="hidden sm:block w-px border-l border-dashed border-gray-300 relative my-4">
                <div className="absolute -top-6 -left-1.5 w-3 h-3 bg-white rounded-full border border-gray-200 border-t-0 border-l-0"></div>
                <div className="absolute -bottom-6 -left-1.5 w-3 h-3 bg-white rounded-full border border-gray-200 border-t-0 border-l-0"></div>
              </div>
              <div className="sm:hidden h-px border-t border-dashed border-gray-300 mx-4"></div>

              {/* Right Content (Price & Action) */}
              <div className="p-5 sm:w-48 bg-gray-50 sm:bg-transparent flex flex-col justify-center items-center sm:items-end gap-3">
                <div className="text-center sm:text-right">
                  <p className="text-xs text-gray-500 mb-1">Thu nhập</p>
                  <p className="text-xl font-extrabold text-blue-600">
                    {item.price}
                    <span className="text-xs font-normal text-gray-400 ml-1">{item.per}</span>
                  </p>
                </div>
                <button className="w-full py-2 px-4 bg-white border border-blue-600 text-blue-600 font-bold text-sm rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                  Nhận lớp
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestClasses;