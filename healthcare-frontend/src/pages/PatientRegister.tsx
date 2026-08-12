// src/pages/PatientRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENOTYPES = ["AA", "AS", "SS", "AC", "SC"];
const GENDERS = ["Male", "Female", "Prefer not to say"];

function PatientRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    blood_group: "",
    genotype: "",
    allergies: "",
    medical_history: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });

  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const { confirmPassword, ...payload } = form;
      await api.post("/patients/register", payload);
      setSuccess(true);
    } catch (err) {
      const detail = err.response?.data?.detail || "Registration failed ❌";
      alert(detail);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#060f1e] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-900/40 border border-green-700/40 flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">You're registered!</h1>
          <p className="text-gray-400 mb-8">
            Welcome to HealthOps. Your account has been created. You can now log in to book consultations,
            track your health, and earn loyalty rewards.
          </p>
          <button
            onClick={() => navigate("/patient-login")}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      {/* Header */}
      <div className="border-b border-[#1e3a5f] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
            H
          </div>
          <div>
            <span className="text-white font-bold text-lg leading-none">HealthOps</span>
            <p className="text-[10px] text-teal-500 tracking-widest uppercase leading-none mt-0.5">
              Patient Portal
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/patient-login")}
          className="text-sm text-gray-400 hover:text-white border border-[#1e3a5f] px-4 py-1.5 rounded-lg transition"
        >
          Already registered? Login
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-8 text-center">
          <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Patient Portal</p>
          <h1 className="text-3xl font-bold text-white">Create Your Health Account</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Register once. Book consultations, track your health, and earn loyalty discounts.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {["Account", "Personal", "Medical", "Emergency"].map((label, i) => {
            const stepNum = i + 1;
            const done = step > stepNum;
            const active = step === stepNum;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                  done
                    ? "bg-green-900/60 text-green-300 border-green-700"
                    : active
                    ? "bg-teal-900/60 text-teal-300 border-teal-700"
                    : "bg-[#0d1f3c] text-gray-600 border-[#1e3a5f]"
                }`}>
                  {done ? "✓" : stepNum} {label}
                </div>
                {i < 3 && <div className="h-px w-4 bg-[#1e3a5f]" />}
              </div>
            );
          })}
        </div>

        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">

          {/* STEP 1 — Account */}
          {step === 1 && (
            <>
              <h2 className="text-white font-semibold mb-1">Step 1 — Account Details</h2>
              <p className="text-gray-500 text-sm mb-5">Your login credentials.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Full Name *</label>
                  <input type="text" value={form.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                    placeholder="e.g. Adaeze Nwosu"
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Email Address *</label>
                  <input type="email" value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Password *</label>
                  <input type="password" value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Confirm Password *</label>
                  <input type="password" value={form.confirmPassword}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </>
          )}

          {/* STEP 2 — Personal */}
          {step === 2 && (
            <>
              <h2 className="text-white font-semibold mb-1">Step 2 — Personal Information</h2>
              <p className="text-gray-500 text-sm mb-5">Helps us serve you better.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                  <input type="tel" value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+234 xxx xxx xxxx"
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                  <input type="date" value={form.date_of_birth}
                    onChange={(e) => set("date_of_birth", e.target.value)}
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Gender</label>
                  <select value={form.gender} onChange={(e) => set("gender", e.target.value)}
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  >
                    <option value="">Select gender</option>
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Home Address</label>
                  <textarea value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Street, City, State"
                    rows={2}
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 3 — Medical */}
          {step === 3 && (
            <>
              <h2 className="text-white font-semibold mb-1">Step 3 — Medical Information</h2>
              <p className="text-gray-500 text-sm mb-5">Critical for your care. All fields optional but recommended.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Blood Group</label>
                  <select value={form.blood_group} onChange={(e) => set("blood_group", e.target.value)}
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  >
                    <option value="">Select blood group</option>
                    {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Genotype</label>
                  <select value={form.genotype} onChange={(e) => set("genotype", e.target.value)}
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  >
                    <option value="">Select genotype</option>
                    {GENOTYPES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Known Allergies</label>
                  <textarea value={form.allergies}
                    onChange={(e) => set("allergies", e.target.value)}
                    placeholder="e.g. Penicillin, Peanuts, Latex"
                    rows={2}
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Medical History</label>
                  <textarea value={form.medical_history}
                    onChange={(e) => set("medical_history", e.target.value)}
                    placeholder="e.g. Hypertension (2019), Appendectomy (2021)"
                    rows={3}
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 4 — Emergency Contact */}
          {step === 4 && (
            <>
              <h2 className="text-white font-semibold mb-1">Step 4 — Emergency Contact</h2>
              <p className="text-gray-500 text-sm mb-5">Who should we call in an emergency?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Contact Name</label>
                  <input type="text" value={form.emergency_contact_name}
                    onChange={(e) => set("emergency_contact_name", e.target.value)}
                    placeholder="e.g. Chukwudi Nwosu"
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Contact Phone</label>
                  <input type="tel" value={form.emergency_contact_phone}
                    onChange={(e) => set("emergency_contact_phone", e.target.value)}
                    placeholder="+234 xxx xxx xxxx"
                    className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                  />
                </div>
              </div>

              {/* Loyalty programme info */}
              <div className="mt-6 bg-gradient-to-r from-[#0a1f0f] to-[#0a1628] border border-teal-900/50 rounded-xl p-4">
                <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">
                  🎮 Loyalty & Rewards Programme
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  After registering, you'll get access to <span className="text-white font-semibold">2 daily puzzles</span> —
                  health trivia, riddles, and arithmetic. Each correct answer builds your streak.
                  Every <span className="text-white font-semibold">5 correct answers = 0.5 loyalty points</span>.
                  Points unlock discounts on consultations — up to <span className="text-teal-400 font-semibold">10% off</span>.
                </p>
              </div>
            </>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)}
                className="text-sm text-gray-400 hover:text-white border border-[#1e3a5f] px-4 py-2 rounded-lg transition">
                ← Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button onClick={handleNext}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
                Next →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                className="bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
                {submitting ? "Creating account..." : "Complete Registration ✓"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientRegister;
