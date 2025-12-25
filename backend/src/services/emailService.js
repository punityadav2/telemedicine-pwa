// // import nodemailer from "nodemailer";

// // export const sendEmail = async ({ to, subject, text }) => {
// //   const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //       user: process.env.EMAIL_USER,
// //       pass: process.env.EMAIL_PASS,
// //     },
// //   });

// //   await transporter.sendMail({
// //     from: `"Telemedicine App" <${process.env.EMAIL_USER}>`,
// //     to,
// //     subject,
// //     text,
// //   });

// //   console.log("Email sent to:", to);
// // };

// import nodemailer from "nodemailer";

// let transporter;

// // Create Ethereal account automatically
// const createTransporter = async () => {
//   if (transporter) return transporter;

//   const testAccount = await nodemailer.createTestAccount();

//   transporter = nodemailer.createTransport({
//     host: testAccount.smtp.host,
//     port: testAccount.smtp.port,
//     secure: testAccount.smtp.secure,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });

//   console.log("📧 Ethereal Email Ready");
//   console.log("Login:", testAccount.user);
//   console.log("Password:", testAccount.pass);

//   return transporter;
// };

// export const sendEmail = async ({ to, subject, text }) => {
//   const transport = await createTransporter();

//   const info = await transport.sendMail({
//     from: '"Telemedicine App" <no-reply@telemed.com>',
//     to,
//     subject,
//     text,
//   });

//   console.log("✅ Email sent");
//   console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));
// };
