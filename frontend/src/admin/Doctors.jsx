import { useEffect, useState } from "react";
import api from "../api/api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/admin/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Doctors</h2>

      <ul className="space-y-2">
        {doctors.map(d => (
          <li key={d._id} className="bg-white p-4 rounded shadow">
            <p className="font-medium">{d.user?.name}</p>
            <p className="text-sm text-gray-500">
              {d.specialization || "General"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
