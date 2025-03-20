import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeatherCard from './WeatherCard';
import { CloudRain, AlertTriangle, Droplet, CloudLightning, CloudSnow, Wind, ThermometerSun, Sprout } from 'lucide-react';
import axios from 'axios';

const WeatherAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forecast");
  const [forecast, setForecast] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [cropImpact, setCropImpact] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/weather', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data.weatherData;
        console.log("weather",data)
        setForecast(data.forecast || []);
        setWeatherAlerts(data.alerts || []);
        setCropImpact(data.cropImpact || []);
        setCurrentWeather(data.current);
        setLocation(data.location);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/30';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weather Analysis</h1>
        <p className="text-muted-foreground">Forecast, alerts, and impact on your crops</p>
      </div>

      {currentWeather && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Weather in {location?.name}</CardTitle>
            <CardDescription>As of {currentWeather.last_updated}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <ThermometerSun className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Temperature</h3>
                <p className="text-muted-foreground">
                  {currentWeather.temp_c}°C / {currentWeather.temp_f}°F
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Droplet className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Humidity</h3>
                <p className="text-muted-foreground">
                  {currentWeather.humidity}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Wind className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Wind</h3>
                <p className="text-muted-foreground">
                  {currentWeather.wind_kph} km/h, {currentWeather.wind_dir}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CloudRain className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Condition</h3>
                <p className="text-muted-foreground">
                  {currentWeather.condition.text}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecast" className="flex items-center justify-center">
            <CloudRain className="mr-2 h-4 w-4" />
            Forecast
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center justify-center">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Weather Alerts
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center justify-center">
            <Sprout className="mr-2 h-4 w-4" />
            Crop Impact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fadeIn">
            {Array.isArray(forecast) && forecast.length > 0 ? (
              forecast.map((day, index) => (
                <WeatherCard
                  key={index}
                  date={day.date}
                  temp={day.temp}
                  condition={day.condition}
                  humidity={day.humidity}
                  windSpeed={day.windSpeed}
                  precipitation={day.precipitation}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium">No Forecast Data</h3>
                <p className="mt-1 text-muted-foreground">There is no forecast data available at this time.</p>
              </div>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Seasonal Outlook</CardTitle>
              <CardDescription>Projected weather patterns for the next month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <ThermometerSun className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Temperature Trend</h3>
                    <p className="text-muted-foreground">
                      Temperatures are expected to gradually rise over the next 3 weeks, with daytime highs
                      reaching 32-34°C by mid-month. Night temperatures will remain moderate around 18-22°C.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Droplet className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Precipitation Outlook</h3>
                    <p className="text-muted-foreground">
                      After the rainfall event expected this week, conditions are likely to remain mostly
                      dry for the following 2-3 weeks. Scattered light showers may occur but significant
                      rainfall is not anticipated.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Wind className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Wind Patterns</h3>
                    <p className="text-muted-foreground">
                      Predominantly northwesterly winds are expected, with moderate speeds of 10-15 km/h.
                      Occasional stronger gusts possible during afternoon hours.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <div className="space-y-6 animate-fadeIn">
            {Array.isArray(weatherAlerts) && weatherAlerts.length > 0 ? (
              weatherAlerts.map((alert, index) => (
                <Card key={index} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <alert.icon className="h-5 w-5 mr-2" />
                      <CardTitle>{alert.type}</CardTitle>
                    </div>
                    <CardDescription>
                      Severity: {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{alert.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Recommended Actions:</h4>
                      <ul className="space-y-1 ml-5 list-disc text-muted-foreground">
                        {alert.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600 dark:text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium">No Weather Alerts</h3>
                <p className="mt-1 text-muted-foreground">There are no significant weather alerts for your region at this time.</p>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Understanding Weather Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">High Severity</h3>
                      <p className="text-sm text-muted-foreground">
                        Potentially dangerous weather conditions that may require immediate action
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Moderate Severity</h3>
                      <p className="text-sm text-muted-foreground">
                        Weather conditions that may impact farm operations and require preparation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Low Severity</h3>
                      <p className="text-sm text-muted-foreground">
                        Minor weather events to be aware of but with limited impact
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="mt-6">
          <div className="space-y-6 animate-fadeIn">
            {Array.isArray(cropImpact) && cropImpact.length > 0 ? (
              cropImpact.map((item, index) => (
                <Card key={index} className={`border-l-4 ${getSeverityColor(item.impact)}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      <CardTitle>{item.crop}</CardTitle>
                    </div>
                    <CardDescription>
                      Impact: {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{item.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Recommended Actions:</h4>
                      <ul className="space-y-1 ml-5 list-disc text-muted-foreground">
                        {item.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 dark:text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium">No Crop Impact Data</h3>
                <p className="mt-1 text-muted-foreground">There is no crop impact data available at this time.</p>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Weather-Resistant Farming Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CloudRain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Heavy Rainfall Management</h3>
                      <ul className="mt-2 space-y-1 ml-5 list-disc text-muted-foreground">
                        <li>Implement contour farming to prevent soil erosion</li>
                        <li>Install proper drainage systems in fields</li>
                        <li>Consider raised beds for vegetable crops</li>
                        <li>Mulch around plants to prevent soil splashing and disease spread</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ThermometerSun className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">High Temperature Resilience</h3>
                      <ul className="mt-2 space-y-1 ml-5 list-disc text-muted-foreground">
                        <li>Use shade cloth for sensitive crops during peak heat</li>
                        <li>Schedule irrigation during cooler parts of the day</li>
                        <li>Apply mulch to retain soil moisture and cool root zones</li>
                        <li>Select heat-resistant crop varieties when possible</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Wind className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wind Protection Strategies</h3>
                      <ul className="mt-2 space-y-1 ml-5 list-disc text-muted-foreground">
                        <li>Establish windbreaks with trees or shrubs</li>
                        <li>Use row covers or tunnels for vulnerable crops</li>
                        <li>Plant wind-resistant varieties when available</li>
                        <li>Stagger planting times to minimize total crop risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeatherAnalysis;
