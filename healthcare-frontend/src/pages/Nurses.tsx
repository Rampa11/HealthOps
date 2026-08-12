// src/pages/Nurses.jsx
import { useEffect, useState } from "react";
import api from "../api";

import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import NurseCards from "../components/NurseCards";
import StatsCards from "../components/StatsCards";

function Nurses({ setToken }) {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState("user");
  const [createdUserId, setCreatedUserId] = useState(null);

  const [userForm, setUserForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "nurse",
  });

  const [nurseForm, setNurseForm] = useState({
    specialization: "",
    years_experience: "",
  });

  const token = localStorage.getItem("token");

  const fetchNurses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/nurses/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNurses(Array.isArray(res.data) ? res.data : res.data.items || res.data.data || []);
    } catch (err) {
      console.error("❌ NURSE ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNurses(); }, []);

  const handleCancel = () => {
    setShowForm(false);
    setStep("user");
    setCreatedUserId(null);
    setUserForm({ full_name: "", email: "", password: "", role: "nurse" });
    setNurseForm({ specialization: "", years_experience: "" });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post("/users/", userForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreatedUserId(res.data.id);
      setStep("nurse");
    } catch (err) {
      console.error("❌ CREATE USER ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Failed to create user ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateNurse = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/nurses/", null, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          user_id: createdUserId,
          specialization: nurseForm.specialization,
          years_experience: parseInt(nurseForm.years_experience),
        },
      });
      alert("Nurse created successfully ✅");
      handleCancel();
      fetchNurses();
    } catch (err) {
      console.error("❌ CREATE NURSE ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Failed to create nurse profile ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      <Sidebar />
      <TopNav setToken={setToken} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1e3a5f] pb-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Workforce Management
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">Nurses</h1>
            <p className="text-gray-400 mt-1 text-sm">
              View, manage, and onboard nurse profiles and credentials
            </p>
          </div>
          <button
            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
            className="self-start md:self-auto bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium transition text-sm"
          >
            {showForm ? "✕ Cancel" : "+ Add Nurse"}
          </button>
        </div>

        {/* NURSING STANDARD BANNER */}
        <div className="flex items-start gap-4 bg-[#0a1f0f] border border-green-900/50 rounded-xl px-6 py-4">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-green-900/60 flex items-center justify-center shrink-0 text-green-400 text-lg">
            ✦
          </div>
          <div>
            <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-1">
              IOS Nursing Standard — Credentialing
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              The ICN requires all registered nurses to hold current licensure, maintain continuing
              education credits, and have verified specialization credentials before patient assignment.
              <span className="text-white font-semibold"> Annual re-credentialing</span> is mandatory.
            </p>
          </div>
        </div>

        {/* TWO-STEP CREATE FORM */}
        {showForm && (
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
            {/* Step indicator */}
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
                step === "nurse"
                  ? "bg-teal-900/60 text-teal-300 border-teal-700"
                  : "bg-[#0d1f3c] text-gray-500 border-[#1e3a5f]"
              }`}>
                2 Nurse Profile
              </div>
            </div>

            {step === "user" && (
              <>
                <h2 className="text-white font-semibold mb-1">Step 1 — Create Login Account</h2>
                <p className="text-gray-500 text-sm mb-5">This creates the nurse's system credentials.</p>
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name"
                    value={userForm.full_name}
                    onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <input type="email" placeholder="Email Address"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <input type="password" placeholder="Temporary Password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <div className="bg-[#060f1e] border border-[#1e3a5f] p-2.5 rounded-lg text-sm flex items-center text-gray-500">
                    Role: <span className="ml-2 text-teal-400 font-semibold">nurse</span>
                    <span className="ml-2 text-gray-700">(auto-assigned)</span>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" disabled={submitting}
                      className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition">
                      {submitting ? "Creating account..." : "Next →"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === "nurse" && (
              <>
                <h2 className="text-white font-semibold mb-1">Step 2 — Nurse Clinical Profile</h2>
                <p className="text-gray-500 text-sm mb-5">Account created. Now add clinical details.</p>
                <form onSubmit={handleCreateNurse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Specialization (e.g. ICU, Pediatrics)"
                    value={nurseForm.specialization}
                    onChange={(e) => setNurseForm({ ...nurseForm, specialization: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <input type="number" placeholder="Years of Experience" min="0"
                    value={nurseForm.years_experience}
                    onChange={(e) => setNurseForm({ ...nurseForm, years_experience: e.target.value })}
                    required
                    className="bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" disabled={submitting}
                      className="bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition">
                      {submitting ? "Creating profile..." : "Create Nurse ✓"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* STATS */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">At a Glance</h2>
          <StatsCards assignments={[]} nurses={nurses} />
        </div>

        {/* NURSE LIST */}
        <div>
          <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">Nurse Roster</h2>
          {loading ? (
            <div className="flex items-center gap-3 text-gray-500 py-8">
              <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
              Loading nurses...
            </div>
          ) : nurses.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-[#1e3a5f] rounded-2xl">
              <p className="text-gray-500">No nurses on record.</p>
              <p className="text-gray-600 text-sm mt-1">Click "+ Add Nurse" to onboard your first nurse.</p>
            </div>
          ) : (
            <NurseCards nurses={nurses} />
          )}
        </div>

        {/* FOOTER QUOTE */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "Nurses are the backbone of any healthcare system. Their expertise, dedication, and compassion define the standard of care."
          </p>
          <p className="text-gray-700 text-xs mt-2">— World Health Organization, State of the World's Nursing 2020</p>
        </div>

      </div>
    </div>
  );
}

export default Nurses;
