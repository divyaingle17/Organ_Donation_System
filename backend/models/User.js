// models/User.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    role: {
      type: String,
      enum: ["donor", "recipient", "hospital", "admin"],
      default: "recipient",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
