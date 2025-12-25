import Doctor from "../models/Doctor.js";

// ✅ CREATE / UPDATE DOCTOR PROFILE (UPSERT)
export const upsertDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user.userId },
      {
        user: req.user.userId,
        specialization: req.body.specialization,
        experienceYears: req.body.experienceYears,
        consultationRatePerMinute: req.body.consultationRatePerMinute,
        bio: req.body.bio || "",
        expertise: req.body.expertise || [],
        languages: req.body.languages || [],
        qualification: req.body.qualification || "",
        isAvailable: false
      },
      { new: true, upsert: true }
    ).populate("user", "name email");

    res.json({
      message: "Doctor profile saved successfully",
      doctor
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET LOGGED-IN DOCTOR PROFILE
export const getMyDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.userId })
      .populate("user", "name email");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL DOCTORS (PATIENT)
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isAvailable: true })
      .populate("user", "name email");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET DOCTOR BY ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("user", "name email");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE AVAILABILITY
export const updateAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.userId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    doctor.isAvailable = !doctor.isAvailable;
    await doctor.save();

    res.json({
      message: "Availability updated",
      isAvailable: doctor.isAvailable
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
