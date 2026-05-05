import { useState } from "react";
import { usePatient } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const { addPatient } = usePatient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    disease: "",
    doctor: "",
    ward: "",
    address: "",
    admissionDate: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatient(formData);
    setSuccess(true);
    setTimeout(() => {
      navigate("/patient-list");
    }, 1500);
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">🧑‍⚕️ Add New Patient</h4>

      {success && (
        <div className="alert alert-success">
          ✅ Patient added successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3 text-primary">
            Personal Information
          </h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Blood Group</label>
              <select
                className="form-select"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Admission Date</label>
              <input
                type="date"
                className="form-control"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows="2"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Medical Info */}
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3 text-primary">Medical Information</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Disease / Problem</label>
              <input
                type="text"
                className="form-control"
                name="disease"
                placeholder="Enter disease or problem"
                value={formData.disease}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Assigned Doctor</label>
              <select
                className="form-select"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                <option>Dr. Sharma</option>
                <option>Dr. Mehta</option>
                <option>Dr. Patel</option>
                <option>Dr. Rao</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Ward / Room No</label>
              <input
                type="text"
                className="form-control"
                name="ward"
                placeholder="e.g. Ward 3 / Room 101"
                value={formData.ward}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-primary px-4">
            ✅ Add Patient
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/patient-list")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
