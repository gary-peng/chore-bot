import fetch from "node-fetch";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { todo } from "../services/commandService.js";

dotenv.config();

const dbURI = process.env.MONGO_URL;
mongoose
    .connect(dbURI)
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err));


const remind = async () => {
    const text = await todo();

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "bot_id": process.env.BOT_ID,
            "text": text
        }),
        redirect: 'follow'
    };

    fetch("https://api.groupme.com/v3/bots/post", requestOptions)
    .catch(error => console.log('error', error));

    mongoose.disconnect();
}

remind();


