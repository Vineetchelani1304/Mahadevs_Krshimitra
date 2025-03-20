
// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { motion } from 'framer-motion';
// import { ChevronRight, Users, Info, Sun, Cloud, CloudRain, Wind, AlertTriangle, Tractor, Sprout } from 'lucide-react';
// import { useLanguage } from "../contexts/LanguageContext";
// import WeatherCard from './WeatherCard';
// import IOTMonitoring from './IOTMonitoring';

// const Dashboard = () => {
//   const { t } = useLanguage();
//   const [activeTab, setActiveTab] = useState("overview");
  
//   // Container animation variant
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//         duration: 0.3
//       }
//     }
//   };
  
//   // Item animation variant
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 300, damping: 24 }
//     }
//   };

//   // Farmer Info
//   const farmerInfo = {
//     name: "Rajesh Patel",
//     location: "Nashik, Maharashtra",
//     lastActive: "Today, 10:45 AM",
//     farmSize: "5.2 hectares",
//     soilHealth: 78,
//     weatherRisk: 12,
//     marketCondition: "Favorable",
//   };

//   // Crop Recommendations
//   const cropRecommendations = [
//     {
//       name: "Wheat",
//       confidence: 92,
//       expectedYield: "40-45 quintals/hectare",
//       marketDemand: "High",
//       waterRequirement: "Medium"
//     },
//     {
//       name: "Chickpeas",
//       confidence: 87,
//       expectedYield: "12-15 quintals/hectare",
//       marketDemand: "Medium",
//       waterRequirement: "Low"
//     },
//     {
//       name: "Mustard",
//       confidence: 81,
//       expectedYield: "10-12 quintals/hectare",
//       marketDemand: "High",
//       waterRequirement: "Low"
//     }
//   ];

//   // Market Data
//   const marketData = [
//     {
//       crop: "Wheat",
//       currentPrice: "₹ 2,400/quintal",
//       trend: "rising",
//       prediction: "Sell in 2 weeks",
//       nearbyMarket: "Nashik Mandi (8 km)"
//     },
//     {
//       crop: "Soybean",
//       currentPrice: "₹ 4,850/quintal",
//       trend: "stable",
//       prediction: "Hold for now",
//       nearbyMarket: "Pune Market (45 km)"
//     },
//     {
//       crop: "Onion",
//       currentPrice: "₹ 1,950/quintal",
//       trend: "falling",
//       prediction: "Sell immediately",
//       nearbyMarket: "Nashik Mandi (8 km)"
//     }
//   ];

//   // Soil Health Data
//   const soilHealthData = {
//     pH: 6.8,
//     moisture: 42,
//     nitrogen: 65,
//     phosphorus: 48,
//     potassium: 72,
//     organicMatter: 58,
//     recommendations: [
//       "Add 10kg/hectare of phosphorus fertilizer",
//       "Increase organic matter by mulching",
//       "Maintain current irrigation schedule"
//     ]
//   };

//   // Community Updates
//   const communityUpdates = [
//     {
//       title: "New Govt Subsidy Announced",
//       description: "75% subsidy on drip irrigation equipment announced for small farmers.",
//       date: "2 days ago"
//     },
//     {
//       title: "Farming Workshop",
//       description: "Learn sustainable farming techniques at the community center this weekend.",
//       date: "1 week ago"
//     },
//     {
//       title: "Market Price Alert",
//       description: "Soybean prices expected to rise by 8% next month according to experts.",
//       date: "3 days ago"
//     }
//   ];

//   // Weather condition rendering
//   const renderWeatherIcon = (condition) => {
//     if (condition === "sunny") {
//       return <Sun className="h-8 w-8 text-yellow-500" />;
//     } else if (condition === "cloudy") {
//       return <Cloud className="h-8 w-8 text-gray-500" />;
//     } else if (condition === "rainy") {
//       return <CloudRain className="h-8 w-8 text-blue-500" />;
//     } else {
//       return <Cloud className="h-8 w-8 text-gray-500" />;
//     }
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="w-full"
//     >
//       <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
//           <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
//           <TabsTrigger value="crops">{t('recommendations')}</TabsTrigger>
//           <TabsTrigger value="weather">{t('weather')}</TabsTrigger>
//           <TabsTrigger value="market">{t('market')}</TabsTrigger>
//           <TabsTrigger value="iot">{t('iotData')}</TabsTrigger>
//         </TabsList>
        
