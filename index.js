import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());

app.post('/', function (req, res) {
    const name = req.body.name
    const msg = req.body.text
    console.log(name, msg)

    var raw = JSON.stringify({
        "bot_id": process.env.BOT_ID,
        "text": "Hello world2"
    });

    var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.groupme.com/v3/bots/post", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


    res.send("success")
})

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));