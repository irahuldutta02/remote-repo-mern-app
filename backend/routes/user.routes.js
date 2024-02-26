import express from "express";
import { getUserProfileAndRepos } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
// TODO => Likes (who like our )
// TODO => Like a profile (Post like)

export default router;
