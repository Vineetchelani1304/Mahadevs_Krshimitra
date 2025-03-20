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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSensorData = exports.saveSensorData = void 0;
const liveData_1 = require("../Models/liveData");
// @desc Save Sensor Data
// @route POST /sensor
const saveSensorData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { temperature, humidity, soilMoisture } = req.body;
    if (temperature === undefined || humidity === undefined || soilMoisture === undefined) {
        res.status(400).json({ error: '❌ All fields (temperature, humidity, soilMoisture) are required.' });
        return;
    }
    try {
        const newData = new liveData_1.IoTSensorData({ temperature, humidity, soilMoisture });
        yield newData.save();
        res.status(201).json({ message: '✅ Data saved successfully' });
        return;
    }
    catch (error) {
        res.status(500).json({ error: '❌ Error saving data' });
        return;
    }
});
exports.saveSensorData = saveSensorData;
// @desc Fetch All Sensor Data
// @route GET /sensor
const getAllSensorData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield liveData_1.IoTSensorData.find().sort({ timestamp: -1 });
        res.status(200).json(data);
        return;
    }
    catch (error) {
        res.status(500).json({ error: '❌ Error fetching data' });
        return;
    }
});
exports.getAllSensorData = getAllSensorData;
