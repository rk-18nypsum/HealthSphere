import { useState } from "react";
import { usePatient } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const { patients, deletePatient } = usePatient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">🧑‍⚕️ Patient List</h4>
          <span className="badge bg-primary mt-1">
            Total: {patients.length} Patients
          </span>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-patient")}
        >
          + Add New Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search patient by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm p-3">
        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: 50 }}>🏥</div>
            <h5 className="mt-3 text-muted">No Patients Found</h5>
            <p className="text-muted">Add a new patient to see them here</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-patient")}
            >
              + Add Patient
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
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Disease</th>
                  <th>Doctor</th>
                  <th>Ward</th>
                  <th>Admission Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>
                      <span className="badge bg-danger">{p.bloodGroup}</span>
                    </td>
                    <td>{p.phone}</td>
                    <td>{p.disease}</td>
                    <td>{p.doctor}</td>
                    <td>{p.ward}</td>
                    <td>{p.admissionDate}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deletePatient(p.id)}
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

export default PatientList;
