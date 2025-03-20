import express from "express"
import dotenv from "dotenv"
import { signinFarmer, signupFarmer } from "./Controllers/auth";
import { getWeatherData } from "./Controllers/weather";
import connectDB from "./utils/db";
import cors from "cors"
import { getFarmerProfile, updateFarmerProfile } from "./Controllers/profile";
import { authenticateUser } from "./middlewares/auth";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.json()); // For JSON payloads
app.listen(port,()=>{
    console.log("listening on port ",port);
})

app.post('/signup', signupFarmer);
app.post('/signin',signinFarmer)
app.get('/weather',authenticateUser,getWeatherData)
app.get('/profile',authenticateUser,getFarmerProfile)
app.put('/UpdateProfile',authenticateUser,updateFarmerProfile)

