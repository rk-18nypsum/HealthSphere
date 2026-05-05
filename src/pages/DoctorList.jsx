import { useState } from "react";
import { useDoctor } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const { doctors, deleteDoctor } = useDoctor();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">👨‍⚕️ Doctor List</h4>
          <span className="badge bg-success mt-1">
            Total: {doctors.length} Doctors
          </span>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-doctor")}
        >
          + Add New Doctor
        </button>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search doctor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm p-3">
        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: 50 }}>👨‍⚕️</div>
            <h5 className="mt-3 text-muted">No Doctors Found</h5>
            <p className="text-muted">Add a new doctor to see them here</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-doctor")}
            >
              + Add Doctor
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Specialization</th>
                  <th>Department</th>
                  <th>Experience</th>
                  <th>Qualification</th>
                  <th>Available Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, index) => (
                  <tr key={d.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{d.name}</td>
                    <td>{d.age}</td>
                    <td>{d.gender}</td>
                    <td>{d.phone}</td>
                    <td>{d.email}</td>
                    <td>
                      <span className="badge bg-primary">
                        {d.specialization}
                      </span>
                    </td>
                    <td>{d.department}</td>
                    <td>{d.experience} yrs</td>
                    <td>{d.qualification}</td>
                    <td>{d.availableDays}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteDoctor(d.id)}
                      >
                        🗑 Delete
                      </button>
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

export default DoctorList;
