import React from "react";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import HashLoader from "react-spinners/HashLoader";
function SidePanel() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    data: slots,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["user-booking"],
    queryFn: () => fetch(`${BASE_URL}/doctors/${id}`).then((res) => res.json()),
  });
  const { mutate, isPending } = useMutation({
    mutation: async () => {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${id}`, {
        method: "POST",
        headers: {
          Authentication: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.message);
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-appointments"] });
      window.location.href = data.session.url;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div className="w-1/2 p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__parag mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">
          500 USD
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__parag mt-0 font-semibold text-black">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {isLoading && <Loading />}
          {error && <Error errMessage={error} />}
          {isSuccess &&
            slots.data.timeSlots.map((slot, index) => (
              <div key={index}>
                <p className="text-[15px] leading-6 text-black font-semibold ">
                  {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
                </p>
                <li
                  className="flex items-center justify-between mb-2"
                  key={index}
                >
                  <p className="text-[15px] leading-6 text-black font-semibold">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </li>
              </div>
            ))}
        </ul>
      </div>
      <button onClick={() => mutate()} className="btn px-2 w-full rounded-md">
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
