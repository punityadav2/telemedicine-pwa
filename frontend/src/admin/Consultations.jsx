import { useEffect, useState } from "react";
import api from "../api/api";

export default function Consultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/consultations")
      .then(res => setConsultations(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading consultations...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Consultations
      </h2>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Patient</th>
              <th className="p-3 border">Doctor</th>
              <th className="p-3 border">Minutes</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map(c => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="p-3 border">
                  {c.patient?.name || "N/A"}
                </td>
                <td className="p-3 border">
                  {c.doctor?.user?.name || "N/A"}
                </td>
                <td className="p-3 border">
                  {c.minutes}
                </td>
                <td className="p-3 border capitalize">
                  {c.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
