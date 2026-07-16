// src/pages/PatientLogin.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function PatientLogin({ setPatientToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/patients/login", { email, password });
      localStorage.setItem("patient_token", res.data.access_token);
      localStorage.setItem("patient_name", res.data.full_name);
      localStorage.setItem("patient_id", res.data.patient_id);
      setPatientToken(res.data.access_token);
      navigate("/patient-dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060f1e] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1e3a5f] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">H</div>
          <div>
            <span className="text-white font-bold text-lg leading-none">HealthOps</span>
            <p className="text-[10px] text-teal-500 tracking-widest uppercase leading-none mt-0.5">Patient Portal</p>
          </div>
        </div>
        <Link to="/register" className="text-sm text-teal-400 hover:text-teal-300 transition">
          New patient? Register →
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Patient Portal</p>
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-gray-400 mt-2 text-sm">Log in to manage your health and earn rewards</p>
          </div>

          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                <input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com" required
                  className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Password</label>
                <input type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password" required
                  className="w-full bg-[#060f1e] text-white border border-[#1e3a5f] p-2.5 rounded-lg focus:outline-none focus:border-teal-500 text-sm"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-semibold transition mt-2">
                {loading ? "Logging in..." : "Login to Patient Portal"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#1e3a5f] text-center">
              <p className="text-gray-500 text-xs">
                Are you a staff member?{" "}
                <a href="/" className="text-teal-400 hover:text-teal-300">Staff Login →</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
