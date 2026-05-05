import { useDashboard } from "../context/DashboardContext";

function StatCard() {
  const { patients, doctors } = useDashboard();

  const stats = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: "🧑‍⚕️",
      bg: "primary",
    },
    {
      label: "Total Doctors",
      value: doctors.length,
      icon: "👨‍⚕️",
      bg: "success",
    },
    {
      label: "Appointments Today",
      value: patients.length,
      icon: "📅",
      bg: "warning",
    },
    { label: "Revenue", value: "₹2.4L", icon: "💊", bg: "danger" },
  ];

  return (
    <div className="row g-3 mb-4">
      {stats.map((stat, index) => (
        <div className="col-md-3" key={index}>
          <div className={`card border-0 shadow-sm text-white bg-${stat.bg}`}>
            <div className="card-body">
              <div className="fs-3">{stat.icon}</div>
              <h3 className="fw-bold mt-2">{stat.value}</h3>
              <p className="mb-0 small">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCard;
