import { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { api } from "../../services/api"; 

const Dashboard = () => {
  const [stats, setStats] = useState({ totalBooks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/books"); 
        setStats({ totalBooks: response.data.length });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaBook />
          </div>
          <div className="stat-info">
            <h3>Total Books</h3>
            <p>{loading ? "..." : stats.totalBooks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
