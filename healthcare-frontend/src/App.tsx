import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";
import HospitalOnboarding from "./pages/HospitalOnboarding";
import GetStarted from "./pages/GetStarted";
import HospitalPage from "./pages/HospitalPage";
import DoctorsDirectory from "./pages/DoctorsDirectory";
import DoctorOnboarding from "./pages/DoctorOnboarding";
import NursesDirectory from "./pages/NursesDirectory";
import NurseOnboarding from "./pages/NurseOnboarding.tsx";
import NurseOnboardingReview from "./pages/NurseOnboardingReview";
import HospitalOnboardingAdmin from "./pages/HospitalOnboardingAdmin";
import HospitalOnboardingBranding from "./pages/HospitalOnboardingBranding";
import HospitalOnboardingSubscription from "./pages/HospitalOnboardingSubscription";
import HospitalOnboardingReview from "./pages/HospitalOnboardingReview";
import HospitalOnboardingPayment from "./pages/HospitalOnboardingPayment";
import Pharmacy from "./pages/Pharmacy";
import PharmacyOnboarding from "./pages/PharmacyOnboarding";
import PharmacyOnboardingReview from "./pages/PharmacyOnboardingReview";
import TraditionalMedicine from "./pages/TraditionalMedicine";
import TraditionalMedicineOnboarding from "./pages/TraditionalMedicineOnboarding";
import TraditionalMedicineOnboardingReview from "./pages/TraditionalMedicineOnboardingReview";
import Laboratories from "./pages/Laboratories";
import LaboratoriesOnboarding from "./pages/LaboratoriesOnboarding";
import LaboratoriesOnboardingReview from "./pages/LaboratoriesOnboardingReview";
import LaboratoryOnboardingPayment from "./pages/LaboratoryOnboardingPayment";
import AppShell from "./layouts/AppShell";
import HospitalLogin from "./pages/HospitalLogin";

import Dashboard from "./Dashboard.js";
import Login from "./Login.tsx";

import Sidebar from "./components/Sidebar.jsx";

import Scheduling from "./pages/Scheduling.jsx";
import Nurses from "./pages/Nurses.jsx";
import Reports from "./pages/Reports.jsx";
import Billing from "./pages/Billing.jsx";
import AuditLogs from "./pages/AuditLogs.jsx";
import Doctors from "./pages/Doctors.js";
import AdminPatients from "./pages/AdminPatients.jsx";
import PatientRegister from "./pages/PatientRegister.jsx";
import PatientLogin from "./pages/PatientLogin.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [patientToken, setPatientToken] = useState(localStorage.getItem("patient_token"));

  return (
    <Router>
      <Routes>

        {/* ==========================
          PUBLIC WEBSITE
      ========================== */}

        <Route element={<AppShell />}>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/hospitals"
            element={<Hospitals />}
          />

          <Route
            path="/hospital-onboarding"
            element={<HospitalOnboarding />}
          />

          <Route
            path="/hospital-onboarding/admin"
            element={<HospitalOnboardingAdmin />}
          />

          <Route
            path="/hospital-onboarding/branding"
            element={<HospitalOnboardingBranding />}
          />

          <Route
            path="/hospital-onboarding/subscription"
            element={<HospitalOnboardingSubscription />}
          />

          <Route
            path="/hospital-onboarding/review"
            element={<HospitalOnboardingReview />}
          />

          <Route
            path="/hospital-onboarding/payment"
            element={<HospitalOnboardingPayment />}
          />

          <Route
            path="/doctor-onboarding"
            element={<DoctorOnboarding />}
          />

          <Route
            path="/nurse-onboarding"
            element={<NurseOnboarding />}
          />

          <Route
            path="/nurse-onboarding/review"
            element={<NurseOnboardingReview />}
          />

          <Route
            path="/pharmacy"
            element={<Pharmacy />}
          />

          <Route
            path="/pharmacy-onboarding"
            element={<PharmacyOnboarding />}
          />

          <Route
            path="/pharmacy-onboarding/review"
            element={<PharmacyOnboardingReview />}
          />

          <Route
            path="/get-started"
            element={<GetStarted />}
          />

          <Route
            path="/hospital-login"
            element={<HospitalLogin />}
          />

          <Route
            path="/hospital/:slug"
            element={<HospitalPage />}
          />

          <Route
            path="/doctors"
            element={<DoctorsDirectory />}
          />

          <Route
            path="/nurses"
            element={<NursesDirectory />}
          />

          <Route
            path="/laboratories"
            element={<Laboratories />}
          />

          <Route
            path="/laboratories-onboarding"
            element={<LaboratoriesOnboarding />}
          />

          <Route
            path="/laboratories-onboarding/review"
            element={<LaboratoriesOnboardingReview />}
          />

          <Route
            path="/laboratories-onboarding/payment"
            element={<LaboratoryOnboardingPayment />}
          />

          <Route
            path="/traditional-medicine"
            element={<TraditionalMedicine />}
          />

          <Route
            path="/traditional-medicine-onboarding"
            element={<TraditionalMedicineOnboarding />}
          />

          <Route
            path="/traditional-medicine-onboarding/review"
            element={<TraditionalMedicineOnboardingReview />}
          />

          <Route
            path="/hospital-login"
            element={<HospitalLogin />}
          />

        </Route>



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
