import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

export const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pin: { type: String }, // New field for storing the generated PIN
    role: { type: String, default: 'Student', enum: ['Teacher', 'Parent', 'Student'] }
}, {
    timestamps: true
});

userSchema.plugin(toJSON);

export const UserModel = model('user', userSchema);
