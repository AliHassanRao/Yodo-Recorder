import express from "express";
import multer from "multer";
import { mergeAudioFiles } from "../controllers/mergeController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post(
    "/audio",
    upload.fields([
        { name: "voice", maxCount: 1 },
        { name: "bg", maxCount: 1 },
    ]),
    mergeAudioFiles
);

export default router;
