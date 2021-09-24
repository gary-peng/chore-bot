import schedule from "node-schedule";
import fetch from "node-fetch";
import { dummy } from "./dummy.js"

export const reminder = () => {
    const job = schedule.scheduleJob('* * * * *', function(){
        var text = "Reminder to do your chores:\n"
        dummy.chores.forEach(el => {
            if (!el.status) {
                text += el.name + ": " + el.assigned + "\n"
            }
        });
        
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
    });
}

