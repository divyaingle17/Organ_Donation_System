// routes/hospitalRoutes.js
import express from "express";
import {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} from "../controllers/hospitalController.js";

const router = express.Router();

// POST /api/hospitals   → Create new hospital
// GET  /api/hospitals   → Get all hospitals
router.route("/").post(createHospital).get(getHospitals);

// GET /api/hospitals/:id    → Get hospital by ID
// PUT /api/hospitals/:id    → Update hospital
// DELETE /api/hospitals/:id → Delete hospital
router.route("/:id").get(getHospitalById).put(updateHospital).delete(deleteHospital);

export default router;
