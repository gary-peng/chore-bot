import mongoose from "mongoose";
const Schema = mongoose.Schema;

const choreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    assigned: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    day: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Chore = mongoose.model('chore', choreSchema);
