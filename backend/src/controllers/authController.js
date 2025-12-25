import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../config/jwt.js";
import { createWalletIfNotExists } from "./walletController.js";
// import { sendEmail } from "../services/emailService.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    
    // await sendEmail({
    //   to: email,
    //   subject: "Welcome to Telemedicine App",
    //   text: `Hello ${name},\n\nYour account has been created successfully.\n\nThanks,\nTelemedicine Team`
    // });

    if (role === "patient") {
       await createWalletIfNotExists(user._id);
       }
    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
