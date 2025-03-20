import express from "express"
import dotenv from "dotenv"
import { signinFarmer, signupFarmer } from "./Controllers/auth";
import { getWeatherData } from "./Controllers/weather";
import connectDB from "./utils/db";
import { getFarmerProfile, updateFarmerProfile } from "./Controllers/profile";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

connectDB();

app.listen(port,()=>{
    console.log("listening on port ",port);
})

app.post('/signup', signupFarmer);
app.post('/signin',signinFarmer)
app.get('/weather',getWeatherData)
app.get('/profile',getFarmerProfile)
app.put('/UpdateProfile',updateFarmerProfile)

