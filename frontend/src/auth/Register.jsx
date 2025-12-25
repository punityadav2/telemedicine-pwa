import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
