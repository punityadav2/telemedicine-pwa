import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  getMyDoctorProfile,
  updateAvailability,
  upsertDoctorProfile
} from "../controllers/doctorController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===============================
   DOCTOR ROUTES (FINAL & CORRECT)
   =============================== */

// 1️⃣ Create / Update doctor profile (STATIC)
router.post(
  "/profile",
  protect,
  authorizeRoles("doctor"),
  upsertDoctorProfile
);

// 2️⃣ Get logged-in doctor's profile (STATIC)
router.get(
  "/me",
  protect,
  authorizeRoles("doctor"),
  getMyDoctorProfile
);

// 3️⃣ Update availability (STATIC – NO ID)
router.put(
  "/availability",
  protect,
  authorizeRoles("doctor"),
  updateAvailability
);

// 4️⃣ Patient sees all doctors
router.get(
  "/",
  protect,
  authorizeRoles("patient"),
  getAllDoctors
);

// 5️⃣ Get doctor by ID (DYNAMIC – MUST BE LAST)
router.get(
  "/:id",
  protect,
  getDoctorById
);

export default router;
