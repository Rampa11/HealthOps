// src/Dashboard.jsx
import { useEffect, useState, useRef } from "react";
import api from "./api.js";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// COMPONENTS
import Sidebar from "./components/Sidebar.jsx";
import StatsCards from "./components/StatsCards.jsx";
import AssignmentForm from "./components/AssignmentForm.jsx";
import NurseCards from "./components/NurseCards.jsx";
import ScheduleCalendar from "./components/ScheduleCalendar.jsx";
import TopNav from "./components/TopNav.jsx";
import TodayAssignments from "./components/TodayAssignments.jsx";

// ── SLIDESHOW CONTENT ────────────────────────────────────────────────────────
const SLIDES = [
  {
    quote: "The good physician treats the disease; the great physician treats the patient who has the disease.",
    author: "Sir William Osler",
    role: "Father of Modern Medicine",
    tag: "Clinical Philosophy",
  },
  {
    quote: "Nurses dispense comfort, compassion, and caring without even a prescription.",
    author: "Val Saintsbury",
    role: "Healthcare Advocate",
    tag: "Nursing Excellence",
  },
  {
    quote: "The ICN Code of Ethics for Nurses demands that nurses promote health, prevent illness, and alleviate suffering — with respect for human rights.",
    author: "International Council of Nurses",
    role: "ICN Code of Ethics, 2021",
    tag: "IOS Nursing Standard",
  },
  {
    quote: "To do what nobody else will do, in a way that nobody else can, in spite of all we go through — that is to be a nurse.",
    author: "Rawsi Williams",
    role: "Registered Nurse & Author",
    tag: "Nursing Principle",
  },
  {
    quote: "Every system is perfectly designed to get the results it gets. If we want better outcomes, we must redesign the system.",
    author: "Paul Batalden",
    role: "Institute for Healthcare Improvement",
    tag: "Healthcare Operations",
  },
  {
    quote: "Safe staffing is not a luxury — it is a patient safety imperative. Nurse-to-patient ratios directly correlate with patient mortality rates.",
    author: "American Nurses Association",
    role: "ANA Safe Staffing Principles",
    tag: "IOS Nursing Standard",
  },
  {
    quote: "The art of medicine consists of amusing the patient while nature cures the disease.",
    author: "Voltaire",
    role: "Philosopher",
    tag: "Healthcare Wisdom",
  },
  {
    quote: "Documentation is not bureaucracy — it is the clinical record that protects the patient, the nurse, and the institution.",
    author: "Joint Commission on Accreditation",
    role: "Healthcare Organizations",
    tag: "Clinical Standard",
  },
];

// Tag color map
const TAG_COLORS = {
  "Clinical Philosophy": "bg-blue-900/60 text-blue-300 border-blue-700",
  "Nursing Excellence": "bg-teal-900/60 text-teal-300 border-teal-700",
  "IOS Nursing Standard": "bg-green-900/60 text-green-300 border-green-700",
  "Nursing Principle": "bg-cyan-900/60 text-cyan-300 border-cyan-700",
  "Healthcare Operations": "bg-indigo-900/60 text-indigo-300 border-indigo-700",
  "Healthcare Wisdom": "bg-purple-900/60 text-purple-300 border-purple-700",
  "Clinical Standard": "bg-emerald-900/60 text-emerald-300 border-emerald-700",
};

function QuoteSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 350);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = SLIDES[current];
  const tagClass = TAG_COLORS[slide.tag] || "bg-gray-800 text-gray-300 border-gray-600";

  return (
    <div className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a2a1f] border border-[#1e3a5f] rounded-2xl px-8 py-7 overflow-hidden">
      {/* Subtle background pulse */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        {/* Tag */}
        <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border mb-4 ${tagClass}`}>
          {slide.tag}
        </span>

        {/* Quote */}
        <blockquote
          className="text-white text-lg font-light leading-relaxed mb-4 italic transition-opacity duration-350"
          style={{ opacity: fading ? 0 : 1 }}
        >
          "{slide.quote}"
        </blockquote>

        {/* Attribution */}
        <div className="flex items-center justify-between" style={{ opacity: fading ? 0 : 1 }}>
          <div>
            <p className="text-teal-400 font-semibold text-sm">{slide.author}</p>
            <p className="text-gray-500 text-xs">{slide.role}</p>
          </div>

          {/* Dots */}
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 h-2 bg-teal-400"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
function Dashboard({ setToken }) {
  const [assignments, setAssignments] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nurse_id: "",
    patient_name: "",
    start_time: "",
    end_time: "",
  });

  const token = localStorage.getItem("token");

  // ── FETCH ─────────────────────────────────────────────────────────
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
      console.log("NURSES RESPONSE:", res.data);
      setNurses(Array.isArray(res.data) ? res.data : res.data.items || res.data.data || []);
    } catch (err) {
      console.error("❌ NURSE ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchNurses();
  }, []);

  // ── FORM ──────────────────────────────────────────────────────────
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

  // ── DATA ──────────────────────────────────────────────────────────
  const filteredAssignments = assignments.filter((a) =>
    selectedNurse ? String(a.nurse_id) === String(selectedNurse) : true
  );

  const events = filteredAssignments.map((a) => ({
    id: a.id,
    title: `${a.patient_name} • ${a.nurse_name || "Nurse"}`,
    start: new Date(a.start_time),
    end: new Date(a.end_time),
  }));

  // ── KANBAN ────────────────────────────────────────────────────────
  const buildColumns = () => ({
    pending: { name: "Pending", color: "border-yellow-500/40", dot: "bg-yellow-400", items: assignments.filter((a) => a.status === "pending") },
    inProgress: { name: "In Progress", color: "border-blue-500/40", dot: "bg-blue-400", items: assignments.filter((a) => a.status === "in_progress") },
    completed: { name: "Completed", color: "border-green-500/40", dot: "bg-green-400", items: assignments.filter((a) => a.status === "completed") },
  });

  const [board, setBoard] = useState(buildColumns());

  useEffect(() => { setBoard(buildColumns()); }, [assignments]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = board[source.droppableId];
      const items = [...column.items];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      setBoard({ ...board, [source.droppableId]: { ...column, items } });
      return;
    }

    const srcCol = board[source.droppableId];
    const dstCol = board[destination.droppableId];
    const srcItems = [...srcCol.items];
    const dstItems = [...dstCol.items];
    const [moved] = srcItems.splice(source.index, 1);
    moved.status = destination.droppableId;
    dstItems.splice(destination.index, 0, moved);

    setBoard({
      ...board,
      [source.droppableId]: { ...srcCol, items: srcItems },
      [destination.droppableId]: { ...dstCol, items: dstItems },
    });

    try {
      await api.patch(`/assignments/${moved.id}/`,
        { status: moved.status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("❌ UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#060f1e] text-white">

      {/* SIDEBAR — slide-out nav, owns the hamburger button */}
      <Sidebar />

      {/* TOP NAV */}
      <TopNav setToken={setToken} />

      {/* PAGE WRAPPER — max width + centered with breathing room */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* ── HERO HEADER ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1e3a5f] pb-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Healthcare Workforce Intelligence
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Operations Dashboard
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              System Live
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">{nurses.length} nurses on record</span>
          </div>
        </div>

        {/* ── QUOTE SLIDESHOW ──────────────────────────────────────── */}
        <QuoteSlideshow />

        {/* ── STATS CARDS ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
            At a Glance
          </h2>
          <StatsCards assignments={assignments} nurses={nurses} />
        </div>

        {/* ── ASSIGNMENT FORM ──────────────────────────────────────── */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
            Create Assignment
          </h2>
          <AssignmentForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            nurses={nurses}
          />
        </div>

        {/* ── INLINE NURSING STANDARD BANNER ──────────────────────── */}
        <div className="flex items-start gap-4 bg-[#0a1f0f] border border-green-900/50 rounded-xl px-6 py-4">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-green-900/60 flex items-center justify-center shrink-0 text-green-400 text-lg">
            ✦
          </div>
          <div>
            <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-1">
              IOS Nursing Standard — Safe Staffing
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              The WHO recommends a minimum nurse-to-patient ratio of <span className="text-white font-semibold">1:4 in general wards</span> and{" "}
              <span className="text-white font-semibold">1:1 or 1:2 in critical care</span>. Consistent monitoring of assignment loads is
              a core operational safety requirement.
            </p>
          </div>
        </div>

        {/* ── FILTER + CALENDAR + TODAY ────────────────────────────── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">
              Schedule View
            </h2>
            <select
              value={selectedNurse}
              onChange={(e) => setSelectedNurse(e.target.value)}
              className="border border-[#1e3a5f] bg-[#0d1f3c] text-white text-sm p-2 rounded-lg w-full sm:w-52 focus:outline-none focus:border-teal-500"
            >
              <option value="">All Nurses</option>
              {nurses.map((n) => (
                <option key={n.id} value={n.id}>{n.full_name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ScheduleCalendar events={events} />
            </div>
            <div>
              <TodayAssignments assignments={assignments} />
            </div>
          </div>
        </div>

        {/* ── SECOND QUOTE BANNER ──────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#0d1f3c] to-[#0a1628] border border-[#1e3a5f] rounded-xl px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="text-blue-400 text-3xl leading-none">"</div>
          <div>
            <p className="text-gray-200 text-sm italic leading-relaxed">
              Nurses are the heart of healthcare. Their vigilance, skill, and compassion are the difference between good care and great care.
            </p>
            <p className="text-blue-400 text-xs font-semibold mt-2">
              — Donna Wilk Cardillo · Registered Nurse & Healthcare Speaker
            </p>
          </div>
        </div>

        {/* ── KANBAN ───────────────────────────────────────────────── */}
<div>
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">
      Assignment Board
    </h2>
    <span className="text-xs text-gray-600">Drag cards to update status</span>
  </div>

  {loading ? (
    <div className="flex items-center gap-3 text-gray-500 py-8">
      <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
      Loading assignments...
    </div>
  ) : assignments.length === 0 ? (
    <div className="text-center py-16 border border-dashed border-[#1e3a5f] rounded-2xl">
      <p className="text-gray-500">No assignments yet.</p>
      <p className="text-gray-600 text-sm mt-1">Create one using the form above.</p>
    </div>
  ) : (
    <>
      {/* ── SUMMARY BAR ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Pending",
            count: assignments.filter((a) => a.status === "pending").length,
            border: "border-yellow-700/40",
            bg: "bg-yellow-900/20",
            text: "text-yellow-400",
            dot: "bg-yellow-400",
            subtext: "text-yellow-700",
          },
          {
            label: "In Progress",
            count: assignments.filter((a) => a.status === "in_progress").length,
            border: "border-blue-700/40",
            bg: "bg-blue-900/20",
            text: "text-blue-400",
            dot: "bg-blue-400",
            subtext: "text-blue-800",
          },
          {
            label: "Completed",
            count: assignments.filter((a) => a.status === "completed").length,
            border: "border-green-700/40",
            bg: "bg-green-900/20",
            text: "text-green-400",
            dot: "bg-green-400",
            subtext: "text-green-800",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border ${item.border} ${item.bg} px-5 py-4 flex items-center justify-between`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {item.label}
                </span>
              </div>
              <p className={`text-3xl font-bold ${item.text}`}>{item.count}</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${item.text} opacity-30`}>
                {assignments.length > 0
                  ? `${Math.round((item.count / assignments.length) * 100)}%`
                  : "0%"}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                of {assignments.length} total
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── PROGRESS BAR ────────────────────────────────────── */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-1.5">
          <span>Overall Progress</span>
          <span>
            {assignments.filter((a) => a.status === "completed").length} of{" "}
            {assignments.length} completed
          </span>
        </div>
        <div className="w-full bg-[#0d1f3c] rounded-full h-2 flex overflow-hidden">
          <div
            className="bg-yellow-500 h-2 transition-all duration-500"
            style={{
              width: `${Math.round(
                (assignments.filter((a) => a.status === "pending").length /
                  assignments.length) *
                  100
              )}%`,
            }}
          />
          <div
            className="bg-blue-500 h-2 transition-all duration-500"
            style={{
              width: `${Math.round(
                (assignments.filter((a) => a.status === "in_progress").length /
                  assignments.length) *
                  100
              )}%`,
            }}
          />
          <div
            className="bg-green-500 h-2 transition-all duration-500"
            style={{
              width: `${Math.round(
                (assignments.filter((a) => a.status === "completed").length /
                  assignments.length) *
                  100
              )}%`,
            }}
          />
        </div>
        <div className="flex gap-4 mt-2">
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-yellow-500" /> Pending
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> In Progress
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Completed
          </span>
        </div>
      </div>

      {/* ── KANBAN COLUMNS ──────────────────────────────────── */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Object.entries(board).map(([id, column]) => (
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`rounded-xl border ${column.color} min-h-[280px] transition-colors duration-200 ${
                    snapshot.isDraggingOver ? "bg-[#0d1f3c]" : "bg-[#0a1628]"
                  }`}
                >
                  {/* Column header */}
                  <div className="px-4 py-3 border-b border-[#1e3a5f] flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${column.dot}`} />
                    <span className="text-sm font-semibold text-white">
                      {column.name}
                    </span>

                    {/* Percentage */}
                    <span className="text-xs text-gray-600">
                      {assignments.length > 0
                        ? `${Math.round(
                            (column.items.length / assignments.length) * 100
                          )}%`
                        : "0%"}
                    </span>

                    {/* Count badge */}
                    <span
                      className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full border ${
                        id === "pending"
                          ? "bg-yellow-900/40 text-yellow-400 border-yellow-700/40"
                          : id === "inProgress"
                          ? "bg-blue-900/40 text-blue-400 border-blue-700/40"
                          : "bg-green-900/40 text-green-400 border-green-700/40"
                      }`}
                    >
                      {column.items.length}{" "}
                      {column.items.length === 1 ? "task" : "tasks"}
                    </span>
                  </div>

                  <div className="p-3 space-y-2">
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3.5 rounded-lg border transition-all ${
                              snapshot.isDragging
                                ? "bg-blue-700 border-blue-500 shadow-xl shadow-blue-900/40"
                                : "bg-[#0d1f3c] border-[#1e3a5f] hover:border-teal-700"
                            }`}
                          >
                            <p className="font-semibold text-white text-sm">
                              {item.patient_name}
                            </p>
                            <p className="text-xs text-teal-400 mt-0.5">
                              {item.nurse_name || "Unassigned"}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(item.start_time).toLocaleString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              {" → "}
                              {new Date(item.end_time).toLocaleString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  )}
</div>
        {/* ── NURSE CARDS ──────────────────────────────────────────── */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-5">
            Nurse Roster
          </h2>
          <NurseCards nurses={nurses} />
        </div>

        {/* ── FOOTER QUOTE ─────────────────────────────────────────── */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "Constant attention by a good nurse may be just as important as a major operation by a surgeon."
          </p>
          <p className="text-gray-700 text-xs mt-2">— Dag Hammarskjöld · UN Secretary-General</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
