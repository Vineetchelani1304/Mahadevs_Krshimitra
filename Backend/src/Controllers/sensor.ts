// import { Request, Response } from 'express';
// import { IoTSensorData } from '../Models/liveData';

// // @desc Save Sensor Data
// // @route POST /sensor
// export const saveSensorData = async (req: Request, res: Response): Promise<void> => {
//     const { temperature, humidity, soilMoisture } = req.body;

//     if (temperature === undefined || humidity === undefined || soilMoisture === undefined) {
//         res.status(400).json({ error: '❌ All fields (temperature, humidity, soilMoisture) are required.' });
//         return;
//     }

//     try {
//         const newData = new IoTSensorData({ temperature, humidity, soilMoisture });
//         await newData.save();
//         res.status(201).json({ message: '✅ Data saved successfully' });
//         return;
//     } catch (error) {
//         res.status(500).json({ error: '❌ Error saving data' });
//         return;
//     }
// };

// // @desc Fetch All Sensor Data
// // @route GET /sensor
// export const getAllSensorData = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const data = await IoTSensorData.find().sort({ timestamp: -1 });
//         res.status(200).json(data);
//         return;
//     } catch (error) {
//         res.status(500).json({ error: '❌ Error fetching data' });
//         return;
//     }
// };





import { Request, Response } from 'express';
import { IoTSensorData } from '../Models/liveData';

// @desc Save Sensor Data (Efficient & Dynamic)
// @route POST /sensor
export const saveSensorData = async (req: Request, res: Response): Promise<void> => {
    const sensorData = req.body;

    if (!sensorData || Object.keys(sensorData).length === 0) {
        res.status(400).json({ error: '❌ Sensor data is required.' });
        return;
    }

    try {
        await IoTSensorData.create(sensorData); // Efficient insert without unnecessary variable storage
        res.status(201).json({ message: '✅ Data saved successfully' });
        return;
    } catch (error) {
        res.status(500).json({ error: '❌ Error saving data', details: (error as Error).message });
        return;
    }
};

// @desc Fetch Recent Sensor Data
// @route GET /sensor
export const getAllSensorData = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await IoTSensorData.find()
            .sort({ timestamp: -1 }) // Sort by latest
            .limit(1000); // Limit to prevent overload

        res.status(200).json(data);
        return;
    } catch (error) {
        res.status(500).json({ error: '❌ Error fetching data', details: (error as Error).message });
        return;
    }
};
