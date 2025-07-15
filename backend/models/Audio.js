import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    duration: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Audio', audioSchema);
