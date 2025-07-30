import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "../../Doctors/DoctorCard";
import Error from "../../Error/Error";
import Loading from "../../Loader/Loading";
import { searchDoctorByQuery } from "../../../apis/doctor";

function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const {
    data: doctors,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["doctors", debouncedQuery],
    queryFn: async () => await searchDoctorByQuery(debouncedQuery),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery);
  };

  function formatted(result) {
    return result.data;
  }

  return (
    <div className="min-h-screen">
      <section className="bg-[#fff9ea] py-[20px] mt-[130px]">
        <div className="container text-center">
          <h2 className="heading">Find a doctor</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between"
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-black"
              placeholder="Search Doctor's name or specialization"
            />
            <button
              type="submit"
              className="btn mt-0 rounded-[0px] rounded-r-md"
            >
              Search
            </button>
          </form>
        </div>
      </section>
      <section>
        <div className="container">
          {isLoading && <Loading />}
          {error && <Error errMessage={error.message || error.toString()} />}
          {isSuccess && formatted(doctors).length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
              {doctors.data.map((doctor) => (
                <DoctorCard {...doctor} key={doctor._id} />
              ))}
            </div>
          )}
          {isSuccess && formatted(doctors).length === 0 && (
            <div className="text-center mt-10 font-bold text-red-700">
              No doctors found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Doctors;
