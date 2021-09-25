import { status, todo } from "../services/commandService.js";
import { Chore } from "../models/chore.js";
import fetch from "node-fetch";

export const remind = async () => {
    const text = await status();

    if (text !== "Reminder to do your chores:\n") {
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
    }
}


export const rotate = async () => {
    const dayTable = {
        0: "Sunday",
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
    }
    const day = new Date().getDay();
    console.log(dayTable[day])

    let doc;

    try {
        doc = await Chore.find({ "day": dayTable[day] })
    } catch (err) {
        console.log(err)
    }

    if (doc != undefined) {
        await Promise.all(doc.map(async (el) => {
            const text = await todo(el.name);

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
        }));
    }
}




