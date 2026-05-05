import { useState } from "react";
import { usePharmacy } from "../context/PharmacyContext";

const Pharmacy = () => {
  const { medicines, addMedicine, deleteMedicine, updateStock } = usePharmacy();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: "",
    manufacturer: "",
  });

  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [restockId, setRestockId] = useState(null);
  const [restockQty, setRestockQty] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicine(formData);
    setSuccess(true);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      price: "",
      expiryDate: "",
      manufacturer: "",
    });
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleRestock = (id) => {
    if (restockQty) {
      updateStock(id, restockQty);
      setRestockId(null);
      setRestockQty("");
    }
  };

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const lowStock = medicines.filter((m) => Number(m.quantity) <= 10).length;
  const totalMedicines = medicines.length;
  const totalValue = medicines.reduce(
    (sum, m) => sum + Number(m.price) * Number(m.quantity),
    0,
  );

  const getStockBadge = (qty) => {
    if (qty <= 10) return "danger";
    if (qty <= 30) return "warning";
    return "success";
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">💊 Pharmacy</h4>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-primary text-white p-3">
            <p className="mb-1 small">Total Medicines</p>
            <h4 className="fw-bold">{totalMedicines}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-danger text-white p-3">
            <p className="mb-1 small">Low Stock Items</p>
            <h4 className="fw-bold">{lowStock}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-success text-white p-3">
            <p className="mb-1 small">Total Stock Value</p>
            <h4 className="fw-bold">₹{totalValue}</h4>
          </div>
        </div>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ Medicine added successfully!
        </div>
      )}

      {/* Add Medicine Form */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <h6 className="fw-semibold mb-3 text-primary">Add New Medicine</h6>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Medicine Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter medicine name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option>Antibiotic</option>
                <option>Painkiller</option>
                <option>Antiviral</option>
                <option>Antifungal</option>
                <option>Vitamin</option>
                <option>Syrup</option>
                <option>Injection</option>
                <option>Other</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                name="manufacturer"
                placeholder="Enter manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Price per unit (₹)</label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Expiry Date</label>
              <input
                type="date"
                className="form-control"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary px-4">
              💊 Add Medicine
            </button>
          </div>
        </form>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search medicine by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Medicine Table */}
      <div className="card border-0 shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold mb-0">Medicine Stock</h6>
          <span className="badge bg-primary">Total: {medicines.length}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: 50 }}>💊</div>
            <h5 className="mt-3 text-muted">No Medicines Found</h5>
            <p className="text-muted">Add medicines using the form above</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Manufacturer</th>
                  <th>Quantity</th>
                  <th>Price (₹)</th>
                  <th>Expiry Date</th>
                  <th>Stock Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, index) => (
                  <tr key={m.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{m.name}</td>
                    <td>{m.category}</td>
                    <td>{m.manufacturer}</td>
                    <td>{m.quantity}</td>
                    <td>₹{m.price}</td>
                    <td>{m.expiryDate}</td>
                    <td>
                      <span className={`badge bg-${getStockBadge(m.quantity)}`}>
                        {Number(m.quantity) <= 10
                          ? "Low Stock"
                          : Number(m.quantity) <= 30
                            ? "Medium"
                            : "In Stock"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1 align-items-center">
                        {restockId === m.id ? (
                          <>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 70 }}
                              placeholder="Qty"
                              value={restockQty}
                              onChange={(e) => setRestockQty(e.target.value)}
                            />
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleRestock(m.id)}
                            >
                              ✅
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => setRestockId(null)}
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setRestockId(m.id)}
                            >
                              📦 Restock
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteMedicine(m.id)}
                            >
                              🗑
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
