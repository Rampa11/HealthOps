// src/pages/AdminPatients.jsx
import { useEffect, useState } from "react";
import api from "../api.js";
import Sidebar from "../components/Sidebar.js";
import TopNav from "../components/TopNav.js";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENOTYPES = ["AA", "AS", "SS", "AC", "SC"];
const GENDERS = ["Male", "Female", "Prefer not to say"];
const PAYMENT_STATUSES = ["pending", "paid", "overdue"];

const PAYMENT_COLORS = {
  paid: "bg-green-900/40 text-green-400 border-green-700/40",
  pending: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
  overdue: "bg-red-900/40 text-red-400 border-red-700/40",
};

function AdminPatients({ setToken }) {
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("patients");
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", date_of_birth: "",
    gender: "", address: "", blood_group: "", genotype: "",
    allergies: "", medical_history: "", emergency_contact_name: "",
    emergency_contact_phone: "", payment_status: "pending",
  });

  const resetForm = () => setForm({
    full_name: "", email: "", phone: "", date_of_birth: "",
    gender: "", address: "", blood_group: "", genotype: "",
    allergies: "", medical_history: "", emergency_contact_name: "",
    emergency_contact_phone: "", payment_status: "pending",
  });

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await api.get("/patients/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ PATIENTS ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchConsultations = async () => {
    try {
      const res = await api.get("/patients/consultation-requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConsultations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ CONSULTATIONS ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchConsultations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/patients/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Patient created ✅");
      resetForm();
      setShowForm(false);
      fetchPatients();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to create patient ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.patch(`/patients/${editingPatient.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Patient updated ✅");
      setEditingPatient(null);
      resetForm();
      fetchPatients();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update patient ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (patient) => {
    setEditingPatient(patient);
    setForm({
      full_name: patient.full_name || "",
      email: patient.email || "",
      phone: patient.phone || "",
      date_of_birth: patient.date_of_birth || "",
      gender: patient.gender || "",
      address: patient.address || "",
      blood_group: patient.blood_group || "",
      genotype: patient.genotype || "",
      allergies: patient.allergies || "",
      medical_history: patient.medical_history || "",
      emergency_contact_name: patient.emergency_contact_name || "",
      emergency_contact_phone: patient.emergency_contact_phone || "",
      payment_status: patient.payment_status || "pending",
    });
    setShowForm(false);
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.includes(search);
    const matchesPayment = paymentFilter ? p.payment_status === paymentFilter : true;
    return matchesSearch && matchesPayment;
  });

  const stats = {
    total: patients.length,
    paid: patients.filter((p) => p.payment_status === "paid").length,
    pending: patients.filter((p) => p.payment_status === "pending").length,
    overdue: patients.filter((p) => p.payment_status === "overdue").length,
    pendingConsultations: consultations.filter((c) => c.status === "pending").length,
  };

  const inputClass = "w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm";
  const labelClass = "block text-xs text-gray-500 mb-1";

  const PatientForm = ({ onSubmit, isEdit }) => (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div><label className={labelClass}>Full Name *</label>
        <input type="text" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} required className={inputClass} placeholder="Patient's full name" /></div>
      <div><label className={labelClass}>Email *</label>
        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required={!isEdit} disabled={isEdit} className={`${inputClass} ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="patient@email.com" /></div>
      <div><label className={labelClass}>Phone</label>
        <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} placeholder="+234 xxx xxx xxxx" /></div>
      <div><label className={labelClass}>Date of Birth</label>
        <input type="date" value={form.date_of_birth} onChange={(e) => set("date_of_birth", e.target.value)} className={inputClass} /></div>
      <div><label className={labelClass}>Gender</label>
        <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className={inputClass}>
          <option value="">Select gender</option>
          {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select></div>
      <div><label className={labelClass}>Payment Status</label>
        <select value={form.payment_status} onChange={(e) => set("payment_status", e.target.value)} className={inputClass}>
          {PAYMENT_STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select></div>
      <div><label className={labelClass}>Blood Group</label>
        <select value={form.blood_group} onChange={(e) => set("blood_group", e.target.value)} className={inputClass}>
          <option value="">Select</option>
          {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select></div>
      <div><label className={labelClass}>Genotype</label>
        <select value={form.genotype} onChange={(e) => set("genotype", e.target.value)} className={inputClass}>
          <option value="">Select</option>
          {GENOTYPES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select></div>
      <div className="md:col-span-2"><label className={labelClass}>Address</label>
        <textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Street, City, State" /></div>
      <div className="md:col-span-2"><label className={labelClass}>Known Allergies</label>
        <textarea value={form.allergies} onChange={(e) => set("allergies", e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="e.g. Penicillin, Peanuts" /></div>
      <div className="md:col-span-2"><label className={labelClass}>Medical History</label>
        <textarea value={form.medical_history} onChange={(e) => set("medical_history", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Previous conditions, surgeries..." /></div>
      <div><label className={labelClass}>Emergency Contact Name</label>
        <input type="text" value={form.emergency_contact_name} onChange={(e) => set("emergency_contact_name", e.target.value)} className={inputClass} placeholder="Next of kin name" /></div>
      <div><label className={labelClass}>Emergency Contact Phone</label>
        <input type="tel" value={form.emergency_contact_phone} onChange={(e) => set("emergency_contact_phone", e.target.value)} className={inputClass} placeholder="+234 xxx xxx xxxx" /></div>
      <div className="md:col-span-2 flex justify-end gap-3">
        <button type="button" onClick={() => { setShowForm(false); setEditingPatient(null); resetForm(); }}
          className="px-4 py-2 border border-[#1e3a5f] text-gray-400 hover:text-white rounded-lg text-sm transition">
          Cancel
        </button>
        <button type="submit" disabled={submitting}
          className={`px-6 py-2 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 ${isEdit ? "bg-blue-700 hover:bg-blue-600" : "bg-teal-600 hover:bg-teal-700"}`}>
          {submitting ? "Saving..." : isEdit ? "Update Patient" : "Create Patient"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      <Sidebar />
      <TopNav setToken={setToken} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1e3a5f] pb-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Patient Management</p>
            <h1 className="text-4xl font-bold text-white">Patients</h1>
            <p className="text-gray-400 mt-1 text-sm">Manage patient records, consultations, and payment status</p>
          </div>
          {!showForm && !editingPatient && (
            <button onClick={() => setShowForm(true)}
              className="self-start md:self-auto bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium transition text-sm">
              + Add Patient
            </button>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Patients", value: stats.total, color: "text-white", bg: "border-[#1e3a5f]" },
            { label: "Paid", value: stats.paid, color: "text-green-400", bg: "border-green-700/30 bg-green-900/10" },
            { label: "Pending", value: stats.pending, color: "text-yellow-400", bg: "border-yellow-700/30 bg-yellow-900/10" },
            { label: "Overdue", value: stats.overdue, color: "text-red-400", bg: "border-red-700/30 bg-red-900/10" },
            { label: "Consultation Requests", value: stats.pendingConsultations, color: "text-indigo-400", bg: "border-indigo-700/30 bg-indigo-900/10" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border rounded-xl p-4`}>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CREATE FORM */}
        {showForm && (
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-1">New Patient Record</h2>
            <p className="text-gray-500 text-sm mb-5">Admin-created patient. A temporary password can be set later.</p>
            <PatientForm onSubmit={handleCreate} isEdit={false} />
          </div>
        )}

        {/* EDIT FORM */}
        {editingPatient && (
          <div className="bg-[#0a1628] border border-blue-900/50 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-1">Edit Patient — {editingPatient.full_name}</h2>
            <p className="text-gray-500 text-sm mb-5">Update patient information below.</p>
            <PatientForm onSubmit={handleUpdate} isEdit={true} />
          </div>
        )}

        {/* TABS */}
        <div className="flex gap-2 border-b border-[#1e3a5f] pb-0">
          {["patients", "consultations"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all capitalize ${
                activeTab === tab
                  ? "border-teal-500 text-teal-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}>
              {tab === "patients" ? `Patients (${patients.length})` : `Consultation Requests (${consultations.length})`}
            </button>
          ))}
        </div>

        {/* PATIENTS TABLE */}
        {activeTab === "patients" && (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="text" placeholder="Search by name, email, or phone..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-[#0a1628] border border-[#1e3a5f] text-white text-sm p-2.5 rounded-lg focus:outline-none focus:border-teal-500 placeholder-gray-600"
              />
              <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}
                className="bg-[#0a1628] border border-[#1e3a5f] text-white text-sm p-2.5 rounded-lg w-full sm:w-48 focus:outline-none">
                <option value="">All Payment Status</option>
                {PAYMENT_STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>

            {loading ? (
              <div className="flex items-center gap-3 text-gray-500 py-8">
                <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                Loading patients...
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#1e3a5f] rounded-2xl">
                <p className="text-gray-500">{patients.length === 0 ? "No patients yet." : "No patients match your search."}</p>
                {patients.length === 0 && <p className="text-gray-600 text-sm mt-1">Click "+ Add Patient" or share the registration link with patients.</p>}
              </div>
            ) : (
              <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1e3a5f]">
                        {["Patient", "Contact", "Blood / Genotype", "Payment", "Source", "Actions"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((p, i) => (
                        <tr key={p.id} className={`border-b border-[#1e3a5f]/50 hover:bg-[#0d1f3c] transition-colors ${i % 2 === 0 ? "" : "bg-[#060f1e]/30"}`}>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {p.full_name?.charAt(0)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{p.full_name}</p>
                                <p className="text-gray-500 text-xs">{p.gender || "—"} {p.date_of_birth ? `• DOB: ${p.date_of_birth}` : ""}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-gray-300 text-xs">{p.email}</p>
                            <p className="text-gray-500 text-xs">{p.phone || "—"}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-gray-300 text-xs">{p.blood_group || "—"} / {p.genotype || "—"}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${PAYMENT_COLORS[p.payment_status] || "bg-gray-800 text-gray-400 border-gray-700"}`}>
                              {p.payment_status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${p.registered_by === "self" ? "text-blue-400 bg-blue-900/30" : "text-gray-400 bg-gray-800"}`}>
                              {p.registered_by === "self" ? "Self-registered" : "Admin"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button onClick={() => openEdit(p)}
                              className="text-xs text-teal-400 hover:text-teal-300 border border-teal-800/40 hover:bg-teal-900/20 px-3 py-1 rounded-lg transition">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* CONSULTATION REQUESTS */}
        {activeTab === "consultations" && (
          consultations.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-[#1e3a5f] rounded-2xl">
              <p className="text-gray-500">No consultation requests yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {consultations.map((c) => (
                <div key={c.id} className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-white font-semibold">{c.patient_name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        c.status === "scheduled" ? "bg-green-900/40 text-green-400 border-green-700/40"
                        : c.status === "pending" ? "bg-yellow-900/40 text-yellow-400 border-yellow-700/40"
                        : "bg-gray-800 text-gray-400 border-gray-700"
                      }`}>{c.status}</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Requesting: <span className="text-indigo-400">{c.specialization}</span>
                    </p>
                    {c.notes && <p className="text-gray-500 text-xs mt-1">Notes: {c.notes}</p>}
                    {c.scheduled_date && (
                      <p className="text-teal-400 text-xs mt-1">
                        📅 Scheduled: {c.scheduled_date} at {c.scheduled_time}
                      </p>
                    )}
                    <p className="text-gray-600 text-xs mt-1">{c.patient_email} • Submitted: {c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}</p>
                  </div>
                  {c.status === "pending" && (
                    <div className="text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-700/30 px-3 py-2 rounded-lg">
                      ⚠ Awaiting scheduling
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* REGISTRATION LINK */}
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Patient Self-Registration Link</h3>
          <p className="text-gray-500 text-sm mb-3">Share this link with patients to let them register themselves.</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-[#060f1e] border border-[#1e3a5f] text-teal-400 text-sm px-4 py-2.5 rounded-lg">
              {window.location.origin}/register
            </code>
            <button
              onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/register`); alert("Link copied! ✅"); }}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">
              Copy Link
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "Every patient is a person first. Treat the whole person, not just the condition."
          </p>
          <p className="text-gray-700 text-xs mt-2">— Patient-Centered Care Principle, WHO</p>
        </div>

      </div>
    </div>
  );
}

export default AdminPatients;
