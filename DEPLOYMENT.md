# 🚀 Deployment Guide (Free Tools)

This guide explains how to deploy the **Telemedicine PWA** using free-tier services.

## 1. 🗄️ Database (MongoDB Atlas)
*   **Service**: **MongoDB Atlas** (Free M0 Sandbox)
*   **Steps**:
    1.  Go to your MongoDB Atlas dashboard.
    2.  Navigate to **Network Access**.
    3.  Add IP Address -> **Allow Access from Anywhere** (`0.0.0.0/0`).
    4.  *(This ensures your cloud backend can connect to the database)*.
    5.  Copy your specific connection string (URI).

## 2. 🔙 Backend (Render.com)
*   **Service**: **Render** (Free Web Service)
*   **Steps**:
    1.  Push your code to **GitHub**.
    2.  Sign up on [Render.com](https://render.com).
    3.  Click **New +** -> **Web Service**.
    4.  Connect your GitHub repository.
    5.  **Settings**:
        *   **Root Directory**: `backend` (Important! Your server is in this folder).
        *   **Build Command**: `npm install`
        *   **Start Command**: `node src/server.js`
    6.  **Environment Variables** (Advanced -> Add Environment Variable):
        *   `MONGO_URI`: *Your MongoDB Connection String*
        *   `JWT_SECRET`: *A secure random string*
        *   `PORT`: `10000` (Render acts as the port manager, but it's good to keep standard).
    7.  Click **Deploy Web Service**.
    8.  **Copy the URL** provided by Render (e.g., `https://telemedicine-api.onrender.com`).

## 3. 🎨 Frontend (Vercel)
*   **Service**: **Vercel** (Free for Hobby)
*   **Steps**:
    1.  Sign up on [Vercel.com](https://vercel.com).
    2.  Click **Add New** -> **Project**.
    3.  Import your GitHub repository.
    4.  **Framework Preset**: Select **Vite**.
    5.  **Root Directory**: Click "Edit" and select `frontend`.
    6.  **Environment Variables**:
        *   `VITE_API_URL`: *Your Render Backend URL* + `/api` (e.g., `https://telemedicine-api.onrender.com/api`).
    7.  Click **Deploy**.

## ✅ Verification
1.  Open your **Vercel URL** (e.g., `https://telemedicine-pwa.vercel.app`).
2.  Try to **Login/Register** (If it fails, check if the Backend on Render is "Live").
3.  Check the browser console for any CORS or connection errors.
