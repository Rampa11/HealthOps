import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Login";

import Sidebar from "./components/Sidebar";

import Scheduling from "./pages/Scheduling";
import Nurses from "./pages/Nurses";
import Reports from "./pages/Reports";
import Billing from "./pages/Billing";
import AuditLogs from "./pages/AuditLogs";
import Doctors from "./pages/Doctors";
import AdminPatients from "./pages/AdminPatients";
import PatientRegister from "./pages/PatientRegister";
import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [patientToken, setPatientToken] = useState(localStorage.getItem("patient_token"));

  return (
    <Router>
      <Routes>

        {/* ── PUBLIC PATIENT ROUTES (no staff login needed) ── */}
        <Route path="/register" element={<PatientRegister />} />
        <Route
          path="/patient-login"
          element={<PatientLogin setPatientToken={setPatientToken} />}
        />
        <Route
          path="/patient-dashboard"
          element={
            patientToken
              ? <PatientDashboard setPatientToken={setPatientToken} />
              : <PatientLogin setPatientToken={setPatientToken} />
          }
        />

        {/* ── STAFF ROUTES (requires staff login) ── */}
        <Route
          path="/*"
          element={
            token ? (
              <div className="flex">
                <Sidebar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Dashboard setToken={setToken} />} />
                    <Route path="/scheduling" element={<Scheduling setToken={setToken} />} />
                    <Route path="/nurses" element={<Nurses setToken={setToken} />} />
                    <Route path="/doctors" element={<Doctors setToken={setToken} />} />
                    <Route path="/patients" element={<AdminPatients setToken={setToken} />} />
                    <Route path="/reports" element={<Reports setToken={setToken} />} />
                    <Route path="/billing" element={<Billing setToken={setToken} />} />
                    <Route path="/audit-logs" element={<AuditLogs setToken={setToken} />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
