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
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HospitalAdmin from "./pages/HospitalAdmin";
import AdminPatients from "./pages/AdminPatients";
import Doctors from "./pages/Doctors";
import Nurses from "./pages/Nurses";
import Accounts from "./pages/Accounts";
import HRM from "./pages/HRM";
import Scheduling from "./pages/Scheduling";
import AuditLogs from "./pages/AuditLogs";


import PatientRegister from "./pages/PatientRegister.jsx";
import PatientLogin from "./pages/PatientLogin.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import Appointments from "./pages/Appointments";

function App() {
  const [patientToken, setPatientToken] = useState(localStorage.getItem("patient_token"));

  return (
    <Router>
      <Routes>
        {/* All public-facing routes share AppShell (Navbar + MegaMenu) */}
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/doctors" element={<DoctorsDirectory />} />
          <Route path="/nurses" element={<NursesDirectory />} />
          <Route path="/hospital/:slug" element={<HospitalPage />} />

          <Route path="/hospital-onboarding" element={<HospitalOnboarding />} />
          <Route path="/hospital-onboarding/admin" element={<HospitalOnboardingAdmin />} />
          <Route path="/hospital-onboarding/branding" element={<HospitalOnboardingBranding />} />
          <Route path="/hospital-onboarding/subscription" element={<HospitalOnboardingSubscription />} />
          <Route path="/hospital-onboarding/review" element={<HospitalOnboardingReview />} />
          <Route path="/hospital-onboarding/payment" element={<HospitalOnboardingPayment />} />

          <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
          <Route path="/nurse-onboarding" element={<NurseOnboarding />} />
          <Route path="/nurse-onboarding/review" element={<NurseOnboardingReview />} />

          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/pharmacy-onboarding" element={<PharmacyOnboarding />} />
          <Route path="/pharmacy-onboarding/review" element={<PharmacyOnboardingReview />} />

          <Route path="/laboratories" element={<Laboratories />} />
          <Route path="/laboratories-onboarding" element={<LaboratoriesOnboarding />} />
          <Route path="/laboratories-onboarding/review" element={<LaboratoriesOnboardingReview />} />
          <Route path="/laboratories-onboarding/payment" element={<LaboratoryOnboardingPayment />} />

          <Route path="/traditional-medicine" element={<TraditionalMedicine />} />
          <Route path="/traditional-medicine-onboarding" element={<TraditionalMedicineOnboarding />} />
          <Route path="/traditional-medicine-onboarding/review" element={<TraditionalMedicineOnboardingReview />} />

          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/hospital-login" element={<HospitalLogin />} />

          {/* Patient routes now inside AppShell so they carry header */}
          <Route path="/register" element={<PatientRegister />} />
          <Route path="/patient-login" element={<PatientLogin setPatientToken={setPatientToken} />} />
          <Route
            path="/patient-dashboard"
            element={
              patientToken
                ? <PatientDashboard setPatientToken={setPatientToken} />
                : <PatientLogin setPatientToken={setPatientToken} />
            }
          />
          <Route path="/appointments" element={<Appointments />} />
        </Route>

        {/* Registered-hospital tenant workspace: intentionally outside the public AppShell. */}
        <Route path="/hospital/admin" element={<HospitalAdmin />} />
        <Route path="/hospital/patients" element={<AdminPatients />} />
        <Route path="/hospital/doctors" element={<Doctors />} />
        <Route path="/hospital/nurses" element={<Nurses />} />
        <Route path="/hospital/accounts" element={<Accounts />} />
        <Route path="/hospital/hrm" element={<HRM />} />
        <Route path="/hospital/scheduling" element={<Scheduling />} />
        <Route path="/hospital/audit-logs" element={<AuditLogs />} />
      </Routes>
    </Router>
  );
}

export default App;
