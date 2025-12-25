import { useState } from "react";
import api from "../api/api";

export default function DoctorProfileForm({ onSaved }) {
  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    ratePerMinute: "",
    bio: "",
    expertise: "",
    languages: "",
    qualification: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await api.post("/doctors/profile", {
      ...form,
      expertise: form.expertise.split(","),
      languages: form.languages.split(",")
    });

    setLoading(false);
    onSaved();
  };
    
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Complete Your Doctor Profile
      </h2>

      <form onSubmit={submit} className="space-y-3">
        <input name="specialization" placeholder="Specialization" onChange={handleChange} className="input" />
        <input name="experience" placeholder="Experience (years)" onChange={handleChange} className="input" />
        <input name="ratePerMinute" placeholder="Rate per minute" onChange={handleChange} className="input" />
        <input name="qualification" placeholder="Qualification" onChange={handleChange} className="input" />
        <input name="expertise" placeholder="Expertise (comma separated)" onChange={handleChange} className="input" />
        <input name="languages" placeholder="Languages (comma separated)" onChange={handleChange} className="input" />
        <textarea name="bio" placeholder="Short bio" onChange={handleChange} className="input" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
