import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config";

function Appointments() {
  const {
    data: appointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/doctors/appointments-list/me`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      return result.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching appointments</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {appointments?.map((appointment) => (
        <div key={appointment.id} className="p-2 w-full bg-[#e1e5eb] rounded-md">
          <div className="flex">
            <img
              src={appointment.patientPhoto}
              className="w-[70px] h-[70px] rounded-full object-cover"
              alt="photo"
            />
            <div className="px-3">
              <h3 className="font-bold text-xl">{appointment.name}</h3>
              <p>Time: {new Date(appointment.time).toLocaleString()}</p>
              <p>Gender: {appointment.gender}</p>
              <p>Blood Type: {appointment.patientBloodType}</p>
              <p>Phone: {appointment.patientPhone}</p>
              <p>
                Payment Status: {appointment.paidStatus ? "Paid" : "Pending"}
              </p>
            </div>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
}

export default Appointments;
