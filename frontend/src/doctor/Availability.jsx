import { useState } from "react";
import api from "../api/api";

export default function Availability({ doctorId, initialStatus }) {
  const [isAvailable, setIsAvailable] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const toggleAvailability = async () => {
    try {
      setLoading(true);

      const res = await api.put(`/doctors/${doctorId}/availability`, {
        isAvailable: !isAvailable,
      });

      setIsAvailable(res.data.isAvailable);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.box}>
      <h3>Status: {isAvailable ? "🟢 Online" : "🔴 Offline"}</h3>

      <button onClick={toggleAvailability} disabled={loading}>
        {loading
          ? "Updating..."
          : isAvailable
          ? "Go Offline"
          : "Go Online"}
      </button>
    </div>
  );
}

const styles = {
  box: {
    border: "1px solid #ccc",
    padding: "15px",
    marginTop: "20px",
    maxWidth: "300px",
  },
};
