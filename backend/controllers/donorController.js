// controllers/donorController.js
import Donor from "../models/Donor.js";
import bcrypt from "bcryptjs";

// ✅ Register a new donor
export const registerDonor = async (req, res) => {
  try {
    const { name, email, password, phone, organ, bloodGroup, age, medicalHistory } = req.body;

    // Check if donor already exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const donor = new Donor({
      name,
      email,
      // password: hashedPassword,
      phone,
      organ,
      bloodGroup,
      age,
      medicalHistory,
    });

    await donor.save();
    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single donor by ID
export const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update donor details
export const updateDonor = async (req, res) => {
  try {
    const { name, phone, organ, bloodGroup, age, medicalHistory, availability } = req.body;
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { name, phone, organ, bloodGroup, age, medicalHistory, availability },
      { new: true }
    );
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json({ message: "Donor updated successfully", donor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete donor
export const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
