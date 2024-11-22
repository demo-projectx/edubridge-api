import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set to the current date/time
  },
  isRead: {
    type: Boolean,
    default: false, // Default value is false
  },
});

// Optional: Customize the returned JSON when querying the database
messageSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Map `_id` to `id` for better frontend compatibility
    delete ret._id; // Remove MongoDB's `_id`
    delete ret.__v; // Remove version key
    return ret;
  },
});

export const MessageModel = model('Message', messageSchema);
