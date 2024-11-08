import mongoose, { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const TeacherDashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stats: { type: Object, required: true },
  notifications: { type: Array, default: [] },
  pendingTasks: { type: Array, default: [] },
},{
    timestamps: true
}
);

TeacherDashboardSchema.plugin(toJSON)

export const TeacherDashboardModel = model('TeacherDashboard', TeacherDashboardSchema);