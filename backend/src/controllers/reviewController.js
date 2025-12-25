import Review from "../models/Review.js";
import Consultation from "../models/Consultation.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const { consultationId, rating, comment } = req.body;
    const patientId = req.user.userId;

    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    if (consultation.patient.toString() !== patientId) {
      return res.status(403).json({ message: "Not your consultation" });
    }

    if (consultation.status !== "completed") {
      return res.status(400).json({ message: "Consultation not completed" });
    }

    const existing = await Review.findOne({ consultation: consultationId });
    if (existing) {
      return res.status(400).json({ message: "Review already submitted" });
    }

    const review = await Review.create({
      consultation: consultationId,
      doctor: consultation.doctor,
      patient: patientId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review submitted",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