//         {/* Overview Tab */}
//         <TabsContent value="overview" className="space-y-4">
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-3 gap-4"
//             variants={itemVariants}
//           >
//             {/* Farmer profile card */}
//             <Card className="md:col-span-2">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-2xl">{t('welcomeMessage')}</CardTitle>
//                 <CardDescription>{t('dashboardDescription')}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center space-x-4 mb-4">
//                   <Avatar className="h-16 w-16">
//                     <AvatarImage src="/placeholder.svg" alt="Farmer" />
//                     <AvatarFallback>RP</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="text-lg font-medium">{farmerInfo.name}</h3>
//                     <p className="text-sm text-muted-foreground">{farmerInfo.location}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {t('lastActive')}: {farmerInfo.lastActive}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <p className="text-sm font-medium">{t('soilHealth')}</p>
//                     <Progress value={farmerInfo.soilHealth} className="h-2" />
//                     <p className="text-xs text-right text-muted-foreground">{farmerInfo.soilHealth}% {t('healthy')}</p>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <p className="text-sm font-medium">{t('weatherRisk')}</p>
//                     <Progress value={farmerInfo.weatherRisk} className="h-2" />
//                     <p className="text-xs text-right text-muted-foreground">{farmerInfo.weatherRisk}% {t('risk')}</p>
//                   </div>
                  
//                   <div>
//                     <p className="text-sm font-medium">{t('marketCondition')}</p>
//                     <div className="mt-2">
//                       <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
//                         {farmerInfo.marketCondition}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Weather glimpse card */}
//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg">{t('currentWeather')}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <WeatherCard 
//                   temperature={28}
//                   condition="sunny"
//                   humidity={65}
//                   wind={12}
//                   location={farmerInfo.location}
//                 />
//               </CardContent>
//               <CardFooter>
//                 <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("weather")}>
//                   <span>{t('viewForecast')}</span>
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </CardFooter>
//             </Card>
//           </motion.div>
          
//           {/* Quick info cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <motion.div variants={itemVariants}>
//               <Card className="hover:shadow-md transition-shadow">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg flex items-center">
//                     <Sprout className="mr-2 h-5 w-5 text-green-500" />
//                     {t('topRecommendation')}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-xl">{cropRecommendations[0].name}</h4>
//                     <p className="text-sm text-muted-foreground">{t('confidence')}: {cropRecommendations[0].confidence}%</p>
//                     <p className="text-sm text-muted-foreground">{t('expectedYield')}: {cropRecommendations[0].expectedYield}</p>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("crops")}>
//                     {t('seeAllCrops')}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
            
//             <motion.div variants={itemVariants}>
//               <Card className="hover:shadow-md transition-shadow">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg flex items-center">
//                     <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
//                     {t('weatherAlert')}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-amber-600">{t('rainExpected')}</h4>
//                     <p className="text-sm text-muted-foreground">{t('inNext')}: 48 {t('hours')}</p>
//                     <p className="text-sm text-muted-foreground">{t('expectedAmount')}: 25-30mm</p>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("weather")}>
//                     {t('viewForecast')}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
            
//             <motion.div variants={itemVariants}>
//               <Card className="hover:shadow-md transition-shadow">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg flex items-center">
//                     <Users className="mr-2 h-5 w-5 text-blue-500" />
//                     {t('community')}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <h4 className="font-semibold">{communityUpdates[0].title}</h4>
//                     <p className="text-sm text-muted-foreground truncate">{communityUpdates[0].description}</p>
//                     <p className="text-xs text-muted-foreground">{communityUpdates[0].date}</p>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="ghost" size="sm" className="w-full">
//                     {t('viewCommunity')}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           </div>
          
