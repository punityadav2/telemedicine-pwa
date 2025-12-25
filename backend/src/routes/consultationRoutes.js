import express from "express";
import { startConsultation, endConsultation } from "../controllers/consultationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/start",
  protect,
  authorizeRoles("patient"),
  startConsultation
);

router.post(
  "/:id/end",
  protect,
  authorizeRoles("patient"), // Assuming patient ends it for now
  endConsultation
);

export default router;
