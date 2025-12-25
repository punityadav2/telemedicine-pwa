import { useEffect, useState } from "react";
import api from "../api/api";
import CreateDoctorProfile from "../doctor/CreateDoctorProfile"; // For components that might need it, but here we just list
// Actually we don't need CreateDoctorProfile here.

export default function DoctorList({ onSelectDoctor }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => setError("Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading doctors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (doctors.length === 0) return <p className="text-gray-500">No doctors available.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Available Doctors
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {doctors.map(doc => (
          <div
            key={doc._id}
            className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">
              Dr. {doc.user?.name}
            </h3>

            <p className="text-gray-600 font-medium">
              {doc.specialization}
            </p>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <span>Experience: {doc.experienceYears} years</span>
              <span>•</span>
              <span>₹{doc.consultationRatePerMinute}/min</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className={`px-2 py-1 text-xs rounded ${doc.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {doc.isAvailable ? "Online" : "Offline"}
              </span>
            </div>

            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!doc.isAvailable}
              onClick={() => onSelectDoctor(doc)}
            >
              Start Consultation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
