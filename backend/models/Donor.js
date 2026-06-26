// models/Donor.js
import mongoose from "mongoose";

const donorSchema = mongoose.Schema(
  {
    // password: { type: String},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    organ: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    age: { type: Number, required: true },
    medicalHistory: { type: String },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Donor", donorSchema);