//           {/* Soil health summary */}
//           <motion.div variants={itemVariants}>
//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg">{t('soilHealthSummary')}</CardTitle>
//                 <CardDescription>{t('soilDescription')}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-sm">
//                       <span>{t('ph')}</span>
//                       <span className="font-medium">{soilHealthData.pH}</span>
//                     </div>
//                     <Progress value={soilHealthData.pH * 10} className="h-1.5" />
//                   </div>
                  
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-sm">
//                       <span>{t('moisture')}</span>
//                       <span className="font-medium">{soilHealthData.moisture}%</span>
//                     </div>
//                     <Progress value={soilHealthData.moisture} className="h-1.5" />
//                   </div>
                  
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-sm">
//                       <span>{t('nitrogen')}</span>
//                       <span className="font-medium">{soilHealthData.nitrogen}%</span>
//                     </div>
//                     <Progress value={soilHealthData.nitrogen} className="h-1.5" />
//                   </div>
                  
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-sm">
//                       <span>{t('phosphorus')}</span>
//                       <span className="font-medium">{soilHealthData.phosphorus}%</span>
//                     </div>
//                     <Progress value={soilHealthData.phosphorus} className="h-1.5" />
//                   </div>
                  
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-sm">
//                       <span>{t('potassium')}</span>
//                       <span className="font-medium">{soilHealthData.potassium}%</span>
//                     </div>
//                     <Progress value={soilHealthData.potassium} className="h-1.5" />
//                   </div>
                  
//                   <div className="space-y-1">
//                     <div className="flex justify-between text-sm">
//                       <span>{t('organicMatter')}</span>
//                       <span className="font-medium">{soilHealthData.organicMatter}%</span>
//                     </div>
//                     <Progress value={soilHealthData.organicMatter} className="h-1.5" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </TabsContent>
        
//         {/* Crops Tab */}
//         <TabsContent value="crops" className="space-y-4">
//           <motion.div variants={itemVariants}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{t('cropRecommendations')}</CardTitle>
//                 <CardDescription>{t('cropRecommendationsDescription')}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {/* Recommended crops */}
//                 <div className="space-y-4">
//                   {cropRecommendations.map((crop, index) => (
//                     <motion.div 
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="p-4 border rounded-md hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-medium text-lg">{crop.name}</h3>
//                           <div className="flex items-center mt-1">
//                             <Badge variant={index === 0 ? "default" : "outline"} className="mr-2">
//                               {index === 0 ? t('best') : t('alternative')}
//                             </Badge>
//                             <span className="text-sm text-muted-foreground">{t('confidence')}: {crop.confidence}%</span>
//                           </div>
//                         </div>
//                         <Progress value={crop.confidence} className="w-24 h-2" />
//                       </div>
                      
//                       <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-sm">
//                         <div>
//                           <p className="text-muted-foreground">{t('expectedYield')}</p>
//                           <p className="font-medium">{crop.expectedYield}</p>
//                         </div>
//                         <div>
//                           <p className="text-muted-foreground">{t('marketDemand')}</p>
//                           <p className="font-medium">{crop.marketDemand}</p>
//                         </div>
//                         <div>
//                           <p className="text-muted-foreground">{t('waterRequirement')}</p>
//                           <p className="font-medium">{crop.waterRequirement}</p>
//                         </div>
//                       </div>
                      
//                       <Button variant="outline" size="sm" className="mt-4">
//                         {t('viewCropDetails')}
//                       </Button>
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
          
//           <motion.div variants={itemVariants}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{t('seasonalPlanting')}</CardTitle>
//                 <CardDescription>{t('seasonalPlantingDescription')}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center space-x-4">
//                   <Info className="h-5 w-5 text-blue-500" />
//                   <p className="text-sm">{t('plantingAdvice')}</p>
//                 </div>
//                 <Button className="mt-4">
//                   {t('viewCalendar')}
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </TabsContent>
        
//         {/* Weather Tab */}
//         <TabsContent value="weather" className="space-y-4">
//           <motion.div variants={itemVariants}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{t('weatherForecast')}</CardTitle>
//                 <CardDescription>{t('weatherForecastDescription')}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <WeatherCard 
//                       temperature={28}
//                       condition="sunny"
//                       humidity={65}
//                       wind={12}
//                       location={farmerInfo.location}
//                       detailed={true}
//                     />
//                   </div>
                  
//                   <div className="border rounded-md p-4">
//                     <h3 className="font-medium mb-2">{t('weeklyForecast')}</h3>
//                     <div className="space-y-4">
//                       {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
//                         <motion.div 
//                           key={day}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           className="flex justify-between items-center border-b pb-2 last:border-0"
//                         >
//                           <span>{t(day.toLowerCase())}</span>
//                           <div className="flex items-center">
//                             {renderWeatherIcon(["sunny", "cloudy", "rainy", "sunny", "cloudy"][index])}
//                             <span className="ml-2 font-medium">
//                               {[28, 27, 24, 26, 27][index]}°C
//                             </span>
//                           </div>
//                           <span className="text-sm text-muted-foreground">
//                             {[8, 12, 60, 5, 10][index]}% {t('rain')}
//                           </span>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 border rounded-md p-4">
//                   <h3 className="font-medium mb-3 flex items-center">
//                     <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
//                     {t('weatherAlerts')}
//                   </h3>
                  
