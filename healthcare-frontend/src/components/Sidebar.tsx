// src/components/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Admin", icon: HomeIcon, path: "/hospital/admin" },
    { name: "Scheduling", icon: CalendarIcon, path: "/hospital/scheduling" },
    { name: "Nurses", icon: UserGroupIcon, path: "/hospital/nurses" },
    { name: "Doctors", icon: HeartIcon, path: "/hospital/doctors" },
    { name: "Patients", icon: UserIcon, path: "/hospital/patients" },
    { name: "Accounts", icon: CreditCardIcon, path: "/hospital/accounts" },
    { name: "HRM", icon: ChartBarIcon, path: "/hospital/hrm" },
    { name: "Audit Logs", icon: ClipboardDocumentListIcon, path: "/hospital/audit-logs" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-3.5 left-5 z-[60] text-gray-400 hover:text-white p-2 rounded-lg hover:bg-[#1e3a5f]/40 transition-all duration-200"
        aria-label="Toggle navigation"
      >
        {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-[#060f1e] border-r border-[#1e3a5f] flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-5 border-b border-[#1e3a5f] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-teal-900/40">
            H
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-none tracking-tight">
              HealthOps
            </h1>
            <p className="text-[10px] text-teal-500 tracking-widest uppercase leading-none mt-0.5">
              Workforce Intelligence
            </p>
          </div>
        </div>

        <div className="px-5 pt-5 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600">
          Navigation
        </div>

        <ul className="flex-1 px-3 space-y-1 text-sm overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-900/60 to-blue-900/40 text-white border border-teal-700/40"
                      : "text-gray-500 hover:bg-[#0d1f3c] hover:text-gray-200"
                  }`}
                >
                  <item.icon
                    style={{ width: "18px", height: "18px" }}
                    className={isActive ? "text-teal-400" : "text-gray-600"}
                  />
                  <span className={isActive ? "font-medium" : ""}>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-5 py-4 border-t border-[#1e3a5f]">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600 mb-2">
            System Status
          </div>
          <div className="flex items-center gap-2 text-green-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
