import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/command.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const dbURI = process.env.MONGO_URL;
mongoose
    .connect(dbURI)
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(router);

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));