// src/components/toast/CustomToast.jsx

export const CustomSuccessToast = ({ title, message }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
      <svg
        className="w-6 h-6 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
      <p className="text-gray-600 text-xs mt-0.5">{message}</p>
    </div>
  </div>
);

export const CustomErrorToast = ({ title, message }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
      <svg
        className="w-6 h-6 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
      <p className="text-gray-600 text-xs mt-0.5">{message}</p>
    </div>
  </div>
);
