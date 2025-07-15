const Recording = require('../models/Recording');
const path = require('path');

exports.uploadRecording = async (req, res) => {
  try {
    const file = req.file;
    const rec = new Recording({
      filename: file.filename,
      originalName: file.originalname,
    });
    const saved = await rec.save();
    res.json({ recording: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecordings = async (req, res) => {
  try {
    const recs = await Recording.find().sort('-createdAt');
    res.json({ recordings: recs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.streamRecording = async (req, res) => {
  const rec = await Recording.findById(req.params.id);
  if (!rec) return res.status(404).json({ error: 'Not found' });
  const filepath = path.join(__dirname, '..', 'uploads', rec.filename);
  res.sendFile(filepath);
};
