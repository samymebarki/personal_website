'use client';

import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Thermometer } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temp: '21°C',
    condition: 'Sunny',
    location: 'Paris',
  });
  
  // Simulate weather conditions randomly changing
  useEffect(() => {
    const conditions = ['Sunny', 'Cloudy', 'Rainy'];
    const temps = ['18°C', '21°C', '24°C', '27°C'];
    const locations = ['Paris', 'New York', 'Tokyo', 'London'];
    
    const interval = setInterval(() => {
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = temps[Math.floor(Math.random() * temps.length)];
      
      setWeather({
        temp: randomTemp,
        condition: randomCondition,
        location: weather.location,
      });
    }, 60000); // Change every minute
    
    return () => clearInterval(interval);
  }, [weather.location]);
  
  const getWeatherIcon = () => {
    switch(weather.condition) {
      case 'Sunny':
        return <Sun className="h-4 w-4 text-[#503822]" />;
      case 'Cloudy':
        return <Cloud className="h-4 w-4 text-[#503822]" />;
      case 'Rainy':
        return <CloudRain className="h-4 w-4 text-[#503822]" />;
      default:
        return <Thermometer className="h-4 w-4 text-[#503822]" />;
    }
  };
  
  const [showWidget, setShowWidget] = useState(true);
  
  // Handle scroll behavior to match logo and menu button
  useEffect(() => {
    const handleScroll = () => {
      setShowWidget(window.scrollY < 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`inline-flex items-center px-3 py-1 text-xs font-serif border-l-2 border-[#503822] transition-opacity duration-300 ${showWidget ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mr-2 opacity-90">{getWeatherIcon()}</div>
      <div className="flex flex-col">
        <span className="font-semibold tracking-tight">{weather.temp} | {weather.condition}</span>
        <span className="text-[10px] uppercase tracking-widest">{weather.location} FORECAST</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
