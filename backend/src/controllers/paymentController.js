// import stripe from "../config/stripe.js";
// import Wallet from "../models/Wallet.js";

// // CREATE PAYMENT INTENT
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { minutes } = req.body;
//     const userId = req.user.userId;

//     if (!minutes || minutes <= 0) {
//       return res.status(400).json({ message: "Invalid minutes" });
//     }

//     // pricing logic (example)
//     const pricePerMinute = 10; // ₹10 per minute
//     const amount = minutes * pricePerMinute * 100; // Stripe uses smallest unit

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "inr",
//       metadata: {
//         userId,
//         minutes
//       }
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // CONFIRM PAYMENT (simulate webhook logic)
// export const confirmPayment = async (req, res) => {
//   try {
//     const { minutes } = req.body;
//     const userId = req.user.userId;

//     const wallet = await Wallet.findOne({ user: userId });
//     if (!wallet) {
//       return res.status(404).json({ message: "Wallet not found" });
//     }

//     wallet.balanceMinutes += minutes;
//     await wallet.save();

//     res.json({
//       message: "Payment successful, wallet recharged",
//       balanceMinutes: wallet.balanceMinutes
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
