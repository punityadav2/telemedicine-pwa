import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    startTime: {
      type: Date,
      default: Date.now,
    },

    durationMinutes: {
      type: Number,
      required: true,
    },

    amountChargedMinutes: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["started", "completed", "cancelled"],
      default: "completed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", consultationSchema);
