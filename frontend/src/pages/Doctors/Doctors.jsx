import React from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { BASE_URL } from "../../config";
import { useQuery } from "@tanstack/react-query";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
function Doctors() {
  const {
    data: doctors,
    error,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ["doctor"],
    queryFn: () => fetch(`${BASE_URL}/doctors`).then((res) => res.json()),
  });

  return (
    <>
      <section className="bg-[#fff9ea] py-[20px]">
        <div className="container text-center">
          <h2 className="heading">Find a doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-black"
              placeholder="Search Doctor"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {isLoading && <Loading />}
          {error && <Error errMessage={error} />}
          {
            isSuccess &&(

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {
              doctors.data.map((doctor) => (
                <DoctorCard {...doctor} key={doctor._id} />
              ))}
          </div>
            )
          }
        </div>
      </section>
    </>
  );
}

export default Doctors;
