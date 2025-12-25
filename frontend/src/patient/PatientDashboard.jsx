import { useState } from "react";
import Wallet from "./Wallet";
import DoctorList from "./DoctorList";
import Consultation from "./Consultation";

export default function PatientDashboard() {
  const [activeDoctor, setActiveDoctor] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Patient Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Wallet />
        </div>

        <div className="md:col-span-2">
          {activeDoctor ? (
            <Consultation
              doctor={activeDoctor}
              onBack={() => setActiveDoctor(null)}
            />
          ) : (
            <DoctorList onSelectDoctor={setActiveDoctor} />
          )}
        </div>
      </div>
    </div>
  );
}
