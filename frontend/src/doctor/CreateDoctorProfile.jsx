import { useState } from "react";
import api from "../api/api";

export default function CreateDoctorProfile({ onSuccess, initialData = null }) {
    const [form, setForm] = useState({
        specialization: initialData?.specialization || "",
        experienceYears: initialData?.experienceYears || "",
        expertise: initialData?.expertise?.join(", ") || "",
        languages: initialData?.languages?.join(", ") || "",
        qualification: initialData?.qualification || "",
        bio: initialData?.bio || "",
        consultationRatePerMinute: initialData?.consultationRatePerMinute || ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.post("/doctors/profile", {
                specialization: form.specialization,
                experienceYears: Number(form.experienceYears),
                consultationRatePerMinute: Number(form.consultationRatePerMinute),
                bio: form.bio,
                qualification: form.qualification,
                languages: form.languages
                    .split(",")
                    .map(e => e.trim())
                    .filter(Boolean),
                expertise: form.expertise
                    .split(",")
                    .map(e => e.trim())
                    .filter(Boolean)
            });

            onSuccess(res.data); // update dashboard without reload
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-xl">
            <h2 className="text-xl font-bold mb-4">
                Complete Doctor Profile
            </h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {loading && <p className="text-gray-500 mb-2">Saving...</p>}

            <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Bio / About Me"
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
            />

            <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Qualification (e.g. MBBS, MD)"
                value={form.qualification}
                onChange={e => setForm({ ...form, qualification: e.target.value })}
            />

            <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Specialization (e.g. Cardiologist)"
                value={form.specialization}
                onChange={e => setForm({ ...form, specialization: e.target.value })}
            />

            <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Experience (years)"
                type="number"
                value={form.experienceYears}
                onChange={e => setForm({ ...form, experienceYears: e.target.value })}
            />

            <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Languages (comma separated)"
                value={form.languages}
                onChange={e => setForm({ ...form, languages: e.target.value })}
            />

            <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Expertise (comma separated)"
                value={form.expertise}
                onChange={e => setForm({ ...form, expertise: e.target.value })}
            />

            <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Rate per minute"
                type="number"
                value={form.consultationRatePerMinute}
                onChange={e =>
                    setForm({ ...form, consultationRatePerMinute: e.target.value })
                }
            />

            <button
                onClick={submit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Save Profile
            </button>
        </div>
    );
}
