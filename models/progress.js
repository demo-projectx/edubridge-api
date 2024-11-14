import mongoose from 'mongoose';
import { toJSON } from "@reis/mongoose-to-json";


const progressSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    grades: [{ subject: String, score: Number }],
    attendance: { type: Number, required: true },
    behavior: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

progressSchema.plugin(toJSON)


export default mongoose.model('Progress', progressSchema);
