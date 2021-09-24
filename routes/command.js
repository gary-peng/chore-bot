import express from "express";
import { get, post } from "../controllers/commandController.js";

const router = express.Router();

router.route("/")
    .get(get)
    .post(post);

export default router