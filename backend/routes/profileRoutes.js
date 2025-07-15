import express from "express";
import { getProfile } from "../controllers/profileControllers.js";
import { verifyAccessToken } from "../middlewares/UserAuth.js";

const router = express.Router();


router.get("/", verifyAccessToken, getProfile);

export default router;
