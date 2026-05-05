import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [patients] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      doctor: "Dr. Sharma",
      department: "Cardiology",
      time: "09:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Priya Singh",
      doctor: "Dr. Mehta",
      department: "Neurology",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      id: 3,
      name: "Amit Verma",
      doctor: "Dr. Patel",
      department: "Orthopedics",
      time: "11:15 AM",
      status: "Confirmed",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      doctor: "Dr. Rao",
      department: "Pediatrics",
      time: "02:00 PM",
      status: "Cancelled",
    },
  ]);

  const [doctors] = useState([
    { id: 1, name: "Dr. Sharma" },
    { id: 2, name: "Dr. Mehta" },
    { id: 3, name: "Dr. Patel" },
    { id: 4, name: "Dr. Rao" },
  ]);

  const [weeklyData] = useState([40, 65, 50, 80, 60, 30, 20]);

  const [activities] = useState([
    {
      id: 1,
      text: "New patient Rahul Kumar registered",
      time: "2 mins ago",
      color: "#4f8ef7",
    },
    {
      id: 2,
      text: "Appointment confirmed for Priya Singh",
      time: "15 mins ago",
      color: "#34a853",
    },
    {
      id: 3,
      text: "Bill generated — ₹4,500 for Amit Verma",
      time: "1 hour ago",
      color: "#fbbc04",
    },
    {
      id: 4,
      text: "Pharmacy stock low — Paracetamol",
      time: "3 hours ago",
      color: "#ea4335",
    },
  ]);

  return (
    <DashboardContext.Provider
      value={{ patients, doctors, weeklyData, activities }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
