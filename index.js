import express from "express";
import dotenv from "dotenv";

import router from "./routes/command.js";
import { reminder } from "./utils/reminder.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(router);

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

reminder();