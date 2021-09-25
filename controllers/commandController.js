import fetch from "node-fetch";
import { complete, create, status, todo, list, remove, roast } from "../services/commandService.js";


export const get = (req, res) => {
    res.send('hello world');
}

export const post = async (req, res) => {
    const name = req.body.name;
    const msg = req.body.text;
    // console.log(name, msg);

    const msgArr = msg.toLowerCase().split(" ");

    if (msgArr[0] !== "chorebot") {
        res.send("other msg");
        return;
    }

    const command = msgArr[1];
    var text = "Unknown command";
    switch (command) {
        case "echo":
            text = msgArr[2];
        break;
        case "create":
            text = await create(msgArr);
        break;
        case "remove":
            text = await remove(msgArr[2]);
        break;
        case "status":
            text = await status();
        break;
        case "list":
            text = await list();
        break;
        case "complete":
            text = await complete(msgArr[2]);
        break;
        case "todo":
            text = await todo(msgArr[2])
        break;
        case "roast":
            text = await roast(msgArr[2])
        break;
    }
        
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
    // .then(response => response.text())
    // .then(result => console.log(result))
    .catch(error => console.log('error', error));

    res.send("success");
}