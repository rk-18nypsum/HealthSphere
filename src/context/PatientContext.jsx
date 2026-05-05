import { createContext, useContext, useState } from "react";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now() }]);
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, deletePatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
