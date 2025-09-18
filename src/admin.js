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

const BusSevaManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data
  const busData = [
    {
      number: "UP 32 AB 1234",
      route: "Delhi - Agra",
      driver: "राम कुमार",
      status: "ACTIVE",
      occupancy: 95,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "MAINTENANCE":
        return "bg-orange-100 text-orange-800";
      case "GHOST BUS":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 80) return "bg-red-500";
    if (occupancy >= 50) return "bg-green-500";
    return "bg-gray-300";
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${color} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("border-l-", "bg-")
            .replace("-500", "-100")}`}
        >
          <Icon
            className={`h-6 w-6 ${color
              .replace("border-l-", "text-")
              .replace("-500", "-600")}`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Bus className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">BusSeva</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">Welcome back, Admin</div>
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Bus</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
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
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              BusSeva Dashboard
            </h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Buses"
              value="24"
              icon={Bus}
              color="border-l-blue-500"
            />
            <StatCard
              title="Active Drivers"
              value="18"
              icon={Users}
              color="border-l-green-500"
            />
            <StatCard
              title="Ghost Buses"
              value="3"
              icon={AlertTriangle}
              color="border-l-red-500"
            />
            <StatCard
              title="Today's Revenue"
              value="₹45K"
              icon={TrendingUp}
              color="border-l-purple-500"
            />
          </div>

          {/* Live Bus Status */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Live Bus Status
                </h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bus Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Occupancy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {busData.map((bus, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bus.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bus.route}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bus.driver}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            bus.status
                          )}`}
                        >
                          {bus.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${getOccupancyColor(
                                bus.occupancy
                              )}`}
                              style={{ width: `${bus.occupancy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {bus.occupancy}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bus.lastUpdate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Alerts
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        alert.type === "ghost" ? "bg-red-500" : "bg-orange-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusSevaManagementDashboard;
