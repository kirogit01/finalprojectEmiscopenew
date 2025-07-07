// src/NotificationBell.jsx
import { useState } from 'react';
import { FiBell } from 'react-icons/fi';

const NotificationBell = ({ scrolled, onDownloadReport }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (index) => {
    if (index === 0 && typeof onDownloadReport === 'function') {
      onDownloadReport(); // Trigger PDF generation
    }
  };

  return (
    <div className="relative">
      <button onClick={handleClick} className="relative" aria-label="Notifications">
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
            {[
              'Monthly report is available for download',
              'New emission reduction techniques available',
              'Your factory rating has improved',
            ].map((message, index) => (
              <li
                key={index}
                className="px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50"
                onClick={() => handleNotificationClick(index)}
              >
                <p>{message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {['May 10, 2023 09:00', 'May 9, 2023 14:30', 'May 7, 2023 10:15'][index]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
