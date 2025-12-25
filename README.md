# 🏥 Telemedicine PWA – Professional Healthcare Platform

A production-grade Telemedicine Progressive Web App (PWA) built with the MERN stack. Designed for scalability, security, and real-world healthcare workflows.

## 🚀 Project Overview

This platform connects patients with doctors for real-time virtual consultations. It features a robust wallet-based billing system, role-based access control, and a seamless consultation flow.

**Key capabilities:**
-   **Patients** can browse doctors, manage a digital wallet, and attend video consultations.
-   **Doctors** can manage their professional profile, set their rates, and toggle online availability.
-   **Security** is enforced via JWT authentication and server-side validation.

---

## ✨ Features (Implemented)

### 1. � Authentication & Security
-   **Secure Login/Register**: JWT-based session management.
-   **Role-Based Access**: Distinct portals for Patients, Doctors, and Admins.
-   **Protected Routes**: Middleware ensures unauthorized access is blocked.

### 2. �‍⚕️ Doctor Ecosystem
-   **Doctor Dashboard**: Central hub for managing practice.
-   **Profile Management**: Edit bio, specialization, experience, and consultation rates.
-   **Availability Toggle**: Real-time "Online/Offline" status switch.
-   **Smart Onboarding**: Flexible profile completion workflow.

### 3. � Patient Ecosystem
-   **Interactive Dashboard**: View available doctors with status badges.
-   **Doctor Discovery**: Filter doctors by specialization.
-   **Wallet System**:
    -   **Auto-Creation**: Wallet initialized on first access.
    -   **Recharge**: Simulate adding funds (+10m, +30m, +60m).
    -   **Balance Check**: Strict validation prevents starting unpaid consultations.

### 4. 🩺 Consultation Engine
-   **Live Session**: Real-time consultation interface.
-   **Video Integration**: Mock WebRTC video window integration.
-   **Timer**: Live duration tracking.
-   **Auto-Billing**: Ending a consultation automatically deducts minutes from the patient's wallet based on duration.

---

## 🛠️ Tech Stack

-   **Frontend**: React.js (Vite), Tailwind CSS, PWA (Manifest + Service Worker)
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB Atlas (Mongoose ODM)
-   **Authentication**: JSON Web Tokens (JWT), BCrypt
-   **Tools**: Postman, VS Code

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
-   Node.js (v18+)
-   MongoDB Atlas Connection String

### 1. Clone the Repository
```bash
git clone <repository-url>
cd telemedicine-pwa-pro1
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Create a `.env` file in the `backend` folder:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Run the Server:**
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

**Run the Frontend:**
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 📖 Usage Guide

### 🟢 Patient Workflow
1.  **Register** as a new user (Role: Patient).
2.  Go to the **Patient Dashboard**.
3.  Check your **Wallet**. Use the "+10m" buttons to add a mock balance.
4.  Find an **Online Doctor** and click **"Start Consultation"**.
5.  Interact with the consultation screen.
6.  Click **"End Consultation"** to finish and pay.

### � Doctor Workflow
1.  **Register** as a new user (Role: Doctor).
2.  Go to the **Doctor Dashboard**.
3.  Click **"Complete Profile"** (or "Edit Profile") to set your details and rate.
4.  Toggle your status to **"Online"** to appear in patient searches.

---

## � Roadmap (Upcoming)
-   **Reviews & Ratings**: Patient feedback system.
-   **Admin Dashboard**: User and verification management.
-   **Real WebRTC**: Replacing mock video window with live streaming.
-   **Notifications**: Email/SMS alerts for appointments.
