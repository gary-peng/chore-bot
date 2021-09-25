import fetch from "node-fetch";
import { Chore } from "../models/chore.js";
import { Roomatelist } from "../models/roomatelist.js";

export const create = async (msgArr) => {
    const chore = new Chore({
        name: msgArr[2],
        assigned: msgArr[3],
        day: msgArr[4],
        completed: false
    });

    try {
        const doc = await chore.save()
    } catch (err) {
        console.log(err)
        return "Error!"
    }
    
    return "Chore created"
}

export const remove = async (name) => {
    let doc;

    try {
        doc = await Chore.deleteOne({ "name": name });
    } catch (err) {
        console.log(err)
        return "Error!"
    }
    
    return "Chore removed"
}

export const status = async () => {
    let doc;

    try {
        doc = await Chore.find({ "completed": false })
    } catch (err) {
        console.log(err)
        return "Error!"
    }

    var text = "Reminder to do your chores:\n"
    doc.forEach(el => {
        text += el.name + ": @" + el.assigned + "\n"
    });
    
    return text
}

export const list = async () => {
    let doc;

    try {
        doc = await Chore.find()
    } catch (err) {
        console.log(err)
        return "Error!"
    }

    var text = "All chores:\n"
    doc.forEach(el => {
        text += el.name + ": " + el.assigned + "\n"
    });
    
    return text
}

export const complete = async (name) => {
    let doc;

    try {
        doc = await Chore.findOne({ "name": name });
        doc.completed = true;
        await doc.save();
    } catch (err) {
        console.log(err)
        return "Error!"
    }

    return "Thanks for doing your chore"
}

export const todo = async (name) => {
    let roomateArr;
    try {
        const roomatelist = await Roomatelist.findOne();
        roomateArr = roomatelist.names;
    } catch (err) {
        console.log(err);
        return "Error!";
    }

    let chore;
    try {
        chore = await Chore.findOne({ "name": name });
        
        chore.completed = false;

        let i = roomateArr.findIndex(el => el === chore.assigned);
        if (i < roomateArr.length - 1) {
            chore.assigned = roomateArr[i + 1];
        } else {
            chore.assigned = roomateArr[0];
        }

        await chore.save();
    } catch (err) {
        console.log(err);
        return "Error!";
    }

    return name + " has been assigned to " + chore.assigned
}

export const roast = async (name) => {
    const res = await fetch(process.env.ROAST_URL);
    const line = await res.text();
    return name + ",\n" + line
}

