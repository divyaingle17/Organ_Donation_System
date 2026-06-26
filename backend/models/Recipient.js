// models/Recipient.js
import mongoose from "mongoose";

const recipientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String, required: true },
    requiredOrgan: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    urgencyLevel: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    status: { type: String, enum: ["Pending", "Matched", "Completed"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Recipient", recipientSchema);
