import mongoose from "mongoose";

export const connect = () => mongoose.connect(process.env.MONGODB_URI as string);
