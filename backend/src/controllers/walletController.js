import Wallet from "../models/Wallet.js";

// CREATE WALLET (called after patient register OR first access)
export const createWalletIfNotExists = async (userId) => {
  let wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    wallet = await Wallet.create({
      user: userId,
      balanceMinutes: 0,
    });
  }

  return wallet;
};

// GET WALLET (Patient)
export const getWallet = async (req, res) => {
  try {
    console.log("Fetching wallet for user:", req.user.userId);
    let wallet = await Wallet.findOne({ user: req.user.userId });

    if (!wallet) {
      console.log("Wallet not found, auto-creating...");
      // Auto-create for existing users who don't have one
      wallet = await createWalletIfNotExists(req.user.userId);
      console.log("Wallet created:", wallet);
    }

    res.json(wallet);
  } catch (error) {
    console.error("Wallet error:", error);
    res.status(500).json({ message: error.message });
  }
};

// RECHARGE WALLET (Mock recharge)
export const rechargeWallet = async (req, res) => {
  try {
    const { minutes } = req.body;

    if (!minutes || minutes <= 0) {
      return res.status(400).json({ message: "Invalid recharge minutes" });
    }

    const wallet = await Wallet.findOne({ user: req.user.userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    wallet.balanceMinutes += minutes;
    await wallet.save();

    res.json({
      message: "Wallet recharged successfully",
      balanceMinutes: wallet.balanceMinutes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
