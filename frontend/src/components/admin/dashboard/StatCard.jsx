const StatCard = ({ title, count, colorClass, label }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colorClass} hover:shadow-md transition-shadow`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 mt-2">{count}</h3>
      </div>
      <div className={`p-3 rounded-full bg-opacity-20 ${colorClass.replace('border-', 'bg-').replace('500', '100')}`}>
        <span className={`text-2xl ${colorClass.replace('border-', 'text-')}`}>{label}</span>
      </div>
    </div>
  </div>
);

export default StatCard;