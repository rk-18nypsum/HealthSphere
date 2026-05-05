import { createContext, useContext, useState } from "react";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments([
      ...appointments,
      { ...appointment, id: Date.now(), status: "Pending" },
    ]);
  };

  const confirmAppointment = (id) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: "Confirmed" } : a,
      ),
    );
  };

  const cancelAppointment = (id) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: "Cancelled" } : a,
      ),
    );
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        confirmAppointment,
        cancelAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
