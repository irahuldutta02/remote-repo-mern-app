import express from "express";
import { getRepoByLanguage } from "../controllers/explore.controller.js";

const router = express.Router();

router.get("/repos/:language", getRepoByLanguage);

export default router;
