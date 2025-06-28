import React from "react";
import useFetchData from "../../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Loading from "../../../components/Loader/Loading";
import Error from "../../../components/Error/Error";
import DoctorCard from "../../../components/Doctors/DoctorCard";

function MyBookings() {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/user/appointments/my-appointment`);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center text-primary leading-7 text-[20px] font-semibold ">
          You did not book any doctor yet!
        </h2>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard {...doctor} key={doctor._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
