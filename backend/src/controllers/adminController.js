import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Consultation from "../models/Consultation.js";
import Review from "../models/Review.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllDoctorsAdmin = async (req, res) => {
  const doctors = await Doctor.find().populate("user");
  res.json(doctors);
};

export const getAllConsultationsAdmin = async (req, res) => {
  const consultations = await Consultation.find()
    .populate("patient doctor");
  res.json(consultations);
};

export const deleteReviewAdmin = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};
