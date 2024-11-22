import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true, // Removes unnecessary whitespace
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true, // Ensures emails are stored in lowercase
            trim: true, // Removes unnecessary whitespace
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: /^[0-9]{10}$/, // Ensures it's exactly 10 numeric digits
            validate: {
              validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Checks if the string is exactly 10 digits
              },
              message: props => `${props.value} is not a valid 10-digit phone number!`,
            },
          },
          
          
          
          
        role: {
            type: String,
            default: "Student", // Default role
            enum: ["Teacher", "Parent", "Student"], // Allowed roles
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Plugin for clean JSON output
userSchema.plugin(toJSON);

// Export the model
export const UserModel = model("User", userSchema);
