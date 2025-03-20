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
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, db_1.default)();
app.listen(port, () => {
    console.log("listening on port ", port);
});
app.post('/signup', auth_1.signupFarmer);
app.post('/signin', auth_1.signinFarmer);
app.get('/weather', weather_1.getWeatherData);
