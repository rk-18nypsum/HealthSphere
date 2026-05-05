import { useState } from "react";
import { useDoctor } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const { addDoctor } = useDoctor();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    specialization: "",
    department: "",
    experience: "",
    qualification: "",
    availableDays: "",
    joiningDate: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor(formData);
    setSuccess(true);
    setTimeout(() => {
      navigate("/doctor-list");
    }, 1500);
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">👨‍⚕️ Add New Doctor</h4>

      {success && (
        <div className="alert alert-success">
          ✅ Doctor added successfully! Redirecting...
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
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Joining Date</label>
              <input
                type="date"
                className="form-control"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h6 className="fw-semibold mb-3 text-primary">
            Professional Information
          </h6>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Specialization</label>
              <select
                className="form-select"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <option value="">Select Specialization</option>
                <option>Cardiologist</option>
                <option>Neurologist</option>
                <option>Orthopedic</option>
                <option>Pediatrician</option>
                <option>Dermatologist</option>
                <option>Surgeon</option>
                <option>Dentist</option>
                <option>General Physician</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
                <option>Surgery</option>
                <option>Dentistry</option>
                <option>General</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Experience (Years)</label>
              <input
                type="number"
                className="form-control"
                name="experience"
                placeholder="Enter years of experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Qualification</label>
              <input
                type="text"
                className="form-control"
                name="qualification"
                placeholder="e.g. MBBS, MD"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Available Days</label>
              <select
                className="form-select"
                name="availableDays"
                value={formData.availableDays}
                onChange={handleChange}
                required
              >
                <option value="">Select Available Days</option>
                <option>Mon - Fri</option>
                <option>Mon - Sat</option>
                <option>Weekends Only</option>
                <option>All Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-primary px-4">
            ✅ Add Doctor
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={() => navigate("/doctor-list")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
