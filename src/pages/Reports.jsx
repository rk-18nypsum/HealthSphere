import { usePatient } from "../context/PatientContext";
import { useDoctor } from "../context/DoctorContext";
import { useAppointment } from "../context/AppointmentContext";
import { useBilling } from "../context/BillingContext";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

const Reports = () => {
  const { patients } = usePatient();
  const { doctors } = useDoctor();
  const { appointments } = useAppointment();
  const { bills } = useBilling();

  const totalRevenue = bills
    .filter((b) => b.status === "Paid")
    .reduce((sum, b) => sum + b.total, 0);

  // Bar Chart — appointments by status
  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
  const pending = appointments.filter((a) => a.status === "Pending").length;
  const cancelled = appointments.filter((a) => a.status === "Cancelled").length;

  const barData = {
    labels: ["Confirmed", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Appointments",
        data: [confirmed, pending, cancelled],
        backgroundColor: ["#34a853", "#fbbc04", "#ea4335"],
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
      x: { grid: { display: false } },
    },
  };

  // Pie Chart — patients by gender
  const male = patients.filter((p) => p.gender === "Male").length;
  const female = patients.filter((p) => p.gender === "Female").length;
  const other = patients.filter((p) => p.gender === "Other").length;

  const pieData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [male, female, other],
        backgroundColor: ["#4f8ef7", "#ea4335", "#fbbc04"],
        borderWidth: 1,
      },
    ],
  };

  const getBadge = (status) => {
    if (status === "Confirmed") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">📊 Reports</h4>

      {/* Summary Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-primary text-white p-3">
            <p className="mb-1 small">Total Patients</p>
            <h4 className="fw-bold">{patients.length}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-success text-white p-3">
            <p className="mb-1 small">Total Doctors</p>
            <h4 className="fw-bold">{doctors.length}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-warning text-white p-3">
            <p className="mb-1 small">Total Appointments</p>
            <h4 className="fw-bold">{appointments.length}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-danger text-white p-3">
            <p className="mb-1 small">Total Revenue</p>
            <h4 className="fw-bold">₹{totalRevenue}</h4>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-3 mb-4">
        {/* Bar Chart */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h6 className="fw-semibold mb-3">Appointments by Status</h6>
            {appointments.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <div style={{ fontSize: 40 }}>📅</div>
                <p className="mt-2">No appointments data yet</p>
              </div>
            ) : (
              <Bar data={barData} options={barOptions} />
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h6 className="fw-semibold mb-3">Patients by Gender</h6>
            {patients.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <div style={{ fontSize: 40 }}>🧑‍⚕️</div>
                <p className="mt-2">No patients data yet</p>
              </div>
            ) : (
              <Pie data={pieData} />
            )}
          </div>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <h6 className="fw-semibold mb-3">Recent Patients</h6>
        {patients.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <div style={{ fontSize: 40 }}>🧑‍⚕️</div>
            <p className="mt-2">No patients added yet</p>
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
                  <th>Disease</th>
                  <th>Doctor</th>
                  <th>Admission Date</th>
                </tr>
              </thead>
              <tbody>
                {patients
                  .slice(-5)
                  .reverse()
                  .map((p, index) => (
                    <tr key={p.id}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.gender}</td>
                      <td>
                        <span className="badge bg-danger">{p.bloodGroup}</span>
                      </td>
                      <td>{p.disease}</td>
                      <td>{p.doctor}</td>
                      <td>{p.admissionDate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Appointments */}
      <div className="card border-0 shadow-sm p-3">
        <h6 className="fw-semibold mb-3">Recent Appointments</h6>
        {appointments.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <div style={{ fontSize: 40 }}>📅</div>
            <p className="mt-2">No appointments added yet</p>
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .slice(-5)
                  .reverse()
                  .map((a, index) => (
                    <tr key={a.id}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{a.patientName}</td>
                      <td>{a.doctorName}</td>
                      <td>{a.department}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>
                      <td>
                        <span className={`badge bg-${getBadge(a.status)}`}>
                          {a.status}
                        </span>
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

export default Reports;