//                   <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
//                     <h4 className="font-medium text-amber-800">{t('rainExpected')}</h4>
//                     <p className="text-sm text-amber-700 mt-1">
//                       {t('rainAlert')}
//                     </p>
//                     <div className="flex justify-between items-center mt-2">
//                       <span className="text-xs text-amber-600">{t('inNext')}: 48 {t('hours')}</span>
//                       <Button variant="outline" size="sm" className="h-7 text-xs">
//                         {t('prepare')}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </TabsContent>
        
//         {/* Market Tab */}
//         <TabsContent value="market" className="space-y-4">
//           <motion.div variants={itemVariants}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{t('marketPrices')}</CardTitle>
//                 <CardDescription>{t('marketPricesDescription')}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   {marketData.map((item, index) => (
//                     <motion.div 
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="border rounded-md p-4 hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex justify-between items-start">
//                         <h3 className="font-semibold text-lg">{item.crop}</h3>
//                         <Badge variant={
//                           item.trend === "rising" ? "default" : 
//                           item.trend === "falling" ? "destructive" : "outline"
//                         }>
//                           {item.trend === "rising" ? "↑" : item.trend === "falling" ? "↓" : "→"} {t(item.trend)}
//                         </Badge>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 mt-3">
//                         <div>
//                           <p className="text-sm text-muted-foreground">{t('currentPrice')}</p>
//                           <p className="font-medium">{item.currentPrice}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">{t('recommendation')}</p>
//                           <p className="font-medium">{item.prediction}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">{t('nearbyMarket')}</p>
//                           <p className="font-medium">{item.nearbyMarket}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button variant="outline" className="w-full">
//                   {t('viewAllPrices')}
//                 </Button>
//               </CardFooter>
//             </Card>
//           </motion.div>
          
//           <motion.div variants={itemVariants}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{t('marketTrends')}</CardTitle>
//                 <CardDescription>{t('marketTrendsDescription')}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="p-4 border rounded-md">
//                   <h3 className="font-medium">{t('bestTimeToSell')}</h3>
//                   <div className="flex items-center space-x-2 mt-2">
//                     <Tractor className="h-5 w-5 text-green-500" />
//                     <p className="text-green-700">{t('marketInsight')}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </TabsContent>
        
//         {/* IOT Tab */}
//         <TabsContent value="iot">
//           <IOTMonitoring />
//         </TabsContent>
//       </Tabs>
//     </motion.div>
//   );
// };

// export default Dashboard;



