import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiBarChart2, FiAlertCircle, FiPlus, FiFileText } from 'react-icons/fi';
import { generateMonthlyReportPDF } from '../../utils/generateMonthlyReportPDF';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    factoryName: '',
    ownerName: '',
    location: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateFactory = () => {
    console.log("Factory created:", formData);
    setFormData({ factoryName: '', ownerName: '', location: '' });
    setShowForm(false);
    alert("Factory created successfully (dummy)");
  };

  const dummyDailyEmissions = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    co: Math.floor(Math.random() * 100 + 50),
  }));

  const dummyWeeklyEmissions = [
    { day: 'Mon', co: 140 },
    { day: 'Tue', co: 175 },
    { day: 'Wed', co: 167 },
    { day: 'Thu', co: 155 },
    { day: 'Fri', co: 199 },
    { day: 'Sat', co: 175 },
    { day: 'Sun', co: 160 },
  ];

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

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <FiUsers className="text-green-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Total Factories</h2>
            <p className="text-3xl font-bold text-gray-900">1</p>
            <p className="text-sm text-gray-500">Registered in system</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-4">
              <FiBarChart2 className="text-yellow-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Average CO Level</h2>
            <p className="text-3xl font-bold text-yellow-600">183 ppm</p>
            <p className="text-sm text-red-500 mt-2">↗ +2%</p>
            <p className="text-sm text-gray-500">vs. last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <FiAlertCircle className="text-red-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Alert Factories</h2>
            <p className="text-3xl font-bold text-red-600">0</p>
            <p className="text-sm text-gray-500">Requiring attention</p>
          </div>
        </div>

        {/* Additional Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add New Factory */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
              <FiPlus className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Add New Factory</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add Factory
            </button>

            {showForm && (
              <div className="mt-4 text-left">
                <input
                  type="text"
                  name="factoryName"
                  placeholder="Factory Name"
                  className="block w-full border p-2 rounded mb-2"
                  value={formData.factoryName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner Name"
                  className="block w-full border p-2 rounded mb-2"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Factory Location"
                  className="block w-full border p-2 rounded mb-2"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                <button
                  onClick={handleCreateFactory}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          {/* Monthly Report PDF */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
              <FiFileText className="text-purple-600 text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Monthly Report</h2>
            <button
              onClick={() =>
                generateMonthlyReportPDF(dummyDailyEmissions, dummyWeeklyEmissions)
              }
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
