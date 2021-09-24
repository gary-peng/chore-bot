import mongoose from "mongoose";
import { Chore } from "../models/chore.js";

export const create = async (msgArr) => {
    const chore = new Chore({
        name: msgArr[2],
        assigned: msgArr[3],
        frequency: msgArr[4],
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

export const todo = async () => {
    let doc;

    try {
        doc = await Chore.find()
    } catch (err) {
        console.log(err)
        return "Error!"
    }

    var text = "Reminder to do your chores:\n"
    doc.forEach(el => {
        if (!el.completed) {
            text += el.name + ": " + el.assigned + "\n"
        }
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