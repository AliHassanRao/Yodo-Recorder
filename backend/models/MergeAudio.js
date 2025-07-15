import mongoose from "mongoose";

const mergeAudioSchema = new mongoose.Schema({
    voiceFile: String,
    bgFile: String,
    mergedFile: String,
});

export default mongoose.model("MergeAudio", mergeAudioSchema);
