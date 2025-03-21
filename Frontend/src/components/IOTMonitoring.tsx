
import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Droplet, 
  Droplets,
  ChartLine 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '../contexts/LanguageContext';

// Sample data - in a real app, this would come from your API
const generateMockData = (hours = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round((22 + Math.sin(i/3) * 5) * 10) / 10,
      humidity: Math.round((60 + Math.cos(i/4) * 15) * 10) / 10,
      soilMoisture: Math.round((50 + Math.sin(i/5) * 20) * 10) / 10,
    });
  }
  
  return data;
};

const IOTMonitoring = () => {
  const { t, language } = useLanguage();
  const [sensorData, setSensorData] = useState(generateMockData());
  const [currentReadings, setCurrentReadings] = useState({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0
  });

  // Simulate receiving real-time data
  useEffect(() => {
    const updateInterval = setInterval(() => {
      const latestData = [...sensorData];
      const now = new Date();
      
      // Update the latest reading
      const newReading = {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round((22 + Math.sin(Date.now()/10000000) * 5) * 10) / 10,
        humidity: Math.round((60 + Math.cos(Date.now()/12000000) * 15) * 10) / 10,
        soilMoisture: Math.round((50 + Math.sin(Date.now()/15000000) * 20) * 10) / 10,
      };
      
      // Remove oldest data point and add new one
      latestData.shift();
      latestData.push(newReading);
      
      setSensorData(latestData);
      setCurrentReadings({
        temperature: newReading.temperature,
        humidity: newReading.humidity,
        soilMoisture: newReading.soilMoisture
      });
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(updateInterval);
  }, [sensorData]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const gaugeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 }
    }
  };

  // Helper function to determine colors based on values
  const getTemperatureColor = (temp) => {
    if (temp < 15) return "#3b82f6"; // Cool blue
    if (temp > 30) return "#ef4444"; // Hot red
    return "#84cc16"; // Moderate green
  };

  const getHumidityColor = (humidity) => {
    if (humidity < 30) return "#ef4444"; // Dry - red
    if (humidity > 70) return "#3b82f6"; // Very humid - blue
    return "#84cc16"; // Moderate - green
  };

  const getSoilMoistureColor = (moisture) => {
    if (moisture < 30) return "#ef4444"; // Dry - red
    if (moisture > 80) return "#3b82f6"; // Very wet - blue
    return "#84cc16"; // Moderate - green
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-4">{t('iotMonitoring')}</h2>
      
      {/* Current readings cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary" />
                {t('temperature')}
              </CardTitle>
              <CardDescription>{t('realTimeReading')}</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                variants={gaugeVariants}
                className="flex justify-center items-center"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getTemperatureColor(currentReadings.temperature)}
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * (currentReadings.temperature / 50))}
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-700 ease-in-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{currentReadings.temperature}°C</span>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-500" />
                {t('humidity')}
              </CardTitle>
              <CardDescription>{t('realTimeReading')}</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                variants={gaugeVariants}
                className="flex justify-center items-center"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getHumidityColor(currentReadings.humidity)}
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * (currentReadings.humidity / 100))}
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-700 ease-in-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{currentReadings.humidity}%</span>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Droplets className="h-5 w-5 text-green-500" />
                {t('soilMoisture')}
              </CardTitle>
              <CardDescription>{t('realTimeReading')}</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                variants={gaugeVariants}
                className="flex justify-center items-center"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getSoilMoistureColor(currentReadings.soilMoisture)}
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * (currentReadings.soilMoisture / 100))}
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-700 ease-in-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{currentReadings.soilMoisture}%</span>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Tabs for different time periods */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartLine className="h-5 w-5" />
              {t('sensorDataTrends')}
            </CardTitle>
            <CardDescription>{t('graphDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="temperature" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="temperature">{t('temperature')}</TabsTrigger>
                <TabsTrigger value="humidity">{t('humidity')}</TabsTrigger>
                <TabsTrigger value="soilMoisture">{t('soilMoisture')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="temperature" className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={sensorData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 40]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 8 }}
                      name={t('temperature') + " (°C)"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="humidity" className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={sensorData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 8 }}
                      name={t('humidity') + " (%)"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="soilMoisture" className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={sensorData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="soilMoisture"
                      stroke="#84cc16"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 8 }}
                      name={t('soilMoisture') + " (%)"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default IOTMonitoring;



