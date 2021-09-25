import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomatelistSchema = new Schema({
    names: [String]
}, { timestamps: true });

export const Roomatelist = mongoose.model('roomatelist', roomatelistSchema);
