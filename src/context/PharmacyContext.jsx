import { createContext, useContext, useState } from "react";

const PharmacyContext = createContext();

export const PharmacyProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  // Add Medicine
  const addMedicine = (medicine) => {
    const newMedicine = {
      ...medicine,
      id: Date.now(),
    };

    setMedicines((prev) => [...prev, newMedicine]);
  };

  // Delete Medicine
  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  // Update Stock (Restock)
  const updateStock = (id, quantity) => {
    const qty = Number(quantity);

    if (qty <= 0) return; // prevent invalid input

    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              quantity: Number(m.quantity) + qty,
            }
          : m,
      ),
    );
  };

  return (
    <PharmacyContext.Provider
      value={{
        medicines,
        addMedicine,
        deleteMedicine,
        updateStock,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => useContext(PharmacyContext);
