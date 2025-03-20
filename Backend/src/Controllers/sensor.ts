import { Request, Response } from 'express';
import { IoTSensorData } from '../Models/liveData';

// @desc Save Sensor Data
// @route POST /sensor
export const saveSensorData = async (req: Request, res: Response): Promise<void> => {
    const { temperature, humidity, soilMoisture } = req.body;

    if (temperature === undefined || humidity === undefined || soilMoisture === undefined) {
        res.status(400).json({ error: '❌ All fields (temperature, humidity, soilMoisture) are required.' });
        return;
    }

    try {
        const newData = new IoTSensorData({ temperature, humidity, soilMoisture });
        await newData.save();
        res.status(201).json({ message: '✅ Data saved successfully' });
        return;
    } catch (error) {
        res.status(500).json({ error: '❌ Error saving data' });
        return;
    }
};

// @desc Fetch All Sensor Data
// @route GET /sensor
export const getAllSensorData = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await IoTSensorData.find().sort({ timestamp: -1 });
        res.status(200).json(data);
        return;
    } catch (error) {
        res.status(500).json({ error: '❌ Error fetching data' });
        return;
    }
};