import StatCard from "./StatCard";

export default function Dashboard({ stats }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Thành viên" count={stats?.userCount} colorClass="border-blue-500" label="👥" />
        <StatCard title="Chờ duyệt" count={stats?.pendingCount} colorClass="border-yellow-500" label="⏳" />
        <StatCard title="Lớp học" count={stats?.requestCount} colorClass="border-green-500" label="📚" />
      </div>
    </div>
  );
}
