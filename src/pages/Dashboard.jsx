import { DashboardProvider } from "../context/DashboardContext";
import StatCard from "../components/StatCard";
import BarChart from "../components/BarChart";
import AppointmentTable from "../components/AppointmentTable";
import RecentActivity from "../components/RecentActivity";

function Dashboard() {
  return (
    <DashboardProvider>
      <div className="p-4">
        <h4 className="fw-bold mb-4">🏥 Dashboard</h4>
        <StatCard />
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <BarChart />
          </div>
          <div className="col-md-4">
            <RecentActivity />
          </div>
        </div>
        <AppointmentTable />
      </div>
    </DashboardProvider>
  );
}

export default Dashboard;
