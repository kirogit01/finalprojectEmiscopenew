import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { database, ref, onValue } from '../firebaseConfig';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const FirebaseLineChart = () => {
  const [labels, setLabels] = useState([]);
  const [floatDataPoints, setFloatDataPoints] = useState([]);
  const [intDataPoints, setIntDataPoints] = useState([]);
  const [stringValue, setStringValue] = useState('');

  useEffect(() => {
    const testRef = ref(database, 'sensorData/test');

    const unsubscribe = onValue(testRef, (snapshot) => {
      const currentData = snapshot.val();
      const currentTime = new Date().toLocaleTimeString();

      if (currentData) {
        if (typeof currentData.float === 'number' && typeof currentData.int === 'number') {
          // Show latest values only
          setLabels([currentTime]);
          setFloatDataPoints([currentData.float]);
          setIntDataPoints([currentData.int]);
        }

        if (typeof currentData.string === 'string') {
          setStringValue(currentData.string);
        }
      } else {
        setLabels([]);
        setFloatDataPoints([]);
        setIntDataPoints([]);
        setStringValue('');
      }
    }, (error) => {
      console.error("Error fetching data:", error);
    });

    return () => unsubscribe();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Float Value',
        data: floatDataPoints,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Integer Value',
        data: intDataPoints,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: false,
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Live Sensor Data (Float & Int)' },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Sensor Value' } },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Realtime Sensor Chart</h2>
      <div className="mb-4 text-lg">
        <strong>String Value:</strong> {stringValue || 'N/A'}
      </div>
      <div style={{ height: '400px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FirebaseLineChart;
