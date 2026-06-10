// src/components/TopNav.jsx
export default function TopNav({ setToken }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#060f1e]/95 backdrop-blur-sm border-b border-[#1e3a5f]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-3.5 flex items-center justify-between">

        {/* LEFT — pl-10 gives room for the Sidebar hamburger (fixed, z-60) */}
        <div className="flex items-center gap-3 pl-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-teal-900/40">
            H
          </div>
          <div>
            <span className="text-white font-bold text-lg leading-none tracking-tight">
              HealthOps
            </span>
            <p className="text-[10px] text-teal-500 tracking-widest uppercase leading-none mt-0.5">
              Workforce Intelligence
            </p>
          </div>
        </div>

        {/* RIGHT — Status + Logout */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white border border-[#1e3a5f] hover:border-red-800 hover:bg-red-950/40 px-4 py-1.5 rounded-lg transition-all duration-200"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
