import { useEffect, useState } from "react";
import api from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        All Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border text-left">Role</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{u.name}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border capitalize">{u.role}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        u.isActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 border">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
