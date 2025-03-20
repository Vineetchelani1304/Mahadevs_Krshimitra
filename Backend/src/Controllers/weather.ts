import mongoose from "mongoose";
import { Request, Response } from "express";
import axios from "axios"
import { Weather } from "../Models/weather.model";

export const getWeatherData = async (req: Request, res: Response) => {
    const { location } = req.query;
    const apiKey = '520a7ced5cef459294262942252003';

    if (!location) {
        res.status(400).json({ message: 'Location is required.' });
        return;
    }

    try {
        const weatherResponse = await axios.get<{ location: { name: string }; current: { temp_c: number; humidity: number } }>(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`
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
        res.status(500).json({ message: 'Failed to fetch weather data', error: (error as Error).message });
        return;
    }
};

