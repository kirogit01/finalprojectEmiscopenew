import { useState } from 'react';
import { FiBell } from 'react-icons/fi';

const NotificationDropdown = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleBellClick}
        type="button"
        className="relative"
        aria-label="Notifications"
      >
        <FiBell
          className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`}
        />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
          3
        </span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-3 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2 px-4 font-semibold text-gray-800 border-b">Notifications</div>
          <ul className="divide-y divide-gray-100">
            <li className="px-4 py-3 text-sm text-gray-800">
              <p>day report is available for download</p>
              <p className="text-xs text-gray-500 mt-1">July 8, 2025 12:15</p>
            </li>
            <li className="px-4 py-3 text-sm text-gray-800">
              <p>New emission reduction techniques available</p>
              <p className="text-xs text-gray-500 mt-1">July 8, 2025 12:16</p>
            </li>
            <li className="px-4 py-3 text-sm text-gray-800">
              <p>Your factory rating has improved</p>
              <p className="text-xs text-gray-500 mt-1">July8 7, 2025 12:17</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
