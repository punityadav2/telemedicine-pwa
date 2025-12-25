import { useEffect, useState } from "react";
import api from "../api/api";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/wallet")
      .then(res => setWallet(res.data))
      .catch(err => console.error("Failed to load wallet", err))
      .finally(() => setLoading(false));
  }, []);

  const handleRecharge = async (minutes) => {
    try {
      setLoading(true);
      const res = await api.post("/wallet/recharge", { minutes });
      setWallet(prev => ({ ...prev, balanceMinutes: res.data.balanceMinutes }));
      alert(`Successfully added ${minutes} minutes!`);
    } catch (err) {
      console.error("Recharge failed", err);
      alert("Recharge failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="bg-white rounded-xl shadow p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  if (!wallet) return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-red-500">Failed to load wallet</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Wallet Balance
      </h2>

      <p className="text-3xl font-bold text-green-600">
        {wallet.balanceMinutes} mins
      </p>

      <p className="text-sm text-gray-500 mt-1 mb-4">
        Available consultation time
      </p>

      <div className="border-t pt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Add Balance:</p>
        <div className="flex gap-2">
          {[10, 30, 60].map(mins => (
            <button
              key={mins}
              onClick={() => handleRecharge(mins)}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              +{mins}m
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
