import { useEffect, useState } from "react";
import api from "../api/api";
import CreateDoctorProfile from "./CreateDoctorProfile";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/doctors/me")
      .then(res => setDoctor(res.data))
      .catch(err => {
        if (err.response?.status === 404) {
          setDoctor(null); // profile not created yet
        } else {
          setError("Failed to load doctor profile");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleAvailability = async () => {
    try {
      const res = await api.put("/doctors/availability");
      setDoctor(prev => ({
        ...prev,
        isAvailable: res.data.isAvailable
      }));
    } catch {
      alert("Failed to update availability");
    }
  };

  /* ---------------- STATES ---------------- */
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading doctor dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  /* ---------------- EDIT MODE ---------------- */
  if (isEditing) {
    return (
      <div className="p-6">
        <button
          onClick={() => setIsEditing(false)}
          className="mb-4 text-blue-600 underline"
        >
          &larr; Back to Dashboard
        </button>
        <CreateDoctorProfile
          initialData={doctor}
          onSuccess={(updatedDoctor) => {
            setDoctor(updatedDoctor);
            setIsEditing(false);
          }}
        />
      </div>
    );
  }

  /* ---------------- PROFILE NOT CREATED ---------------- */
  if (!doctor) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Profile Incomplete</h2>
          <p className="text-yellow-700 mb-4">You need to complete your profile to start accepting consultations.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Complete Profile Now
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- DASHBOARD ---------------- */

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Doctor Dashboard
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 font-medium hover:underline"
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <p className="text-xl font-medium">
          Dr. {doctor.user?.name}
        </p>

        <p className="text-gray-600 mt-1">
          {doctor.specialization}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Experience: {doctor.experienceYears} years
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Rate: ₹{doctor.consultationRatePerMinute}/min
        </p>

        <div className="mt-6 flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded text-white text-sm ${doctor.isAvailable ? "bg-green-500" : "bg-gray-400"
              }`}
          >
            {doctor.isAvailable ? "Online" : "Offline"}
          </span>

          <button
            onClick={toggleAvailability}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Toggle Availability
          </button>
        </div>
      </div>
    </div>
  );
}
