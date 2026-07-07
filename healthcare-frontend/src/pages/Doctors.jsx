// src/pages/Doctors.jsx
import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

const SPECIALIZATIONS = [
  "General Practice",
  "Internal Medicine",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "Surgery — General",
  "Surgery — Orthopedic",
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Psychiatry",
  "Ophthalmology",
  "ENT (Otolaryngology)",
  "Radiology",
  "Anesthesiology",
  "Oncology",
  "Emergency Medicine",
  "Urology",
  "Nephrology",
  "Endocrinology",
  "Pulmonology",
  "Gastroenterology",
  "Pathology",
];

const SPEC_COLORS = [
  "bg-blue-900/40 text-blue-400 border-blue-700/40",
  "bg-teal-900/40 text-teal-400 border-teal-700/40",
  "bg-purple-900/40 text-purple-400 border-purple-700/40",
  "bg-green-900/40 text-green-400 border-green-700/40",
  "bg-indigo-900/40 text-indigo-400 border-indigo-700/40",
  "bg-cyan-900/40 text-cyan-400 border-cyan-700/40",
  "bg-rose-900/40 text-rose-400 border-rose-700/40",
];

function specColor(spec) {
  let hash = 0;
  for (let i = 0; i < spec.length; i++) hash = spec.charCodeAt(i) + ((hash << 5) - hash);
  return SPEC_COLORS[Math.abs(hash) % SPEC_COLORS.length];
}

