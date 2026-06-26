// controllers/hospitalController.js
import Hospital from "../models/Hospital.js";

// @desc    Register new hospital
// @route   POST /api/hospitals
// @access  Public (or Protected if admin-only)
export const createHospital = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;

    // check if hospital already exists
    const exists = await Hospital.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Hospital already exists" });
    }

    const hospital = await Hospital.create({ name, email, address, phone });
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Error creating hospital", error: error.message });
  }
};

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hospitals", error: error.message });
  }
};

// @desc    Get hospital by ID
// @route   GET /api/hospitals/:id
// @access  Public
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hospital", error: error.message });
  }
};

// @desc    Update hospital details
// @route   PUT /api/hospitals/:id
// @access  Protected (Admin or Hospital itself)
export const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.name = req.body.name || hospital.name;
    hospital.email = req.body.email || hospital.email;
    hospital.address = req.body.address || hospital.address;
    hospital.phone = req.body.phone || hospital.phone;
    if (req.body.verified !== undefined) {
      hospital.verified = req.body.verified;
    }

    const updatedHospital = await hospital.save();
    res.json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: "Error updating hospital", error: error.message });
  }
};

// @desc    Delete hospital
// @route   DELETE /api/hospitals/:id
// @access  Protected (Admin only)
export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    await hospital.deleteOne();
    res.json({ message: "Hospital removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hospital", error: error.message });
  }
};
