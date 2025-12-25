import Consultation from "../models/Consultation.js";
import Doctor from "../models/Doctor.js";
import Wallet from "../models/Wallet.js";

export const startConsultation = async (req, res) => {
  try {
    const { doctorId } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check patient wallet balance (optional check before start)
    const wallet = await Wallet.findOne({ user: req.user.userId });
    if (!wallet || wallet.balanceMinutes < 5) { // Minimum 5 mins required
      return res.status(400).json({ message: "Insufficient wallet balance (Min 5 mins required)" });
    }

    const consultation = new Consultation({
      patient: req.user.userId,
      doctor: doctorId,
      startTime: new Date(),
      durationMinutes: 0,
      amountChargedMinutes: 0,
      status: "started",
    });

    await consultation.save();

    res.status(201).json({
      message: "Consultation started",
      consultation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const endConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const { durationMinutes } = req.body;

    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    if (consultation.status === "completed") {
      return res.status(400).json({ message: "Consultation already completed" });
    }

    consultation.status = "completed";
    consultation.durationMinutes = durationMinutes;
    consultation.amountChargedMinutes = durationMinutes;

    // Deduct from wallet
    const wallet = await Wallet.findOne({ user: consultation.patient });
    if (wallet) {
      wallet.balanceMinutes -= durationMinutes;
      await wallet.save();
    }

    await consultation.save();

    res.json({
      message: "Consultation ended",
      consultation,
      remainingBalance: wallet ? wallet.balanceMinutes : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
