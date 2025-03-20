import mongoose, { Schema, Document } from 'mongoose';

// Define interface for the IoT Sensor Dat
interface IIoTSensorData extends Document {
    temperature: number;      // Temperature reading in Celsius
    humidity: number;         // Humidity reading in percentage
    soilMoisture: number;     // Soil moisture level in percentage
    recordedAt: Date;         // Timestamp for the data entry
}

// Define the Schema for IoT Sensor Data
const IoTSensorDataSchema = new Schema<IIoTSensorData>({
    temperature: { type: Number, required: false },
    humidity: { type: Number, required: false },
    soilMoisture: { type: Number, required: false },
    recordedAt: { type: Date, default: Date.now }, // Auto-generates timestamp
});

// Create the MongoDB model for IoT Sensor Data
export const IoTSensorData = mongoose.model<IIoTSensorData>('IoTSensorData', IoTSensorDataSchema);
