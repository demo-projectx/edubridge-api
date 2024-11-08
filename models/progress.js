import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    grades: [{ subject: String, score: Number }],
    attendance: { type: Number, required: true },
    behavior: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Progress', progressSchema);
