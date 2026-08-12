// src/pages/Billing.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

const MOCK_INVOICES = [
  { id: "INV-001", patient: "John Doe", nurse: "Nurse Joy", amount: 200, status: "Paid", date: "2026-06-01" },
  { id: "INV-002", patient: "Jane Smith", nurse: "Presca Hugman", amount: 150, status: "Pending", date: "2026-06-03" },
  { id: "INV-003", patient: "Michael Obi", nurse: "Amaka Rukky", amount: 320, status: "Paid", date: "2026-06-05" },
  { id: "INV-004", patient: "Adaeze Nwosu", nurse: "Nurse Joy", amount: 180, status: "Overdue", date: "2026-05-28" },
  { id: "INV-005", patient: "Emeka Eze", nurse: "Presca Hugman", amount: 250, status: "Pending", date: "2026-06-08" },
];

const STATUS_STYLES = {
  Paid: "bg-green-900/40 text-green-400 border-green-700/40",
  Pending: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
  Overdue: "bg-red-900/40 text-red-400 border-red-700/40",
};

function Billing({ setToken }) {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? MOCK_INVOICES
    : MOCK_INVOICES.filter((inv) => inv.status === filter);

  const totalPaid = MOCK_INVOICES.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = MOCK_INVOICES.filter(i => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const totalOverdue = MOCK_INVOICES.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="min-h-screen bg-[#060f1e] text-white">
      <Sidebar />
      <TopNav setToken={setToken} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-20 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1e3a5f] pb-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Financial Management
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">Billing</h1>
            <p className="text-gray-400 mt-1 text-sm">
              Manage invoices, payments, and financial records
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-700/30 px-4 py-2 rounded-lg">
            ⚠ Showing mock data — backend integration coming soon
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Total Collected</p>
            <p className="text-3xl font-bold text-green-400">${totalPaid.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">{MOCK_INVOICES.filter(i => i.status === "Paid").length} invoices paid</p>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">${totalPending.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">{MOCK_INVOICES.filter(i => i.status === "Pending").length} invoices awaiting payment</p>
          </div>
          <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Overdue</p>
            <p className="text-3xl font-bold text-red-400">${totalOverdue.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">{MOCK_INVOICES.filter(i => i.status === "Overdue").length} invoices overdue</p>
          </div>
        </div>

        {/* INVOICE TABLE */}
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl overflow-hidden">
          {/* Table header + filter */}
          <div className="px-6 py-4 border-b border-[#1e3a5f] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-white font-semibold">Recent Invoices</h2>
            <div className="flex gap-2">
              {["All", "Paid", "Pending", "Overdue"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    filter === f
                      ? "bg-teal-900/60 text-teal-300 border-teal-700"
                      : "text-gray-500 border-[#1e3a5f] hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  {["Invoice", "Patient", "Nurse", "Amount", "Date", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv, i) => (
                  <tr key={inv.id} className={`border-b border-[#1e3a5f]/50 hover:bg-[#0d1f3c] transition-colors ${i % 2 === 0 ? "" : "bg-[#060f1e]/40"}`}>
                    <td className="px-6 py-4 text-teal-400 font-mono text-xs">{inv.id}</td>
                    <td className="px-6 py-4 text-white">{inv.patient}</td>
                    <td className="px-6 py-4 text-gray-400">{inv.nurse}</td>
                    <td className="px-6 py-4 text-white font-semibold">${inv.amount}</td>
                    <td className="px-6 py-4 text-gray-500">{inv.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER QUOTE */}
        <div className="border-t border-[#1e3a5f] pt-8 text-center">
          <p className="text-gray-600 text-sm italic">
            "Healthcare is a right, not a privilege — but sustainable care requires sustainable finance."
          </p>
          <p className="text-gray-700 text-xs mt-2">— Healthcare Finance Management Association</p>
        </div>

      </div>
    </div>
  );
}

export default Billing;
