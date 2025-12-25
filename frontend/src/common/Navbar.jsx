import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-600">
        Telemedicine PWA
      </h1>

      <div className="flex items-center gap-4">
        {role && (
          <span className="text-sm text-gray-600 capitalize">
            Role: {role}
          </span>
        )}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
