import express from "express";
import { getWallet, rechargeWallet } from "../controllers/walletController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Patient wallet
router.get("/", protect, authorizeRoles("patient"), getWallet);

// Recharge wallet (mock)
router.post("/recharge", protect, authorizeRoles("patient"), rechargeWallet);

export default router;
