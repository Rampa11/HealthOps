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


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // If no token, show login
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <div className="flex">
        {/* Sidebar stays visible across all routes */}
        <Sidebar />

        {/* Main content changes based on route */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard setToken={setToken} />} />
            <Route path="/scheduling" element={<Scheduling setToken={setToken} />} />
            <Route path="/nurses" element={<Nurses setToken={setToken} />} />
            <Route path="/reports" element={<Reports setToken={setToken} />} />
            <Route path="/billing" element={<Billing setToken={setToken} />} />
            <Route path="/audit-logs" element={<AuditLogs setToken={setToken} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
