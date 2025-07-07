import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiBarChart2, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';

const DashboardQuickActions = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    const blob = new Blob([
      'Factory Report\nGenerated on: ' + new Date().toLocaleString()
    ], { type: 'text/plain;charset=utf-8' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'monthly_report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddFactory = () => {
    setAddModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setAddModalOpen(false);
    alert('New factory added (mock).');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button
          className="w-full text-left px-4 py-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 flex items-center"
          onClick={handleAddFactory}
        >
          <FiUsers className="mr-3" />
          Add New Factory
        </button>
        <button
          className="w-full text-left px-4 py-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 flex items-center"
          onClick={handleGenerateReport}
        >
          <FiBarChart2 className="mr-3" />
          Generate Monthly Report
        </button>
        <button
          className="w-full text-left px-4 py-3 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 flex items-center"
          onClick={() => navigate('/update-locations')}
        >
          <FiMapPin className="mr-3" />
          Update Location Data
        </button>
        <button
          className="w-full text-left px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 flex items-center"
          onClick={() => navigate('/alerts/thresholds')}
        >
          <FiAlertCircle className="mr-3" />
          Manage Alert Thresholds
        </button>
      </div>

      {/* Add New Factory Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setAddModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white p-6 rounded shadow-lg z-50 max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-4">Add New Factory</Dialog.Title>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Factory Name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Location"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Industry"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 text-gray-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                  Add Factory
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DashboardQuickActions;
