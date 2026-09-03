// src/pages/Scheduling.jsx
import { useEffect, useState } from "react";
import api from "../api.js";

import Sidebar from "../components/Sidebar.js";
import TopNav from "../components/TopNav.js";
import AssignmentForm from "../components/AssignmentForm.jsx";
import ScheduleCalendar from "../components/ScheduleCalendar.js";
import TodayAssignments from "../components/TodayAssignments.js";

function Scheduling({ setToken }) {
  const [assignments, setAssignments] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nurse_id: "",
    patient_name: "",
    start_time: "",
    end_time: "",
  });

  const token = localStorage.getItem("token");

  const fetchAssignments = async () => {
    try {
      setLoading(true);

      const res = await api.get("/assignments/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(Array.isArray(res.data) ? res.data : res.data.items || res.data.data || []);
    } catch (err) {
      console.error("❌ ASSIGNMENT ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNurses = async () => {
    try {
      const res = await api.get("/nurses/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNurses(Array.isArray(res.data) ? res.data : res.data.items || res.data.data || []);;
    } catch (err) {
      console.error("❌ NURSE ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchNurses();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/assignments/", {
          ...form,
          start_time: new Date(form.start_time).toISOString(),
          end_time: new Date(form.end_time).toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Assignment created ✅");
      setForm({ nurse_id: "", patient_name: "", start_time: "", end_time: "" });
      fetchAssignments();
    } catch (err) {
      console.error("❌ CREATE ERROR:", err.response?.data || err.message);
    }
  };

  const events = assignments.map((a) => ({
    id: a.id,
    title: `${a.patient_name} • ${a.nurse_name || "Nurse"}`,
    start: new Date(a.start_time),
    end: new Date(a.end_time),
  }));

  const totalToday = assignments.filter((a) => {
    const start = new Date(a.start_time);
    const now = new Date();
    return start.toDateString() === now.toDateString();
  }).length;

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      <Sidebar />
      <TopNav setToken={setToken} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1e3a5f] pb-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Workforce Scheduling
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">Scheduling</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Manage nurse assignments, shifts, and live schedules
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="bg-[#0d1f3c] border border-[#1e3a5f] rounded-lg px-4 py-2 text-center">
              <p className="text-2xl font-bold text-teal-400">{assignments.length}</p>
              <p className="text-xs text-gray-500">Total Assignments</p>
            </div>
            <div className="bg-[#0d1f3c] border border-[#1e3a5f] rounded-lg px-4 py-2 text-center">
              <p className="text-2xl font-bold text-blue-400">{totalToday}</p>
              <p className="text-xs text-gray-500">Today's Shifts</p>
            </div>
            <div className="bg-[#0d1f3c] border border-[#1e3a5f] rounded-lg px-4 py-2 text-center">
              <p className="text-2xl font-bold text-green-400">{nurses.length}</p>
              <p className="text-xs text-gray-500">Nurses</p>
            </div>
          </div>
        </div>

        {/* NURSING STANDARD BANNER */}
        <div className="flex items-start gap-4 bg-[#0a1628] border border-[#1e3a5f] rounded-xl px-6 py-4">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center shrink-0 text-blue-400 text-lg">
            📋
          </div>
          <div>
            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-1">
              IOS Scheduling Standard
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Per ICN guidelines, nurse schedules must ensure adequate rest periods between shifts —
              a minimum of <span className="text-white font-semibold">11 hours between consecutive shifts</span> is
              recommended to prevent fatigue-related clinical errors.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
            New Assignment
          </h2>
          <AssignmentForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            nurses={nurses}
          />
        </div>

        {/* CALENDAR + TODAY */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
            Schedule View
          </h2>
          {loading ? (
            <div className="flex items-center gap-3 text-gray-500 py-8">
              <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
              Loading schedule...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ScheduleCalendar events={events} />
              </div>
              <div>
                <TodayAssignments assignments={assignments} />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER QUOTE */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "Organizing care is itself an act of care."
          </p>
          <p className="text-gray-700 text-xs mt-2">— Florence Nightingale Principle</p>
        </div>

      </div>
    </div>
  );
}

export default Scheduling;