function Doctors({ setToken }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState("user");
  const [createdUserId, setCreatedUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState("");

  const [userForm, setUserForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const [doctorForm, setDoctorForm] = useState({
    specialization: "",
    years_experience: "",
    consultation_fee: "",
  });

  const token = localStorage.getItem("token");

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/doctors/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(Array.isArray(res.data) ? res.data : res.data.items || res.data.data || []);
    } catch (err) {
      console.error("❌ DOCTOR ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleCancel = () => {
    setShowForm(false);
    setStep("user");
    setCreatedUserId(null);
    setUserForm({ full_name: "", email: "", password: "", role: "doctor" });
    setDoctorForm({ specialization: "", years_experience: "", consultation_fee: "" });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post("/users/", userForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreatedUserId(res.data.id);
      setStep("doctor");
    } catch (err) {
      console.error("❌ CREATE USER ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Failed to create user ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/doctors/", null, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          user_id: createdUserId,
          specialization: doctorForm.specialization,
          years_experience: parseInt(doctorForm.years_experience),
          consultation_fee: parseFloat(doctorForm.consultation_fee) || 0,
        },
      });
      alert("Doctor created successfully ✅");
      handleCancel();
      fetchDoctors();
    } catch (err) {
      console.error("❌ CREATE DOCTOR ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Failed to create doctor profile ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const uniqueSpecs = [...new Set(doctors.map((d) => d.specialization))].sort();

  const filtered = doctors.filter((d) => {
    const matchesSearch =
      d.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = specFilter ? d.specialization === specFilter : true;
    return matchesSearch && matchesSpec;
  });

  const avgFee = doctors.length
    ? Math.round(doctors.reduce((s, d) => s + (d.consultation_fee || 0), 0) / doctors.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      <Sidebar />
      <TopNav setToken={setToken} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1e3a5f] pb-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Clinical Staff Management
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">Doctors</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Manage physician profiles, specializations, and consultation rates
            </p>
          </div>
          <button
            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
            className="self-start md:self-auto bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium transition text-sm"
          >
            {showForm ? "✕ Cancel" : "+ Add Doctor"}
          </button>
        </div>

        {/* STANDARD BANNER */}
        <div className="flex items-start gap-4 bg-[#0a1628] border border-[#1e3a5f] rounded-xl px-6 py-4">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-indigo-900/60 flex items-center justify-center shrink-0 text-indigo-400 text-lg">
            🩺
          </div>
          <div>
            <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1">
              Consultation Fee Policy
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Consultation charges are{" "}
              <span className="text-white font-semibold">fixed per doctor</span> and automatically
              alert the Accounts team when a scheduling request is made. Only the assigned doctor
              can adjust their own consultation fee.
            </p>
          </div>
        </div>

        {/* TWO-STEP CREATE FORM */}
        {showForm && (
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                step === "user"
                  ? "bg-teal-900/60 text-teal-300 border-teal-700"
                  : "bg-green-900/60 text-green-300 border-green-700"
              }`}>
                {step === "user" ? "1" : "✓"} User Account
              </div>
              <div className="h-px w-8 bg-[#1e3a5f]" />
              <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                step === "doctor"
                  ? "bg-teal-900/60 text-teal-300 border-teal-700"
                  : "bg-[#0d1f3c] text-gray-500 border-[#1e3a5f]"
              }`}>
                2 Doctor Profile
              </div>
            </div>

            {step === "user" && (
              <>
                <h2 className="text-white font-semibold mb-1">Step 1 — Create Login Account</h2>
                <p className="text-gray-500 text-sm mb-5">
                  This creates the doctor's system credentials.
                </p>
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userForm.full_name}
                    onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Temporary Password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <div className="bg-[#060f1e] border border-[#1e3a5f] p-2.5 rounded-lg text-sm flex items-center text-gray-500">
                    Role:{" "}
                    <span className="ml-2 text-teal-400 font-semibold">doctor</span>
                    <span className="ml-2 text-gray-700">(auto-assigned)</span>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition"
                    >
                      {submitting ? "Creating account..." : "Next →"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === "doctor" && (
              <>
                <h2 className="text-white font-semibold mb-1">Step 2 — Clinical Profile</h2>
                <p className="text-gray-500 text-sm mb-5">
                  Account created. Now add specialization and consultation rate.
                </p>
                <form onSubmit={handleCreateDoctor} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={doctorForm.specialization}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  >
                    <option value="">Select Specialization</option>
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Years of Experience"
                    min="0"
                    value={doctorForm.years_experience}
                    onChange={(e) => setDoctorForm({ ...doctorForm, years_experience: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₦</span>
                    <input
                      type="number"
                      placeholder="Consultation Fee"
                      min="0"
                      step="0.01"
                      value={doctorForm.consultation_fee}
                      onChange={(e) => setDoctorForm({ ...doctorForm, consultation_fee: e.target.value })}
                      required
                      className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 pl-7 rounded-lg w-full focus:outline-none focus:border-teal-500 text-sm"
                    />
                  </div>
                  <div className="md:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition"
                    >
                      {submitting ? "Creating profile..." : "Create Doctor ✓"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* STATS */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
            At a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Total Doctors</p>
                <div className="p-1.5 rounded bg-indigo-600 text-white text-xs">🩺</div>
              </div>
              <h2 className="text-3xl font-bold text-white">{doctors.length}</h2>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Specializations Covered</p>
                <div className="p-1.5 rounded bg-teal-600 text-white text-xs">📋</div>
              </div>
              <h2 className="text-3xl font-bold text-white">{uniqueSpecs.length}</h2>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Avg. Consultation Fee</p>
                <div className="p-1.5 rounded bg-green-600 text-white text-xs">₦</div>
              </div>
              <h2 className="text-3xl font-bold text-white">₦{avgFee.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#0a1628] border border-[#1e3a5f] text-white text-sm p-2.5 rounded-lg focus:outline-none focus:border-teal-500 placeholder-gray-600"
          />
          <select
            value={specFilter}
            onChange={(e) => setSpecFilter(e.target.value)}
            className="bg-[#0a1628] border border-[#1e3a5f] text-white text-sm p-2.5 rounded-lg w-full sm:w-64 focus:outline-none focus:border-teal-500"
          >
            <option value="">All Specializations</option>
            {uniqueSpecs.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* DOCTOR CARDS */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
            Physician Roster{" "}
            {filtered.length !== doctors.length && `(${filtered.length} of ${doctors.length})`}
          </h2>

          {loading ? (
            <div className="flex items-center gap-3 text-gray-500 py-8">
              <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
              Loading doctors...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-[#1e3a5f] rounded-2xl">
              <p className="text-gray-500">
                {doctors.length === 0 ? "No doctors on record." : "No doctors match your search."}
              </p>
              {doctors.length === 0 && (
                <p className="text-gray-600 text-sm mt-1">
                  Click "+ Add Doctor" to onboard your first physician.
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow hover:shadow-lg hover:border-teal-800 transition"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {d.full_name?.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Dr. {d.full_name}</h4>
                      <p className="text-gray-400 text-xs">{d.years_experience} yrs experience</p>
                    </div>
                  </div>

                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${specColor(d.specialization)}`}>
                    {d.specialization}
                  </span>

                  <div className="flex justify-between items-center text-sm mt-4 pt-4 border-t border-gray-800">
                    <span className="text-gray-400">Consultation Fee</span>
                    <span className="text-white font-semibold">
                      ₦{(d.consultation_fee || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER QUOTE */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "The good physician treats the disease; the great physician treats the patient who has the disease."
          </p>
          <p className="text-gray-700 text-xs mt-2">— Sir William Osler, Father of Modern Medicine</p>
        </div>

      </div>
    </div>
  );
}

export default Doctors;
