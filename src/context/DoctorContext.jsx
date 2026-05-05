import { createContext, useContext, useState } from "react";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const addDoctor = (doctor) => {
    setDoctors([...doctors, { ...doctor, id: Date.now() }]);
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  return (
    <DoctorContext.Provider value={{ doctors, addDoctor, deleteDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
