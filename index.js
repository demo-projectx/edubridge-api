import express from "express";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);

const app = express();
