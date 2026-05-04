import React, { useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { CustomSuccessToast, CustomErrorToast } from '../../components/user/toast/CustomToast'
import { toast } from 'react-toastify';

const DemoToggleButton = () => {
  const [isDefenseMode, setIsDefenseMode] = useState(false);

  const handleToggle = async () => {
    const newMode = !isDefenseMode;

    try {
      const response = await axiosClient.post("auth/toggle-defense", {
        isDefenseMode: newMode
      })

      if (response.status === 200) {
        setIsDefenseMode(newMode);
        toast.success(
          <CustomSuccessToast
            title="Thành công"
            message={`Chế độ phòng thủ đã ${newMode ? 'BẬT 🛡️' : 'TẮT ⚠️'}`}
          />,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "!bg-white !rounded-xl !shadow-2xl !p-2 !border !border-gray-100",
            bodyClassName: "!p-0 !m-0",
            icon: false
          }
        );
      }
    } catch (error) {
      toast.error(
        <CustomErrorToast
          title="Thất bại"
          message="Chuyển chế độ thất bại"
        />,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          className: "!bg-white !rounded-xl !shadow-2xl !p-2 !border !border-red-50",
          bodyClassName: "!p-0 !m-0",
          icon: false
        }
      );
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] flex flex-col items-end gap-2 p-4 bg-white/95 backdrop-blur-sm shadow-md rounded-xl border border-gray-100 mb-20">

      {/* Khu vực chứa Label và Nút gạt */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={handleToggle}
      >
        <span className={`text-sm font-bold select-none ${isDefenseMode ? 'text-gray-800' : 'text-gray-500'}`}>
          {isDefenseMode ? '🛡️ Phòng thủ: BẬT' : '⚠️ Phòng thủ: TẮT'}
        </span>

        {/* Component Nút gạt (Toggle Switch) */}
        <button
          type="button"
          role="switch"
          aria-checked={isDefenseMode}
          className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${isDefenseMode ? 'bg-orange-500' : 'bg-stone-300'
            }`}
        >
          {/* Cục tròn bên trong nút gạt */}
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out ${isDefenseMode ? 'translate-x-7' : 'translate-x-0'
              }`}
          />
        </button>
      </div>

      {/* Dòng text mô tả phụ */}
      <p className="text-xs text-gray-500 mt-1">
        Algorithm Confusion JWT Attack
      </p>

    </div>
  );
};

export default DemoToggleButton;