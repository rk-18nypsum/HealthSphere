import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PatientProvider } from "./context/PatientContext";
import { DoctorProvider } from "./context/DoctorContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { BillingProvider } from "./context/BillingContext";
import { PharmacyProvider } from "./context/PharmacyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PatientProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <BillingProvider>
              <PharmacyProvider>
                <App />
              </PharmacyProvider>
            </BillingProvider>
          </AppointmentProvider>
        </DoctorProvider>
      </PatientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
