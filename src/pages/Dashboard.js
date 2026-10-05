import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import api from "../api/api";

function Dashboard(){
    const [dashboardData, setDashnoardData] = useState(null);
    const [error, setError] = useState("");
    const colors = ["#3498db", "#2ecc71", "#e74c3c"];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get("/dashboard/");
                setDashnoardData(response.data);
            } catch (error) {
                setError("Unable to load dashboard data.");
            }
        };
        fetchDashboardData();
    }, []);
    if (error) {
        return <p>{error}</p>
    }
    if (!dashboardData) {
        return <p>Loading dashboard...</p>
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <div className="dashboard-cards">
            <div className="dashboard-card">
                <h3>Total Assets</h3>
                <p>{dashboardData.totalAssets}</p>
            </div>

            <div className="dashboard-card">
                <h3>Assigned Assets</h3>
                <p>{dashboardData.assignedAssets}</p>
            </div>

            <div className="dashboard-card">
                <h3>Available Assets</h3>
                <p>{dashboardData.availableAssets}</p>
            </div>

            <div className="dashboard-card">
                <h3>Under Repair</h3>
                <p>{dashboardData.repairAssets}</p>
            </div>
            </div>
            <h2>Asset Status</h2>
            <PieChart width={400} height={300}>
                <Pie
                    data={dashboardData.assetStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {dashboardData.assetStatus.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`}
                            fill={colors[index]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

export default Dashboard;