import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

function StatsCards({ assignments = [], nurses = [] }) {
  // 🔥 ACTIVE SHIFTS LOGIC
  const activeShifts = assignments.filter((a) => {
    const now = new Date();
    const start = new Date(a.start_time);
    const end = new Date(a.end_time);
    return start <= now && end >= now;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* TOTAL ASSIGNMENTS */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">Total Assignments</p>
          <div className="p-1.5 rounded bg-blue-600">
            <ClipboardDocumentListIcon className="h-4 w-4 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white">
          {assignments.length}
        </h2>
      </div>

      {/* TOTAL NURSES */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">Total Nurses</p>
          <div className="p-1.5 rounded bg-green-600">
            <UserGroupIcon className="h-4 w-4 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white">
          {nurses.length}
        </h2>
      </div>

      {/* ACTIVE SHIFTS */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">Active Shifts</p>
          <div className="p-1.5 rounded bg-yellow-500">
            <ClockIcon className="h-4 w-4 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white">
          {activeShifts}
        </h2>
      </div>

    </div>
  );
}

export default StatsCards;