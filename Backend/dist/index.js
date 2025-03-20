"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./Controllers/auth");
const weather_1 = require("./Controllers/weather");
const db_1 = __importDefault(require("./utils/db"));
const cors_1 = __importDefault(require("cors"));
const profile_1 = require("./Controllers/profile");
const auth_2 = require("./middlewares/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // For JSON payloads
app.listen(port, () => {
    console.log("listening on port ", port);
});
app.post('/signup', auth_1.signupFarmer);
app.post('/signin', auth_1.signinFarmer);
app.get('/weather', auth_2.authenticateUser, weather_1.getWeatherData);
app.get('/profile', auth_2.authenticateUser, profile_1.getFarmerProfile);
app.put('/UpdateProfile', auth_2.authenticateUser, profile_1.updateFarmerProfile);
