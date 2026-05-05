import { useDashboard } from "../context/DashboardContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart() {
  const { weeklyData } = useDashboard();

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: weeklyData,
        backgroundColor: "#4f8ef7",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="card border-0 shadow-sm p-3 h-100">
      <h6 className="fw-semibold mb-3">Weekly Appointments</h6>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
