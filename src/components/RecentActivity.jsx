import { useDashboard } from "../context/DashboardContext";

function RecentActivity() {
  const { activities } = useDashboard();

  return (
    <div className="card border-0 shadow-sm p-3 h-100">
      <h6 className="fw-semibold mb-3">Recent Activity</h6>
      {activities.map((a) => (
        <div key={a.id} className="d-flex align-items-start gap-2 mb-3">
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: a.color,
              marginTop: 5,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 13 }}>{a.text}</div>
            <div className="text-muted" style={{ fontSize: 11 }}>
              {a.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;
