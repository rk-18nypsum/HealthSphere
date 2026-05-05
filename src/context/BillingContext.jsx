import { createContext, useContext, useState } from "react";

const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [bills, setBills] = useState([]);

  const addBill = (bill) => {
    setBills([...bills, { ...bill, id: Date.now(), status: "Unpaid" }]);
  };

  const markPaid = (id) => {
    setBills(bills.map((b) => (b.id === id ? { ...b, status: "Paid" } : b)));
  };

  const deleteBill = (id) => {
    setBills(bills.filter((b) => b.id !== id));
  };

  return (
    <BillingContext.Provider value={{ bills, addBill, markPaid, deleteBill }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => useContext(BillingContext);
