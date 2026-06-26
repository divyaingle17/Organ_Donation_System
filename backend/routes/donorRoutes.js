// routes/donorRoutes.js
import express from "express";
import {
  registerDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} from "../controllers/donorController.js";

const router = express.Router();

// CREATE
router.post("/", registerDonor);

// READ
router.get("/", getAllDonors);
router.get("/:id", getDonorById);

// UPDATE
router.put("/:id", updateDonor);

// DELETE
router.delete("/:id", deleteDonor);

export default router;
