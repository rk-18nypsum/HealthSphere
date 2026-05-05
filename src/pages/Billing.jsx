import { useState } from "react";
import { useBilling } from "../context/BillingContext";
import { usePatient } from "../context/PatientContext";
import { useDoctor } from "../context/DoctorContext";

const Billing = () => {
  const { bills, addBill, markPaid, deleteBill } = useBilling();
  const { patients } = usePatient();
  const { doctors } = useDoctor();

  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    treatment: "",
    medicineCost: "",
    doctorFee: "",
    roomCharges: "",
  });

  const [success, setSuccess] = useState(false);

  const total =
    (Number(formData.medicineCost) || 0) +
    (Number(formData.doctorFee) || 0) +
    (Number(formData.roomCharges) || 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBill({ ...formData, total });
    setSuccess(true);
    setFormData({
      patientName: "",
      doctorName: "",
      treatment: "",
      medicineCost: "",
      doctorFee: "",
      roomCharges: "",
    });
    setTimeout(() => setSuccess(false), 2000);
  };

  const totalRevenue = bills
    .filter((b) => b.status === "Paid")
    .reduce((sum, b) => sum + b.total, 0);

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">🧾 Billing</h4>

      {/* Revenue Card */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-primary text-white p-3">
            <p className="mb-1 small">Total Bills</p>
            <h4 className="fw-bold">{bills.length}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-success text-white p-3">
            <p className="mb-1 small">Paid Bills</p>
            <h4 className="fw-bold">
              {bills.filter((b) => b.status === "Paid").length}
            </h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-danger text-white p-3">
            <p className="mb-1 small">Unpaid Bills</p>
            <h4 className="fw-bold">
              {bills.filter((b) => b.status === "Unpaid").length}
            </h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-warning text-white p-3">
            <p className="mb-1 small">Total Revenue</p>
            <h4 className="fw-bold">₹{totalRevenue}</h4>
          </div>
        </div>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ Bill generated successfully!
        </div>
      )}

      {/* Generate Bill Form */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <h6 className="fw-semibold mb-3 text-primary">Generate New Bill</h6>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Select Patient</label>
              <select
                className="form-select"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              >
                <option value="">Select Patient</option>
                {patients.length === 0 ? (
                  <option disabled>No patients added yet</option>
                ) : (
                  patients.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Select Doctor</label>
              <select
                className="form-select"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.length === 0 ? (
                  <option disabled>No doctors added yet</option>
                ) : (
                  doctors.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Treatment</label>
              <input
                type="text"
                className="form-control"
                name="treatment"
                placeholder="Enter treatment"
                value={formData.treatment}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Medicine Cost (₹)</label>
              <input
                type="number"
                className="form-control"
                name="medicineCost"
                placeholder="0"
                value={formData.medicineCost}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Doctor Fee (₹)</label>
              <input
                type="number"
                className="form-control"
                name="doctorFee"
                placeholder="0"
                value={formData.doctorFee}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Room Charges (₹)</label>
              <input
                type="number"
                className="form-control"
                name="roomCharges"
                placeholder="0"
                value={formData.roomCharges}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Total Amount (₹)</label>
              <input
                type="text"
                className="form-control fw-bold text-success"
                value={`₹${total}`}
                readOnly
              />
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary px-4">
              🧾 Generate Bill
            </button>
          </div>
        </form>
      </div>

      {/* Bills Table */}
      <div className="card border-0 shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold mb-0">All Bills</h6>
          <span className="badge bg-primary">Total: {bills.length}</span>
        </div>

        {bills.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: 50 }}>🧾</div>
            <h5 className="mt-3 text-muted">No Bills Generated Yet</h5>
            <p className="text-muted">Generate a bill using the form above</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Treatment</th>
                  <th>Medicine (₹)</th>
                  <th>Doctor Fee (₹)</th>
                  <th>Room (₹)</th>
                  <th>Total (₹)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b, index) => (
                  <tr key={b.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{b.patientName}</td>
                    <td>{b.doctorName}</td>
                    <td>{b.treatment}</td>
                    <td>₹{b.medicineCost || 0}</td>
                    <td>₹{b.doctorFee || 0}</td>
                    <td>₹{b.roomCharges || 0}</td>
                    <td className="fw-bold text-success">₹{b.total}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          b.status === "Paid" ? "success" : "danger"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => markPaid(b.id)}
                          disabled={b.status === "Paid"}
                        >
                          ✅ Paid
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBill(b.id)}
                        >
                          🗑
                        </button>
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

export default Billing;
