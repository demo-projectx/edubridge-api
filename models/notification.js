import mongoose from 'mongoose';
import { toJSON } from "@reis/mongoose-to-json";


const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
});

notificationSchema.plugin(toJSON)



const Notification = mongoose.model('Notification', notificationSchema);
export { Notification };




