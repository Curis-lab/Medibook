import React from "react";
import Loading from "../../../components/Loader/Loading";
import Error from "../../../components/Error/Error";
import DoctorCard from "../../../components/Doctors/DoctorCard";
import { useQuery } from "@tanstack/react-query";
import { getCurrrentUserAppointment } from "../../../apis/booking";

function MyBookings() {
  const {
    data: myProfile,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["user-appointments"],
    queryFn: getCurrrentUserAppointment,
  });
  return (
    <div>
      {isLoading && <Loading />}
      {error && <Error errMessage={error} />}
      {isSuccess && myProfile?.data && myProfile.data.length === 0 && (
        <h2 className="mt-5 text-center text-primary leading-7 text-[20px] font-semibold ">
          You did not book any doctor yet!
        </h2>
      )}
      {isSuccess && myProfile?.data && myProfile.data.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-[20px]">
          {myProfile.data.map((doctor) => (
            <DoctorCard {...doctor} key={doctor._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
