import mongoose from "mongoose";
import { Request, Response } from "express";
import axios from "axios";
import { Weather } from "../Models/weather.model";
import { Farmer } from "../Models/farmer.model"; // Import Farmer model

export const getWeatherData = async (req: Request, res: Response) => {
    const { farmerId } = req.body; // Assume farmerId is passed as a query parameter
    const apiKey = '520a7ced5cef459294262942252003';

    if (!farmerId) {
        res.status(400).json({ message: 'Farmer ID is required.' });
        return;
    }

    try {
        // Fetch farmer data from the database
        const farmer = await Farmer.findById(farmerId);
        if (!farmer || !farmer.location?.region) {
            res.status(404).json({ message: 'Farmer or region not found.' });
            return;
        }

        const location = farmer.location.region; // Accessing region from the location object

        const weatherResponse = await axios.get<{ 
            location: { name: string }; 
            current: { temp_c: number; humidity: number } 
        }>(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no`
        );

        const weatherData = weatherResponse.data;

        const todayWeather = {
            location: weatherData.location.name,
            date: new Date().toISOString().split('T')[0],
            temperature: weatherData.current.temp_c,
            humidity: weatherData.current.humidity
        };

        await Weather.create(todayWeather);

        res.status(200).json({
            message: 'Weather data fetched successfully',
            weatherData
        });
        return;
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to fetch weather data', 
            error: (error as Error).message 
        });
        return;
    }
};
