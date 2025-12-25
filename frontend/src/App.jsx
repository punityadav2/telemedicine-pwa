import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import PatientDashboard from "./patient/PatientDashboard";
import DoctorDashboard from "./doctor/DoctorDashboard";
import AdminDashboard from "./admin/AdminDashboard";

import Navbar from "./common/Navbar";
import ProtectedRoute from "./common/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Doctor */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
