import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiTrendingUp } from 'react-icons/fi';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import DashboardCard from '../../components/dashboard/DashboardCard';
import EmissionsChart from '../../components/dashboard/EmissionsChart';
import AlertsTable from '../../components/dashboard/AlertsTable';
import RatingDisplay from '../../components/dashboard/RatingDisplay';

import NotificationBell from '../../components/NotificationBell';

import { generateMonthlyReportPDF } from '../../utils/generateMonthlyReportPDF';

const FactoryDashboard = () => {
  const { currentUser } = useAuth();
  const [factory, setFactory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [coLevel, setCoLevel] = useState(15);
  const [co2Level, setCo2Level] = useState(450);

  const dailyEmissions = [
    { time: '00:00', co: 210 }, { time: '01:00', co: 150 },

    { time: '02:00', co: 180 }, { time: '03:00', co: 160 },
    { time: '05:00', co: 200 }, { time: '06:00', co: 195 },
    { time: '07:00', co: 230 }, { time: '08:00', co: 234 },
    { time: '09:00', co: 163}, { time: '10:00', co: 95 },
    { time: '11:00', co: 108 }, { time: '12:00', co: 140 },
    { time: '13:00', co: 102 }, { time: '14:00', co: 120 },
    { time: '15:00', co: 100 }, { time: '16:00', co: 99 },
    { time: '17:00', co: 125 }, { time: '18:00', co: 163 },
    { time: '19:00', co: 109 }, { time: '20:00', co: 93 },
    { time: '21:00', co: 116 }, { time: '22:00', co: 123 },
    { time: '23:00', co: 110 }

  ];

  const weeklyEmissions = [
    { day: 'Mon', co: 140 }, { day: 'Tue', co: 175 },
    { day: 'Wed', co: 167 }, { day: 'Thu', co: 155 },
    { day: 'Fri', co: 199 }, { day: 'Sat', co: 172 },
    { day: 'Sun', co: 160 },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'CO levels approaching threshold', timestamp: new Date(2023, 4, 10, 14, 32) },
    { id: 2, type: 'danger', message: 'CO2 levels exceeded limit', timestamp: new Date(2023, 4, 9, 9, 15) },
    { id: 3, type: 'info', message: 'System maintenance scheduled', timestamp: new Date(2023, 4, 8, 11, 45) },
    { id: 4, type: 'success', message: 'Emissions below weekly average', timestamp: new Date(2023, 4, 7, 16, 20) },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCoLevel(prev => Math.max(5, Math.min(40, prev + (Math.random() * 2 - 1))));
      setCo2Level(prev => Math.max(350, Math.min(600, prev + (Math.random() * 10 - 5))));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchFactoryData = async () => {
      if (!currentUser) return;

      try {
        const factoryDoc = await getDoc(doc(db, 'factories', currentUser.uid));
        if (factoryDoc.exists()) {
          setFactory(factoryDoc.data());
        } else {
          console.error('No factory document found');
        }
      } catch (error) {
        console.error('Error fetching factory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactoryData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const coStatus = coLevel > 25 ? 'danger' : coLevel > 20 ? 'warning' : 'success';
  const co2Status = co2Level > 500 ? 'danger' : co2Level > 450 ? 'warning' : 'success';

  return (
    <div className="pt-20 pb-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 relative">
        {/* Notification Bell at top-right */}
        

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {factory?.name || 'Your Factory'} Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                {factory?.location || 'Location'} • {factory?.industry?.replace('_', ' ') || 'Industry'}
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
               <div className="relative">
                 <NotificationBell
                   scrolled={true}
                   onDownloadReport={() => generateMonthlyReportPDF(dailyEmissions, weeklyEmissions)}
                 />
               </div>

                  <RatingDisplay rating={factory?.rating || 4} />
              </div>
          </div>


          

          {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-stretch">
        <div className="flex flex-col justify-between w-full h-full min-h-[350px] bg-white rounded-xl shadow-md px-8 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
             Live CO Sensor Data
          </h2>
        

        <iframe width={"200px"}
         src="data mail.html"
         className="w-full h-full rounded-lg flex-grow"
         style={{ border: 'none' }}
         title="Live CO Sensor Data"
       />
  </div>

  <div className="h-full min-h-[350px]">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
             Daily Average Of CO
          </h2>
    
    <DashboardCard 
      title="Daily Average CO"
      value="220.5 ppm"
      status="success"
      icon={<FiTrendingUp />}
      change={{ value: "+5%", isIncrease: true }}
      footnote="vs. yesterday"
    />
  </div>
</div>


          



          {/* Firebase chart */}
          <div className="container mx-auto px-4 relative z-10 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Live CO Sensor Data using Graph</h2>
            <iframe
              src="/visualizechart.html"
              width="100%"
              height="600"
              style={{ border: 'none' }}
              title="My HTML Page"
           />
          </div> 

          {/* Emissions Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Emissions</h2>
              <EmissionsChart data={dailyEmissions} dataKeyX="time" />
              <div className="mt-4 text-sm text-gray-500">
                Updated: {format(new Date(), 'MMM d, yyyy HH:mm')}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Trend</h2>
              <EmissionsChart data={weeklyEmissions} dataKeyX="day" />
              <div className="mt-4 text-sm text-gray-500">
                Last 7 days
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
            </div>
            <div className="p-6">
              <AlertsTable alerts={alerts} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FactoryDashboard;
