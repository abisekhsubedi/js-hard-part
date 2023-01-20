import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
     email: {
        type: String,
        required: true,
        unique: true
     }
})

export default mongoose.model("User", userSchema);
