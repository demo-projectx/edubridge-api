import mongoose, { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const StudentDashboardSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stats: { type: Object, required: true },
  notifications: { type: Array, default: [] },
  pendingTasks: { type: Array, default: [] },
}, {
    timestamps: true
}
);

StudentDashboardSchema.plugin(toJSON)

export const StudentDashboardModel = model('StudentDashboard', StudentDashboardSchema);