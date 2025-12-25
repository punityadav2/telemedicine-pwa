import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  getAllDoctorsAdmin,
  getAllConsultationsAdmin,
  deleteReviewAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// all admin routes protected
router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.get("/doctors", getAllDoctorsAdmin);
router.get("/consultations", getAllConsultationsAdmin);
router.delete("/reviews/:id", deleteReviewAdmin);

export default router;
