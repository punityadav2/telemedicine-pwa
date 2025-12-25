import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="bg-white rounded shadow p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-gray-500 mt-1">
            View all registered users
          </p>
        </Link>

        <Link
          to="/admin/doctors"
          className="bg-white rounded shadow p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-medium">Doctors</h3>
          <p className="text-gray-500 mt-1">
            Doctor profiles & availability
          </p>
        </Link>

        <Link
          to="/admin/consultations"
          className="bg-white rounded shadow p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-medium">Consultations</h3>
          <p className="text-gray-500 mt-1">
            Consultation records
          </p>
        </Link>
      </div>
    </div>
  );
}