import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';
import { ChevronRight, Users, Info, Sun, Cloud, CloudRain, Wind, AlertTriangle, Tractor, Sprout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WeatherCard from './WeatherCard';
import IOTMonitoring from './IOTMonitoring';

const Dashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  // Container animation variant
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

  // Item animation variant
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Farmer Info
  const farmerInfo = {
    name: "Rajesh Patel",
    location: "Nashik, Maharashtra",
    lastActive: "Today, 10:45 AM",
    farmSize: "5.2 hectares",
    soilHealth: 78,
    weatherRisk: 12,
    marketCondition: "Favorable",
  };

  // Crop Recommendations
  const cropRecommendations = [
    {
      name: "Wheat",
      confidence: 92,
      expectedYield: "40-45 quintals/hectare",
      marketDemand: "High",
      waterRequirement: "Medium"
    },
    {
      name: "Chickpeas",
      confidence: 87,
      expectedYield: "12-15 quintals/hectare",
      marketDemand: "Medium",
      waterRequirement: "Low"
    },
    {
      name: "Mustard",
      confidence: 81,
      expectedYield: "10-12 quintals/hectare",
      marketDemand: "High",
      waterRequirement: "Low"
    }
  ];

  // Market Data
  const marketData = [
    {
      crop: "Wheat",
      currentPrice: "₹ 2,400/quintal",
      trend: "rising",
      prediction: "Sell in 2 weeks",
      nearbyMarket: "Nashik Mandi (8 km)"
    },
    {
      crop: "Soybean",
      currentPrice: "₹ 4,850/quintal",
      trend: "stable",
      prediction: "Hold for now",
      nearbyMarket: "Pune Market (45 km)"
    },
    {
      crop: "Onion",
      currentPrice: "₹ 1,950/quintal",
      trend: "falling",
      prediction: "Sell immediately",
      nearbyMarket: "Nashik Mandi (8 km)"
    }
  ];

  // Soil Health Data
  const soilHealthData = {
    pH: 6.8,
    moisture: 42,
    nitrogen: 65,
    phosphorus: 48,
    potassium: 72,
    organicMatter: 58,
    recommendations: [
      "Add 10kg/hectare of phosphorus fertilizer",
      "Increase organic matter by mulching",
      "Maintain current irrigation schedule"
    ]
  };

  // Community Updates
  const communityUpdates = [
    {
      title: "New Govt Subsidy Announced",
      description: "75% subsidy on drip irrigation equipment announced for small farmers.",
      date: "2 days ago"
    },
    {
      title: "Farming Workshop",
      description: "Learn sustainable farming techniques at the community center this weekend.",
      date: "1 week ago"
    },
    {
      title: "Market Price Alert",
      description: "Soybean prices expected to rise by 8% next month according to experts.",
      date: "3 days ago"
    }
  ];

  // Weather condition rendering
  const renderWeatherIcon = (condition) => {
    if (condition === "sunny") {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (condition === "cloudy") {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    } else if (condition === "rainy") {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="crops">{t('recommendations')}</TabsTrigger>
          <TabsTrigger value="weather">{t('weather')}</TabsTrigger>
          <TabsTrigger value="market">{t('market')}</TabsTrigger>
          <TabsTrigger value="iot">{t('iotData')}</TabsTrigger>
          <TabsTrigger value="community">{t('community')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            {/* Farmer profile card */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{t('welcomeMessage')}</CardTitle>
                <CardDescription>{t('dashboardDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" alt="Farmer" />
                    <AvatarFallback>RP</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{farmerInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">{farmerInfo.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('lastActive')}: {farmerInfo.lastActive}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t('soilHealth')}</p>
                    <Progress value={farmerInfo.soilHealth} className="h-2" />
                    <p className="text-xs text-right text-muted-foreground">{farmerInfo.soilHealth}% {t('healthy')}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t('weatherRisk')}</p>
                    <Progress value={farmerInfo.weatherRisk} className="h-2" />
                    <p className="text-xs text-right text-muted-foreground">{farmerInfo.weatherRisk}% {t('risk')}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">{t('marketCondition')}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        {farmerInfo.marketCondition}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather glimpse card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t('currentWeather')}</CardTitle>
              </CardHeader>
              <CardContent>
                <WeatherCard
                  temperature={28}
                  condition="sunny"
                  humidity={65}
                  wind={12}
                  location={farmerInfo.location}
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("weather")}>
                  <span>{t('viewForecast')}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Quick info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Sprout className="mr-2 h-5 w-5 text-green-500" />
                    {t('topRecommendation')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-xl">{cropRecommendations[0].name}</h4>
                    <p className="text-sm text-muted-foreground">{t('confidence')}: {cropRecommendations[0].confidence}%</p>
                    <p className="text-sm text-muted-foreground">{t('expectedYield')}: {cropRecommendations[0].expectedYield}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("crops")}>
                    {t('seeAllCrops')}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                    {t('weatherAlert')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-600">{t('rainExpected')}</h4>
                    <p className="text-sm text-muted-foreground">{t('inNext')}: 48 {t('hours')}</p>
                    <p className="text-sm text-muted-foreground">{t('expectedAmount')}: 25-30mm</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("weather")}>
                    {t('viewForecast')}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                    {t('community')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">{communityUpdates[0].title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{communityUpdates[0].description}</p>
                    <p className="text-xs text-muted-foreground">{communityUpdates[0].date}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("community")}>
                    {t('viewCommunity')}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          {/* Soil health summary */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t('soilHealthSummary')}</CardTitle>
                <CardDescription>{t('soilDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{t('ph')}</span>
                      <span className="font-medium">{soilHealthData.pH}</span>
                    </div>
                    <Progress value={soilHealthData.pH * 10} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{t('moisture')}</span>
                      <span className="font-medium">{soilHealthData.moisture}%</span>
                    </div>
                    <Progress value={soilHealthData.moisture} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{t('nitrogen')}</span>
                      <span className="font-medium">{soilHealthData.nitrogen}%</span>
                    </div>
                    <Progress value={soilHealthData.nitrogen} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{t('phosphorus')}</span>
                      <span className="font-medium">{soilHealthData.phosphorus}%</span>
                    </div>
                    <Progress value={soilHealthData.phosphorus} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{t('potassium')}</span>
                      <span className="font-medium">{soilHealthData.potassium}%</span>
                    </div>
                    <Progress value={soilHealthData.potassium} className="h-1.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{t('organicMatter')}</span>
                      <span className="font-medium">{soilHealthData.organicMatter}%</span>
                    </div>
                    <Progress value={soilHealthData.organicMatter} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Crops Tab */}
        <TabsContent value="crops" className="space-y-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('cropRecommendations')}</CardTitle>
                <CardDescription>{t('cropRecommendationsDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Recommended crops */}
                <div className="space-y-4">
                  {cropRecommendations.map((crop, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-md hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{crop.name}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant={index === 0 ? "default" : "outline"} className="mr-2">
                              {index === 0 ? t('best') : t('alternative')}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{t('confidence')}: {crop.confidence}%</span>
                          </div>
                        </div>
                        <Progress value={crop.confidence} className="w-24 h-2" />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">{t('expectedYield')}</p>
                          <p className="font-medium">{crop.expectedYield}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t('marketDemand')}</p>
                          <p className="font-medium">{crop.marketDemand}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t('waterRequirement')}</p>
                          <p className="font-medium">{crop.waterRequirement}</p>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="mt-4">
                        {t('viewCropDetails')}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('seasonalPlanting')}</CardTitle>
                <CardDescription>{t('seasonalPlantingDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Info className="h-5 w-5 text-blue-500" />
                  <p className="text-sm">{t('plantingAdvice')}</p>
                </div>
                <Button className="mt-4">
                  {t('viewCalendar')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Weather Tab */}
        <TabsContent value="weather" className="space-y-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('weatherForecast')}</CardTitle>
                <CardDescription>{t('weatherForecastDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <WeatherCard
                      temperature={28}
                      condition="sunny"
                      humidity={65}
                      wind={12}
                      location={farmerInfo.location}
                      detailed={true}
                    />
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">{t('weeklyForecast')}</h3>
                    <div className="space-y-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
                        <motion.div
                          key={day}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center border-b pb-2 last:border-0"
                        >
                          <span>{t(day.toLowerCase())}</span>
                          <div className="flex items-center">
                            {renderWeatherIcon(["sunny", "cloudy", "rainy", "sunny", "cloudy"][index])}
                            <span className="ml-2 font-medium">
                              {[28, 27, 24, 26, 27][index]}°C
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {[8, 12, 60, 5, 10][index]}% {t('rain')}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border rounded-md p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    {t('weatherAlerts')}
                  </h3>

                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                    <h4 className="font-medium text-amber-800">{t('rainExpected')}</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      {t('rainAlert')}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-amber-600">{t('inNext')}: 48 {t('hours')}</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        {t('prepare')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market" className="space-y-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('marketPrices')}</CardTitle>
                <CardDescription>{t('marketPricesDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {marketData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-md p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{item.crop}</h3>
                        <Badge variant={
                          item.trend === "rising" ? "default" :
                          item.trend === "falling" ? "destructive" : "outline"
                        }>
                          {item.trend === "rising" ? "↑" : item.trend === "falling" ? "↓" : "→"} {t(item.trend)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 mt-3">
                        <div>
                          <p className="text-sm text-muted-foreground">{t('currentPrice')}</p>
                          <p className="font-medium">{item.currentPrice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('recommendation')}</p>
                          <p className="font-medium">{item.prediction}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('nearbyMarket')}</p>
                          <p className="font-medium">{item.nearbyMarket}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t('viewAllPrices')}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('marketTrends')}</CardTitle>
                <CardDescription>{t('marketTrendsDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">{t('bestTimeToSell')}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Tractor className="h-5 w-5 text-green-500" />
                    <p className="text-green-700">{t('marketInsight')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* IOT Tab */}
        <TabsContent value="iot">
          <IOTMonitoring />
        </TabsContent>

        {/* Community Updates Tab */}
        <TabsContent value="community" className="space-y-4">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('communityUpdates')}</CardTitle>
                <CardDescription>{t('communityUpdatesDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityUpdates.map((update, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-md p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-lg">{update.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{update.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{update.date}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
