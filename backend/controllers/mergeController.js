import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";


export const mergeAudioFiles = async (req, res) => {
    const voice = req.files.voice[0];
    const bg = req.files.bg[0];

    if (!voice || !bg) {
        return res.status(400).json({ error: "Both audio files are required." });
    }

    const mergedFilename = `merged-${Date.now()}.mp3`;
    const outputPath = path.join("uploads", mergedFilename);

    ffmpeg()
        .input(path.join(voice.path))
        .input(path.join(bg.path))
        .complexFilter([
            "[0:a]volume=1[a0]",
            "[1:a]volume=0.3[a1]",
            "[a0][a1]amix=inputs=2:duration=first:dropout_transition=3"
        ])
        .outputOptions(["-c:a libmp3lame", "-q:a 2"])
        .on("end", async () => {
          
            res.status(200).json({ file: `/uploads/${mergedFilename}` });
        })
        .on("error", (err) => {
            console.error(err);
            res.status(500).json({ error: "Audio merge failed." });
        })
        .save(outputPath);
};
