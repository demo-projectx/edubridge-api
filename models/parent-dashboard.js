// models/ParentDashboardModel.js
const mongoose = require('mongoose');

const ParentDashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stats: { type: Object, required: true },
  notifications: { type: Array, default: [] },
  pendingTasks: { type: Array, default: [] },
  // Add any additional fields specific to parent data
});

module.exports = mongoose.model('ParentDashboard', ParentDashboardSchema);
