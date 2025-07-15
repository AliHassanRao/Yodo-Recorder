const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadRecording,
  getRecordings,
  streamRecording
} = require('../controllers/recordingController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/recordings', upload.single('audio'), uploadRecording);
router.get('/recordings', getRecordings);
router.get('/recordings/:id', streamRecording);

module.exports = router;
