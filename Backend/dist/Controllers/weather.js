"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = void 0;
const axios_1 = __importDefault(require("axios"));
const weather_model_1 = require("../Models/weather.model");
const getWeatherData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location } = req.query;
    const apiKey = '520a7ced5cef459294262942252003';
    if (!location) {
        res.status(400).json({ message: 'Location is required.' });
        return;
    }
    try {
        const weatherResponse = yield axios_1.default.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`);
        const weatherData = weatherResponse.data;
        const todayWeather = {
            location: weatherData.location.name,
            date: new Date().toISOString().split('T')[0],
            temperature: weatherData.current.temp_c,
            humidity: weatherData.current.humidity
        };
        yield weather_model_1.Weather.create(todayWeather);
        res.status(200).json({
            message: 'Weather data fetched successfully',
            weatherData
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch weather data', error: error.message });
        return;
    }
});
exports.getWeatherData = getWeatherData;
