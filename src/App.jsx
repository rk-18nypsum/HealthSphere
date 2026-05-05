import React from "react";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/PatientList";
import AddPatient from "./pages/AddPatient";
import DoctorList from "./pages/DoctorList";
import AddDoctor from "./pages/AddDoctor";
import Appointment from "./pages/Appointment";
import Billing from "./pages/Billing";
import Pharmacy from "./pages/Pharmacy";
import Reports from "./pages/Reports";
function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          <Route path="/pharmacy-list" element={<Pharmacy />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
