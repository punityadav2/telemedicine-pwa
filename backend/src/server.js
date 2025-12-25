import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect db
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes); // ✅ THIS WAS MISSING

// health
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
