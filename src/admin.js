import React, { useState } from "react";
import {
  Bus,
  Users,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Settings,
  Plus,
  Bell,
  BarChart3,
  Route,
  UserCheck,
  AlertCircle,
  Clock,
} from "lucide-react";
import "./admin.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data
  const busData = [
    {
      number: "UP 32 AB 1234",
      route: "Delhi - Agra",
      driver: "राम कुमार",
      status: "ACTIVE",
      occupancy: 85,
      lastUpdate: "2 mins ago",
    },
    {
      number: "UP 14 CD 5678",
      route: "Lucknow - Kanpur",
      driver: "अमित शर्मा",
      status: "MAINTENANCE",
      occupancy: 0,
      lastUpdate: "1 hour ago",
    },
    {
      number: "UP 25 EF 9012",
      route: "Varanasi - Allahabad",
      driver: "विकाश सिंह",
      status: "GHOST BUS",
      occupancy: 45,
      lastUpdate: "15 mins ago",
    },
  ];

  const alerts = [
    {
      type: "ghost",
      message:
        "Bus UP 25 EF 9012 showing ghost activity - Location mismatch detected",
      time: "5 mins ago",
    },
    {
      type: "maintenance",
      message: "Engine issue reported for Bus UP 14 CD 5678",
      time: "1 hour ago",
    },
  ];

  const getStatusColorClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "status-active";
      case "MAINTENANCE":
        return "status-maintenance";
      case "GHOST BUS":
        return "status-ghost";
      default:
        return "";
    }
  };

  const getOccupancyColorClass = (occupancy) => {
    if (occupancy >= 80) return "occupancy-high";
    if (occupancy >= 50) return "occupancy-medium";
    return "";
  };

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className="stat-card">
      <p className="stat-card-title">{title}</p>
      <div className="stat-card-content">
        <p className="stat-card-value">{value}</p>
        <div className="stat-card-icon-container">
          <Icon className="stat-card-icon" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header-container">
        <div className="header-logo">
          <div className="logo-icon-bg">
            <Bus size={20} color="#fff" />
          </div>
          <h1 className="logo-text">BusSeva</h1>
        </div>
        <div className="header-actions">
          <div className="welcome-text">Welcome back, Admin</div>
          <div className="notification-bell">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </div>
          <button className="add-bus-btn">
            <Plus size={16} />
            <span>Add Bus</span>
          </button>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <ul className="sidebar-nav">
              {[
                { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                { id: "buses", label: "Bus Management", icon: Bus },
                { id: "drivers", label: "Driver Management", icon: UserCheck },
                { id: "routes", label: "Route Management", icon: Route },
                {
                  id: "alerts",
                  label: "Alerts & Reports",
                  icon: AlertTriangle,
                },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => (
                <li key={item.id} className="sidebar-nav-item">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={activeTab === item.id ? "active" : ""}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h2 className="dashboard-title">BusSeva Dashboard</h2>

          {/* Stats Cards */}
          <div className="stats-grid">
            <StatCard title="Total Buses" value="24" icon={Bus} />
            <StatCard title="Active Drivers" value="18" icon={Users} />
            <StatCard title="Ghost Buses" value="3" icon={AlertTriangle} />
            <StatCard title="Today's Revenue" value="₹45K" icon={TrendingUp} />
          </div>

          {/* Live Bus Status */}
          <div className="live-status-card">
            <div className="card-header">
              <div className="card-title-group">
                <MapPin size={20} color="#dc2626" />
                <h3>Live Bus Status</h3>
              </div>
            </div>
            <div className="table-responsive">
              <table className="bus-table">
                <thead>
                  <tr>
                    <th>Bus Number</th>
                    <th>Route</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th>Occupancy</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {busData.map((bus, index) => (
                    <tr key={index}>
                      <td>{bus.number}</td>
                      <td>{bus.route}</td>
                      <td>{bus.driver}</td>
                      <td>
                        <span
                          className={`status-pill ${getStatusColorClass(
                            bus.status
                          )}`}
                        >
                          {bus.status}
                        </span>
                      </td>
                      <td>
                        <div className="occupancy-cell">
                          <div className="occupancy-bar-container">
                            <div
                              className={`occupancy-bar ${getOccupancyColorClass(
                                bus.occupancy
                              )}`}
                              style={{ width: `${bus.occupancy}%` }}
                            ></div>
                          </div>
                          <span>{bus.occupancy}%</span>
                        </div>
                      </td>
                      <td>{bus.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="alerts-card">
            <div className="card-header">
              <div className="card-title-group">
                <AlertCircle size={20} color="#dc2626" />
                <h3>Recent Alerts</h3>
              </div>
            </div>
            <div className="alerts-list">
              {alerts.map((alert, index) => (
                <div key={index} className="alert-item">
                  <div
                    className={`alert-dot ${
                      alert.type === "ghost" ? "dot-ghost" : "dot-maintenance"
                    }`}
                  ></div>
                  <div className="alert-content">
                    <p className="alert-message">{alert.message}</p>
                    <div className="alert-time">
                      <Clock size={12} />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

function BusSevaManagementDashboard() {
  return <Dashboard />;
}

export default BusSevaManagementDashboard;
