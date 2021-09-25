import dotenv from "dotenv";
import mongoose from "mongoose";
import { remind, rotate } from './tasks.js'

dotenv.config();

const dbURI = process.env.MONGO_URL;

try {
    await mongoose.connect(dbURI)
    console.log('Connected to db')
} catch (err) {
    console.log(err);
}


await remind();
await rotate();

mongoose.disconnect();