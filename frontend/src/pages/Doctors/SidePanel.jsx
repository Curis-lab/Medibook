import React, { useState } from "react";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import HashLoader from "react-spinners/HashLoader";
import SlotsSelector from "./SlotsSelector";
import { getDoctorDetails } from "../../apis/doctor";

function SidePanel() {
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const queryClient = useQueryClient();
  const [acceptAppointmentDate, setAcceptAppointmentDate] = useState("");

  // Fetch doctor profile
  const {
    data: doctorProfile,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["user-booking"],
    queryFn:  ()=>getDoctorDetails(id),
  });

  // Handle booking mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${BASE_URL}/bookings/checkout-session/${id}`,
        {
          method: "POST",
          headers: {
            Authentication: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // appointmentDate: acceptAppointmentDate
            appointmentDate: new Date().toISOString(),
          }),
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-appointments"] });
      toast.success(data.message);
      // window.location.href = data.session.url;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const renderTimeSlots = () => {
    if (isLoading) return <Loading />;
    if (error) return <Error errMessage={error} />;
    if (!isSuccess) return null;

    const { timeSlots } = doctorProfile.data;
    return timeSlots.length > 0 ? (
      <SlotsSelector
        slots={timeSlots}
        handleDisabled={setIsDisabled}
        setAcceptAppointmentDate={setAcceptAppointmentDate}
      />
    ) : (
      <p className="font-bold text-center text-red-500 bg-[#f5f6ee] p-2 rounded-md">
        There are no slots available
      </p>
    );
  };

  return (
    <div className="w-1/2 p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__parag mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">
          {isSuccess ? doctorProfile.data.ticketPrice : ""} USD
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__parag mt-0 font-semibold text-black">
          Available Time Slots:
        </p>
        <div className="mt-3">{renderTimeSlots()}</div>
      </div>

      <button
        disabled={isDisabled}
        onClick={mutate}
        className={`btn px-2 w-full rounded-md ${
          isDisabled ? "bg-[#88a7c8]" : ""
        }`}
      >
        {isPending ? (
          <HashLoader size={25} color="#0066ff61" />
        ) : (
          "Book Appointment"
        )}
      </button>
    </div>
  );
}

export default SidePanel;
