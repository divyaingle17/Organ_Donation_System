// routes/recipientRoutes.js
import express from "express";
import {
  registerRecipient,
  getAllRecipients,
  getRecipientById,
  updateRecipient,
  deleteRecipient,
} from "../controllers/recipientController.js";

const router = express.Router();

// CREATE
router.post("/", registerRecipient);

// READ
router.get("/", getAllRecipients);
router.get("/:id", getRecipientById);

// UPDATE
router.put("/:id", updateRecipient);

// DELETE
router.delete("/:id", deleteRecipient);

export default router;
