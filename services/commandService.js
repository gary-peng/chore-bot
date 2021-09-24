import mongoose from "mongoose";
import { Chore } from "../models/chore.js";

export const create = async () => {
    const chore = new Chore({
        name: 'vacuum',
        assigned: "r1",
        completed: false,
        frequency: "weekly"
    });

    try {
        const dbRes = await chore.save()
    } catch (err) {
        return err
    }
    
    return "Chore created"
}