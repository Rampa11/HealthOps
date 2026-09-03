// src/pages/AuditLogs.jsx
import { useEffect, useState } from "react";
import api from "../api.js";

import Sidebar from "../components/Sidebar.js";
import TopNav from "../components/TopNav.js";

const ACTION_STYLES = {
  CREATE_NURSE: "bg-green-900/40 text-green-400 border-green-700/40",
  CREATE_ASSIGNMENT: "bg-blue-900/40 text-blue-400 border-blue-700/40",
  UPDATE_ASSIGNMENT: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
  DELETE: "bg-red-900/40 text-red-400 border-red-700/40",
  LOGIN: "bg-teal-900/40 text-teal-400 border-teal-700/40",
};

function getActionStyle(action) {
  if (!action) return "bg-gray-800 text-gray-400 border-gray-700";
  const key = Object.keys(ACTION_STYLES).find((k) => action.toUpperCase().includes(k));
  return key ? ACTION_STYLES[key] : "bg-[#0d1f3c] text-gray-400 border-[#1e3a5f]";
}

function AuditLogs({ setToken }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/audit-logs/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
    } catch (err) {
      console.error("❌ AUDIT LOG ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const filtered = logs.filter((log) => {
    const q = search.toLowerCase();
    return (
      log.action?.toLowerCase().includes(q) ||
      log.user?.toLowerCase().includes(q) ||
      log.entity?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      <Sidebar />
      <TopNav setToken={setToken} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1e3a5f] pb-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Compliance & Traceability
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">Audit Logs</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Track all system activity, changes, and user actions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">{logs.length} total events</span>
            <button
              onClick={fetchLogs}
              className="text-xs text-teal-400 border border-teal-800 hover:bg-teal-900/30 px-3 py-1.5 rounded-lg transition"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* COMPLIANCE BANNER */}
        <div className="flex items-start gap-4 bg-[#0a1628] border border-[#1e3a5f] rounded-xl px-6 py-4">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-indigo-900/60 flex items-center justify-center shrink-0 text-indigo-400 text-lg">
            🔒
          </div>
          <div>
            <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1">
              HIPAA Compliance Standard
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              All access to patient data and system actions must be logged and retained for a minimum of
              <span className="text-white font-semibold"> 6 years</span> per HIPAA audit trail requirements.
              Regular log review is a mandatory compliance activity.
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div>
          <input
            type="text"
            placeholder="Search by action, user, or entity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 bg-[#0a1628] border border-[#1e3a5f] text-white text-sm p-2.5 rounded-lg focus:outline-none focus:border-teal-500 placeholder-gray-600"
          />
        </div>

        {/* LOG LIST */}
        {loading ? (
          <div className="flex items-center gap-3 text-gray-500 py-8">
            <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
            Loading audit logs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#1e3a5f] rounded-2xl">
            <p className="text-gray-500">{search ? "No logs match your search." : "No audit logs found."}</p>
            <p className="text-gray-600 text-sm mt-1">System actions will appear here as they occur.</p>
          </div>
        ) : (
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl overflow-hidden">
            <div className="px-6 py-3 border-b border-[#1e3a5f]">
              <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                {filtered.length} event{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="divide-y divide-[#1e3a5f]/50">
              {filtered.map((log) => (
                <div key={log.id} className="px-6 py-4 hover:bg-[#0d1f3c] transition-colors flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getActionStyle(log.action)}`}>
                        {log.action}
                      </span>
                      {log.entity && (
                        <span className="text-xs text-gray-600 font-mono">
                          {log.entity}{log.entity_id ? ` #${log.entity_id}` : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {log.user || "System"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString([], {
                        month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER QUOTE */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "Transparency in healthcare operations is not optional — it is the foundation of patient trust and institutional accountability."
          </p>
          <p className="text-gray-700 text-xs mt-2">— Joint Commission on Healthcare Accreditation</p>
        </div>

      </div>
    </div>
  );
}

export default AuditLogs;
