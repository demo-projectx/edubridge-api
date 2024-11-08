import mongoose, { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";




const ParentDashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stats: { type: Object, required: true },
  notifications: { type: Array, default: [] },
  pendingTasks: { type: Array, default: [] },
});

ParentDashboardSchema.plugin(toJSON)



export const ParentDashboardModel = model('ParentDashboard', ParentDashboardSchema);
