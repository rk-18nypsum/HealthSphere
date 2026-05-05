import { useState } from "react";
import { useAppointment } from "../context/AppointmentContext";
import { usePatient } from "../context/PatientContext";
import { useDoctor } from "../context/DoctorContext";

const Appointment = () => {
  const {
    appointments,
    addAppointment,
    confirmAppointment,
    cancelAppointment,
    deleteAppointment,
  } = useAppointment();
  const { patients } = usePatient();
  const { doctors } = useDoctor();

  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    department: "",
    date: "",
    time: "",
    notes: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e) => {
    const selectedDoctor = doctors.find((d) => d.name === e.target.value);
    setFormData({
      ...formData,
      doctorName: e.target.value,
      department: selectedDoctor ? selectedDoctor.department : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);
    setSuccess(true);
    setFormData({
      patientName: "",
      doctorName: "",
      department: "",
      date: "",
      time: "",
      notes: "",
    });
    setTimeout(() => setSuccess(false), 2000);
  };

  const getBadge = (status) => {
    if (status === "Confirmed") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">📅 Appointments</h4>

      {success && (
        <div className="alert alert-success">
          ✅ Appointment booked successfully!
        </div>
      )}

      {/* Book Appointment Form */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <h6 className="fw-semibold mb-3 text-primary">Book New Appointment</h6>
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
                onChange={handleDoctorChange}
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
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                name="department"
                value={formData.department}
                placeholder="Auto filled from doctor"
                readOnly
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Notes</label>
              <input
                type="text"
                className="form-control"
                name="notes"
                placeholder="Optional notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary px-4">
              📅 Book Appointment
            </button>
          </div>
        </form>
      </div>

      {/* Appointments Table */}
      <div className="card border-0 shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold mb-0">All Appointments</h6>
          <span className="badge bg-primary">Total: {appointments.length}</span>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: 50 }}>📅</div>
            <h5 className="mt-3 text-muted">No Appointments Yet</h5>
            <p className="text-muted">
              Book an appointment using the form above
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, index) => (
                  <tr key={a.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{a.patientName}</td>
                    <td>{a.doctorName}</td>
                    <td>{a.department}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>{a.notes || "—"}</td>
                    <td>
                      <span className={`badge bg-${getBadge(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => confirmAppointment(a.id)}
                          disabled={a.status === "Confirmed"}
                        ></button>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => cancelAppointment(a.id)}
                          disabled={a.status === "Cancelled"}
                        ></button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteAppointment(a.id)}
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

export default Appointment;
