import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    specialization: {
      type: String,
      enum: [
        "General Physician",
        "Cardiologist",
        "Dermatologist",
        "Orthopedic",
        "Neurologist"
      ],
      required: true
    },

    experienceYears: {
      type: Number,
      required: true
    },

    consultationRatePerMinute: {
      type: Number,
      required: true
    },

    bio: {
      type: String,
      default: ""
    },

    expertise: {
      type: [String],
      default: []
    },

    languages: {
      type: [String],
      default: []
    },

    qualification: {
      type: String,
      default: ""
    },

    averageRating: {
      type: Number,
      default: 0
    },

    totalReviews: {
      type: Number,
      default: 0
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
