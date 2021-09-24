import fetch from "node-fetch";

export const get = (req, res) => {
    res.send('hello world')
}

export const post = (req, res) => {
    const name = req.body.name
    const msg = req.body.text
    console.log(name, msg)

    const msgArr = msg.split(" ")

    if (msgArr[0] !== "chorebot") {
        res.send("other msg")
        return
    }

    const command = msgArr[1]
    var text = "unknown command"
    switch (command) {
        case "echo":
            text = msgArr[2]
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
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    res.send("success")
}