import Audio from '../models/Audio.js';

export const uploadAudio = async (req, res) => {
    try {
        const { filename, path } = req.file;
        const { duration } = req.body;
        const audio = await Audio.create({
            filename,
            filepath: path,
            duration,
        });
        res.status(201).json(audio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAudios = async (req, res) => {
    try {
        const audios = await Audio.find().sort({ createdAt: -1 });
        res.json(audios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
