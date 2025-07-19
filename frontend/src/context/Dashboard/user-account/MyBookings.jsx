import React, { useContext } from "react";
import { BASE_URL } from "../../../config";
import Loading from "../../../components/Loader/Loading";
import Error from "../../../components/Error/Error";
import DoctorCard from "../../../components/Doctors/DoctorCard";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "../../AuthContext";

function MyBookings() {
  const { token } = useContext(authContext);
  const {
    data: myProfile,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["user-appointments"],
    queryFn: () =>
      fetch(`${BASE_URL}/user/appointments/my-appointment`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });
  console.log("myprofile", myProfile);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {myProfile.data.map((doctor) => (
            <DoctorCard {...doctor} key={doctor._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
