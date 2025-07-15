import express from 'express';
import multer from 'multer';
import { uploadAudio, getAudios } from '../controllers/audioController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('audio'), uploadAudio);
router.get('/', getAudios);

export default router;
