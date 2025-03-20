import { IoTSensorData } from "../Models/liveData";
import { Request, Response } from 'express';
// @desc Save Sensor Data
// @route POST /sensor
exports.saveSensorData = async (req:Request,res:Response) => {
    try {
        const { temperature, humidity, soilMoisture } = req.body;
        const newData = new IoTSensorData({ temperature, humidity, soilMoisture });
        await newData.save();
        res.status(201).json({ message: '✅ Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: '❌ Error saving data' });
    }
};

// @desc Fetch All Sensor Data
// @route GET /sensor
exports.getAllSensorData = async (req:Request,res:Response) => {
    try {
        const data = await IoTSensorData.find().sort({ timestamp: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: '❌ Error fetching data' });
    }
};