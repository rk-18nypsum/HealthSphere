import { FaHeartPulse } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        {/* Logo + Name */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 text-white text-decoration-none"
        >
          <FaHeartPulse size={28} />
          <span className="fw-bold fs-4">HealthSphere</span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav ms-auto d-flex flex-row gap-3">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/doctor-list">
              Doctors
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/patient-list">
              Patients
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
