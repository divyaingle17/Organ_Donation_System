// controllers/recipientController.js
import Recipient from "../models/Recipient.js";
import bcrypt from "bcryptjs";
import Donor from "../models/Donor.js";

// ✅ Register a new recipient
export const registerRecipient = async (req, res) => {
  try {
    const { name, email, password, phone, requiredOrgan, bloodGroup, urgencyLevel, hospital } = req.body;

    // Check if already exists
    const existing = await Recipient.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const recipient = new Recipient({
      name,
      email,
      // password: hashedPassword,
      phone,
      requiredOrgan,
      bloodGroup,
      urgencyLevel,
      hospital,
    });

    await recipient.save();
    res.status(201).json({ message: "Recipient registered successfully", recipient });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all recipients
export const getAllRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.status(200).json(recipients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single recipient by ID
export const getRecipientById = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id).populate("hospital", "name address");
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });
    res.status(200).json(recipient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update recipient
// export const updateRecipient = async (req, res) => {
//   try {
//     const { name, phone, requiredOrgan, bloodGroup, urgencyLevel, hospital, status } = req.body;
//     const recipient = await Recipient.findByIdAndUpdate(
//       req.params.id,
//       { name, phone, requiredOrgan, bloodGroup, urgencyLevel, hospital, status },
//       { new: true }
//     );
//     if (!recipient) return res.status(404).json({ message: "Recipient not found" });
//     res.status(200).json({ message: "Recipient updated successfully", recipient });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const updateRecipient = async (req, res) => {
  try {
    const {  status } = req.body;

    // Find the recipient by ID
    const recipient = await Recipient.findById(req.params.id);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    // If status is being updated to "Matched", also update donor availability
    if (status === "Matched") {
      // Find an available donor matching organ and blood group
      const donor = await Donor.findOne({
        organ: recipient.requiredOrgan,
        bloodGroup: recipient.bloodGroup,
        availability: true,
      });

      if (!donor) {
        return res.status(400).json({ message: "No available donor found for this organ" });
      }

      // Update donor availability to false
      donor.availability = false;
      await donor.save();

      // Update recipient status to Matched
      recipient.status = "Matched";
    } else {
      // Update recipient status as provided
      recipient.status = status || recipient.status;
    }


    await recipient.save();

    res.status(200).json({ message: "Recipient updated successfully", recipient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete recipient
export const deleteRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.findByIdAndDelete(req.params.id);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });
    res.status(200).json({ message: "Recipient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
