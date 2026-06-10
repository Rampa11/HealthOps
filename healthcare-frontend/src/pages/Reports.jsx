// src/pages/Reports.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import StatsCards from "../components/StatsCards";

function Reports({ setToken }) {
  const [assignments, setAssignments] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/assignments/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(res.data);
    } catch (err) {
      console.error("❌ ASSIGNMENT ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNurses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/nurses/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNurses(res.data);
    } catch (err) {
      console.error("❌ NURSE ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchNurses();
  }, []);

  // ── DERIVED METRICS ──────────────────────────────────────────────
  const completed = assignments.filter((a) => a.status === "completed").length;
  const pending = assignments.filter((a) => a.status === "pending").length;
  const inProgress = assignments.filter((a) => a.status === "in_progress").length;
  const completionRate = assignments.length
    ? Math.round((completed / assignments.length) * 100)
    : 0;

  const nurseWorkload = nurses.map((n) => ({
    name: n.full_name,
    count: assignments.filter((a) => a.nurse_id === n.id || a.nurse_name === n.full_name).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      <Sidebar />
      <TopNav setToken={setToken} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="border-b border-[#1e3a5f] pb-8">
          <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Analytics & Insights
          </p>
          <h1 className="text-4xl font-bold text-white leading-tight">Reports</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Workforce performance metrics and operational insights
          </p>
        </div>

        {/* STATS OVERVIEW */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Key Metrics</h2>
          <StatsCards assignments={assignments} nurses={nurses} />
        </div>

        {/* ASSIGNMENT STATUS BREAKDOWN */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Assignment Status Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { label: "Total", value: assignments.length, color: "border-blue-700/40 text-blue-400", bg: "bg-blue-900/20" },
              { label: "Pending", value: pending, color: "border-yellow-700/40 text-yellow-400", bg: "bg-yellow-900/20" },
              { label: "In Progress", value: inProgress, color: "border-teal-700/40 text-teal-400", bg: "bg-teal-900/20" },
              { label: "Completed", value: completed, color: "border-green-700/40 text-green-400", bg: "bg-green-900/20" },
            ].map((item) => (
              <div key={item.label} className={`${item.bg} border ${item.color} rounded-xl p-5`}>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
                <p className={`text-4xl font-bold ${item.color.split(" ")[1]}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* COMPLETION RATE */}
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold">Completion Rate</h2>
              <p className="text-gray-500 text-sm">Completed vs total assignments</p>
            </div>
            <span className="text-3xl font-bold text-teal-400">{completionRate}%</span>
          </div>
          <div className="w-full bg-[#0d1f3c] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-teal-600 to-teal-400 h-3 rounded-full transition-all duration-700"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">{completed} of {assignments.length} assignments completed</p>
        </div>

        {/* NURSE WORKLOAD */}
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-1">Nurse Workload Distribution</h2>
          <p className="text-gray-500 text-sm mb-5">Assignments per nurse across all time</p>
          {loading ? (
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
              Loading...
            </div>
          ) : nurseWorkload.length === 0 ? (
            <p className="text-gray-600 text-sm">No data available yet.</p>
          ) : (
            <div className="space-y-3">
              {nurseWorkload.map((n) => {
                const max = nurseWorkload[0]?.count || 1;
                const pct = Math.round((n.count / max) * 100);
                return (
                  <div key={n.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{n.name}</span>
                      <span className="text-gray-500">{n.count} assignment{n.count !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="w-full bg-[#0d1f3c] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-700 to-teal-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* COMING SOON */}
        <div className="bg-[#0a1628] border border-dashed border-[#1e3a5f] rounded-2xl p-8 text-center">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-2">Coming Soon</p>
          <p className="text-gray-400">
            Export to PDF/CSV, date-range filtering, and shift pattern analytics are planned for the next release.
          </p>
        </div>

        {/* FOOTER QUOTE */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "Without data, you're just another person with an opinion."
          </p>
          <p className="text-gray-700 text-xs mt-2">— W. Edwards Deming · Quality Management Pioneer</p>
        </div>

      </div>
    </div>
  );
}

export default Reports;
