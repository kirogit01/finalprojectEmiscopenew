import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiUsers, FiBarChart2, FiAlertCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Example data
  const totalFactories = 1;
  const avgCOLevel = 18.3;
  const alertFactories = 0;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 pb-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitoring all factories in Sri Lanka</p>
          </div>
          <p className="text-gray-500 text-sm">
            Last updated: <span className="font-semibold">{currentTime.toDateString()} {currentTime.toLocaleTimeString()}</span>
          </p>
        </div>

        {/* Factory Table */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-200 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-6">Factory Name</th>
                <th className="py-3 px-6">Dashboard</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3 px-6">F1 Factory</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => navigate('/factory-dashboard')}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                  >
                    Click Dashboard
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <FiUsers className="text-green-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Total Factories</h2>
            <p className="text-3xl font-bold text-gray-900">{totalFactories}</p>
            <p className="text-sm text-gray-500">Registered in system</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-4">
              <FiBarChart2 className="text-yellow-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Average CO Level</h2>
            <p className="text-3xl font-bold text-yellow-600">{avgCOLevel} ppm</p>
            <p className="text-sm text-red-500 mt-2">↗ +2%</p>
            <p className="text-sm text-gray-500">vs. last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <FiAlertCircle className="text-red-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Alert Factories</h2>
            <p className="text-3xl font-bold text-red-600">{alertFactories}</p>
            <p className="text-sm text-gray-500">Requiring attention</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
