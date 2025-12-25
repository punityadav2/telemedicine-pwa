// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";
// import {
//   createPaymentIntent,
//   confirmPayment
// } from "../controllers/paymentController.js";

// const router = express.Router();

// router.post(
//   "/create-intent",
//   protect,
//   authorizeRoles("patient"),
//   createPaymentIntent
// );

// router.post(
//   "/confirm",
//   protect,
//   authorizeRoles("patient"),
//   confirmPayment
// );

// export default router;
