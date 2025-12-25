import { useState, useEffect, useRef } from "react";
import api from "../api/api";

export default function Consultation({ doctor, onBack }) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [consultationId, setConsultationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, started, completed
    const [error, setError] = useState("");

    const intervalRef = useRef(null);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const startConsultation = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.post("/consultations/start", {
                doctorId: doctor._id
            });

            setConsultationId(res.data.consultation._id);
            setStatus("started");

            // Open WebRTC call page
            const token = localStorage.getItem("token");
            const roomId = `consult-${res.data.consultation._id}`;

            window.open(
                `/video-call.html?roomId=${roomId}&token=${token}`,
                "_blank"
            );

            // Start Timer
            intervalRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev === 59) {
                        setMinutes(m => m + 1);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to start consultation");
        } finally {
            setLoading(false);
        }
    };

    const endConsultation = async () => {
        try {
            setLoading(true);
            clearInterval(intervalRef.current);

            const res = await api.post(`/consultations/${consultationId}/end`, {
                durationMinutes: Math.ceil(minutes + seconds / 60)
            });

            setStatus("completed");
            alert(`Consultation ended. Remaining Balance: ${res.data.remainingBalance} mins`);

        } catch (err) {
            setError("Failed to end consultation");
            // resume timer if failed? For now just show error.
        } finally {
            setLoading(false);
        }
    };

    if (status === "completed") {
        return (
            <div className="text-center p-10 bg-white rounded-xl shadow">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Consultation Completed</h2>
                <p className="mb-6">Total duration: {minutes} mins {seconds} secs</p>
                <button onClick={onBack} className="bg-blue-600 text-white px-6 py-2 rounded text-lg">
                    Back to Dashboard
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="text-gray-500 hover:text-black">
                    &larr; Back
                </button>
                <div className="text-right">
                    <h2 className="text-xl font-bold">Dr. {doctor.user?.name}</h2>
                    <p className="text-gray-600">{doctor.specialization}</p>
                </div>
            </div>

            <div className="text-center py-10">

                {status === "idle" && (
                    <div className="space-y-6">
                        <div className="text-6xl text-blue-500 mb-4">🩺</div>
                        <p className="text-lg text-gray-700">
                            You are about to start a consultation with <b>Dr. {doctor.user?.name}</b>.
                        </p>
                        <p className="text-sm text-gray-500">
                            Rate: ₹{doctor.consultationRatePerMinute}/min • Please ensure you have sufficient wallet balance.
                        </p>

                        {error && <p className="text-red-500">{error}</p>}

                        <button
                            onClick={startConsultation}
                            disabled={loading}
                            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Starting..." : "Start Consultation Now"}
                        </button>
                    </div>
                )}

                {status === "started" && (
                    <div className="space-y-6">
                        <div className="animate-pulse text-green-500 text-xl font-bold mb-2">
                            ● Live Consultation
                        </div>

                        <div className="text-5xl font-mono tabular-nums text-gray-800">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>

                        <p className="text-gray-500">
                            Video call window should be open.
                        </p>

                        {error && <p className="text-red-500">{error}</p>}

                        <button
                            onClick={endConsultation}
                            disabled={loading}
                            className="bg-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Ending..." : "End Consultation"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
