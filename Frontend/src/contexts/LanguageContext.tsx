import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'english' | 'hindi' | 'marathi';

type Translations = {
  [key: string]: {
    english: string;
    hindi: string;
    marathi: string;
  };
};

// Common translations used across the app
export const translations: Translations = {
  home: {
    english: 'Home',
    hindi: 'होम',
    marathi: 'मुख्यपृष्ठ',
  },
  about: {
    english: 'About',
    hindi: 'हमारे बारे में',
    marathi: 'आमच्याबद्दल',
  },
  features: {
    english: 'Features',
    hindi: 'विशेषताएँ',
    marathi: 'वैशिष्ट्ये',
  },
  contact: {
    english: 'Contact',
    hindi: 'संपर्क',
    marathi: 'संपर्क',
  },
  login: {
    english: 'Log in',
    hindi: 'लॉग इन',
    marathi: 'लॉग इन',
  },
  signup: {
    english: 'Sign up',
    hindi: 'साइन अप',
    marathi: 'नोंदणी करा',
  },
  dashboard: {
    english: 'Dashboard',
    hindi: 'डैशबोर्ड',
    marathi: 'डॅशबोर्ड',
  },
  cropRecommendation: {
    english: 'Crop Recommendation',
    hindi: 'फसल अनुशंसा',
    marathi: 'पीक शिफारस',
  },
  weatherAnalysis: {
    english: 'Weather Analysis',
    hindi: 'मौसम विश्लेषण',
    marathi: 'हवामान विश्लेषण',
  },
  marketInsights: {
    english: 'Market Insights',
    hindi: 'बाजार अंतर्दृष्टि',
    marathi: 'बाजार अंतर्दृष्टी',
  },
  profile: {
    english: 'Profile',
    hindi: 'प्रोफाइल',
    marathi: 'प्रोफाइल',
  },
  getStarted: {
    english: 'Get Started',
    hindi: 'शुरू करें',
    marathi: 'सुरु करा',
  },
  learnMore: {
    english: 'Learn More',
    hindi: 'और जानें',
    marathi: 'अधिक जाणून घ्या',
  },
  sendMessage: {
    english: 'Send Message',
    hindi: 'संदेश भेजें',
    marathi: 'संदेश पाठवा',
  },
  chatPlaceholder: {
    english: 'Ask something about farming...',
    hindi: 'खेती के बारे में कुछ पूछें...',
    marathi: 'शेतीबद्दल काही विचारा...',
  },
  smartDecisions: {
    english: 'Smart Decisions for Better Harvests',
    hindi: 'बेहतर फसल के लिए स्मार्ट निर्णय',
    marathi: 'चांगल्या पिकांसाठी स्मार्ट निर्णय',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  // Load saved language preference from localStorage on init
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['english', 'hindi', 'marathi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // English translations
  const enTranslations = {
    iotData: "IOT Sensors",
    iotMonitoring: "Real-time Sensor Data",
    realTimeReading: "Current reading",
    temperature: "Temperature",
    humidity: "Humidity",
    soilMoisture: "Soil Moisture",
    sensorDataTrends: "Sensor Data Trends",
    graphDescription: "Tracking environmental conditions over time",
    
    overview: "Overview",
    recommendations: "Crop Recommendations",
    weather: "Weather",
    market: "Market",
    
    welcomeMessage: "Welcome to Your Farm Dashboard",
    dashboardDescription: "Monitor your farm's health, weather, and market conditions",
    lastActive: "Last active",
    soilHealth: "Soil Health",
    weatherRisk: "Weather Risk",
    marketCondition: "Market Condition",
    healthy: "Healthy",
    risk: "Risk",
    
    currentWeather: "Current Weather",
    viewForecast: "View Forecast",
    weatherForecast: "Weather Forecast",
    weatherForecastDescription: "7-day weather prediction for your location",
    weeklyForecast: "Weekly Forecast",
    rain: "Rain",
    weatherAlerts: "Weather Alerts",
    rainExpected: "Rain Expected",
    rainAlert: "Expected rainfall of 25-30mm in the next 48 hours. Consider postponing any outdoor chemical applications.",
    inNext: "In next",
    hours: "hours",
    expectedAmount: "Expected amount",
    prepare: "Prepare",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    
    topRecommendation: "Top Crop Recommendation",
    cropRecommendations: "Recommended Crops",
    cropRecommendationsDescription: "AI-powered crop suggestions based on soil, weather and market conditions",
    confidence: "Confidence",
    expectedYield: "Expected Yield",
    seeAllCrops: "See All Crops",
    best: "Best Choice",
    alternative: "Alternative",
    marketDemand: "Market Demand",
    waterRequirement: "Water Needs",
    viewCropDetails: "View Details",
    seasonalPlanting: "Seasonal Planting Guide",
    seasonalPlantingDescription: "When to plant your crops for optimal growth",
    plantingAdvice: "Now is the ideal time to plant wheat and chickpeas in your region based on current conditions.",
    viewCalendar: "View Planting Calendar",
    
    weatherAlert: "Weather Alert",
    
    community: "Community Updates",
    viewCommunity: "View Updates",
    
    soilHealthSummary: "Soil Health Summary",
    soilDescription: "Current soil nutrient levels and recommendations",
    ph: "pH Level",
    moisture: "Moisture",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    organicMatter: "Organic Matter",
    
    marketPrices: "Current Market Prices",
    marketPricesDescription: "Latest crop prices and selling recommendations",
    currentPrice: "Current Price",
    recommendation: "Recommendation",
    nearbyMarket: "Nearby Market",
    viewAllPrices: "View All Prices",
    rising: "Rising",
    falling: "Falling",
    stable: "Stable",
    marketTrends: "Market Trends Analysis",
    marketTrendsDescription: "Price predictions and best selling times",
    bestTimeToSell: "Best Time to Sell",
    marketInsight: "Wheat prices typically rise by 5-8% in January. Consider storing your harvest if possible."
  };

  // Hindi translations
  const hiTranslations = {
    iotData: "आईओटी सेंसर",
    iotMonitoring: "वास्तविक समय सेंसर डेटा",
    realTimeReading: "वर्तमान रीडिंग",
    temperature: "तापमान",
    humidity: "नमी",
    soilMoisture: "मिट्टी की नमी",
    sensorDataTrends: "सेंसर डेटा ट्रेंड्स",
    graphDescription: "समय के साथ पर्यावरणीय स्थितियों की निगरानी",
    
    overview: "अवलोकन",
    recommendations: "फसल सिफारिशें",
    weather: "मौसम",
    market: "बाज़ार",
    
    welcomeMessage: "अपने कृषि डैशबोर्ड में आपका स्वागत है",
    dashboardDescription: "अपने खेत के स्वास्थ्य, मौसम और बाज़ार की स्थितियों की निगरानी करें",
    lastActive: "अंतिम सक्रिय",
    soilHealth: "मिट्टी का स्वास्थ्य",
    weatherRisk: "मौसम जोखिम",
    marketCondition: "बाज़ार की स्थिति",
    healthy: "स्वस्थ",
    risk: "जोखिम",
    
    currentWeather: "वर्तमान मौसम",
    viewForecast: "पूर्वानुमान देखें",
    weatherForecast: "मौसम का पूर्वानुमान",
    weatherForecastDescription: "आपके स्थान के लिए 7-दिन का मौसम पूर्वानुमान",
    weeklyForecast: "साप्ताहिक पूर्वानुमान",
    rain: "बारिश",
    weatherAlerts: "मौसम अलर्ट",
    rainExpected: "बारिश की उम्मीद",
    rainAlert: "अगले 48 घंटों में 25-30 मिमी बारिश की उम्मीद है। किसी भी बाहरी रासायनिक अनुप्रयोग को स्थगित करने पर विचार करें।",
    inNext: "अगले",
    hours: "घंटों में",
    expectedAmount: "अपेक्षित मात्रा",
    prepare: "तैयारी करें",
    monday: "सोमवार",
    tuesday: "मंगलवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    friday: "शुक्रवार",
    saturday: "शनिवार",
    sunday: "रविवार",
    
    topRecommendation: "शीर्ष फसल अनुशंसा",
    cropRecommendations: "अनुशंसित फसलें",
    cropRecommendationsDescription: "मिट्टी, मौसम और बाज़ार की मांग के आधार पर AI-पावर्ड फसल सुझाव",
    confidence: "विश्व��स",
    expectedYield: "अपेक्षित उपज",
    seeAllCrops: "सभी फसलें देखें",
    best: "सर्वोत्तम विकल्प",
    alternative: "वैकल्पिक",
    marketDemand: "बाज़ार की मांग",
    waterRequirement: "पानी की आवश्यकता",
    viewCropDetails: "विवरण देखें",
    seasonalPlanting: "मौसमी रोपण गाइड",
    seasonalPlantingDescription: "इष्टतम विकास के लिए अपनी फसलों को कब लगाएं",
    plantingAdvice: "वर्तमान परिस्थितियों के आधार पर, अब आपके क्षेत्र में गेहूं और चने लगाने का आदर्श समय है।",
    viewCalendar: "रोपण कैलेंडर देखें",
    
    weatherAlert: "मौसम अलर्ट",
    
    community: "समुदाय अपडेट",
    viewCommunity: "अपडेट देखें",
    
    soilHealthSummary: "मिट्टी के स्वास्थ्य का सारांश",
    soilDescription: "वर्तमान मिट्टी के पोषक तत्वों के स्तर और सिफारिशें",
    ph: "pH स्तर",
    moisture: "नमी",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फॉस्फोरस",
    potassium: "पोटैशियम",
    organicMatter: "कार्बनिक पदार्थ",
    
    marketPrices: "वर्तमान बाज़ार मूल्य",
    marketPricesDescription: "नवीनतम फसल मूल्य और बिक्री सिफारिशें",
    currentPrice: "वर्तमान मूल्य",
    recommendation: "सिफारिश",
    nearbyMarket: "आसपास का बाज़ार",
    viewAllPrices: "सभी मूल्य देखें",
    rising: "बढ़ रहा है",
    falling: "गिर रहा है",
    stable: "स्थिर",
    marketTrends: "बाज़ार प्रवृत्ति विश्लेषण",
    marketTrendsDescription: "मूल्य भविष्यवाणियां और सर्वोत्तम बिक्री समय",
    bestTimeToSell: "बेचने का सबसे अच्छा समय",
    marketInsight: "गेहूं के मूल्य आमतौर पर जानेवारीत 5-8% बढ़ जाते हैं। यदि संभव हो तो अपनी फसल को संग्रहित करने पर विचार करें।"
  };

  // Marathi translations
  const mrTranslations = {
    iotData: "आयओटी सेन्सर",
    iotMonitoring: "रियल-टाइम सेन्सर डेटा",
    realTimeReading: "सध्याचे रीडिंग",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    soilMoisture: "मातीची ओलावा",
    sensorDataTrends: "सेन्सर डेटा ट्रेंड्स",
    graphDescription: "कालांतराने पर्यावरणीय परिस्थिती ट्रॅक करणे",
    
    overview: "अवलोकन",
    recommendations: "पिक शिफारसी",
    weather: "हवामान",
    market: "बाजार",
    
    welcomeMessage: "आपल्या शेती डॅशबोर्डवर स्वागत ��हे",
    dashboardDescription: "आपल्या शेताचे आरोग्य, हवामान आणि बाजार परिस्थिती मॉनिटर करा",
    lastActive: "शेवटचे सक्रिय",
    soilHealth: "मातीचे आरोग्य",
    weatherRisk: "हवामान धोका",
    marketCondition: "बाजार परिस्थिती",
    healthy: "निरोगी",
    risk: "धोका",
    
    currentWeather: "सध्याचे हवामान",
    viewForecast: "अंदाज पहा",
    weatherForecast: "हवामान अंदाज",
    weatherForecastDescription: "आपल्या स्थानासाठी 7-दिवसांचा हवामान अंदाज",
    weeklyForecast: "साप्ताहिक अंदाज",
    rain: "पाऊस",
    weatherAlerts: "हवामान अलर्ट",
    rainExpected: "पाऊस अपेक्षित",
    rainAlert: "पुढील 48 तासांत 25-30 मिमी पाऊस अपेक्षित आहे. कोणत्याही बाह्य रासायनिक अनुप्रयोग पुढे ढकलण्याचा विचार करा.",
    inNext: "पुढील",
    hours: "तासांत",
    expectedAmount: "अपेक्षित प्रमाण",
    prepare: "तयारी करा",
    monday: "सोमवार",
    tuesday: "मंगळवार",
    wednesday: "बुधवार",
    thursday: "गुरुवार",
    friday: "शुक्रवार",
    saturday: "शनिवार",
    sunday: "रविवार",
    
    topRecommendation: "उत्तम पीक शिफारस",
    cropRecommendations: "शिफारस केलेली पिके",
    cropRecommendationsDescription: "माती, हवामान आणि बाजार मागणीवर आधारित एआई-शक्तीशाली पीक सूचना",
    confidence: "विश्वास",
    expectedYield: "अपेक्षित उत्पादन",
    seeAllCrops: "सर्व पिके पहा",
    best: "सर्वोत्तम निवड",
    alternative: "पर्यायी",
    marketDemand: "बाजार मागणी",
    waterRequirement: "पाण्याची गरज",
    viewCropDetails: "तपशील पहा",
    seasonalPlanting: "हंगामी लागवड मार्गदर्शक",
    seasonalPlantingDescription: "इष्टतम वाढीसाठी आपली पिके कधी लावावीत",
    plantingAdvice: "सध्याच्या परिस्थितीनुसार, आता आपल्या प्रदेशात गहू आणि हरभरा लावण्याची आदर्श वेळ आहे.",
    viewCalendar: "लागवड कॅलेंडर पहा",
    
    weatherAlert: "हवामान अलर्ट",
    
    community: "समुदाय अपडेट्स",
    viewCommunity: "अपडेट्स पहा",
    
    soilHealthSummary: "मातीच्या आरोग्याचा सारांश",
    soilDescription: "सध्याचे मातीचे पोषक तत्व स्तर आणि शिफारसी",
    ph: "pH स्तर",
    moisture: "ओलावा",
    nitrogen: "नायट्रोजन",
    phosphorus: "फॉस्फोरस",
    potassium: "पोटॅशियम",
    organicMatter: "सेंद्रिय पदार्थ",
    
    marketPrices: "सध्याचे बाजार भाव",
    marketPricesDescription: "नवीनतम पीक किंमती आणि विक्री शिफारसी",
    currentPrice: "सध्याची किंमत",
    recommendation: "शिफारस",
    nearbyMarket: "जवळील बाजार",
    viewAllPrices: "सर्व किंमती पहा",
    rising: "वाढत आहे",
    falling: "घटत आहे", 
    stable: "स्थिर",
    marketTrends: "बाजार ट्रेंड विश्लेषण",
    marketTrendsDescription: "किंमत भाकीत आणि विक्रीचे उत्तम वेळ",
    bestTimeToSell: "विक्रीचा सर्वोत्तम काळ",
    marketInsight: "गव्हाच्या किंमती साधारणपणे जानेवारीत 5-8% वाढतात. शक्य असल्यास आपला उत्पादन साठवण्याचा विचार करा."
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations;
    
    // Navigate through nested keys
    for (const k of keys) {
      if (current[k]) {
        current = current[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Return the translation or key if not found
    if (current[language]) {
      return current[language];
    } else {
      console.warn(`Translation not available in ${language} for key: ${key}`);
      return current.english || key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
