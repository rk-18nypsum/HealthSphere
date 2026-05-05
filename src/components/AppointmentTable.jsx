import { useDashboard } from "../context/DashboardContext";

function AppointmentTable() {
  const { patients } = useDashboard();

  const getBadge = (status) => {
    if (status === "Confirmed") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <div className="card border-0 shadow-sm p-3 mb-4">
      <h6 className="fw-semibold mb-3">Today's Appointments</h6>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.doctor}</td>
              <td>{p.department}</td>
              <td>{p.time}</td>
              <td>
                <span className={`badge bg-${getBadge(p.status)}`}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
