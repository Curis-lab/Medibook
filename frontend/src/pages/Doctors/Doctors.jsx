import React, { useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { useQuery } from "@tanstack/react-query";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import { BASE_URL } from "../../config";

function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedQuery(searchQuery);
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [searchQuery]);


  const {
    data: doctors,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["doctors", debouncedQuery],
    queryFn: async () => {
      const query = debouncedQuery
        ? `?search=${encodeURIComponent(debouncedQuery)}`
        : "";
      const res = await fetch(`${BASE_URL}/doctors${query}`);
      if (!res.ok) throw new Error("Failed to fetch doctors");
      return res.json();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery); 
  };
  return (
    <>
      <section className="bg-[#fff9ea] py-[20px]">
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
          {isSuccess && doctors && doctors.data && doctors.data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
              {doctors.data.map((doctor) => (
                <DoctorCard {...doctor} key={doctor._id} />
              ))}
            </div>
          )}
          {isSuccess &&
            doctors &&
            doctors.data &&
            doctors.data.length === 0 && (
              <div className="text-center mt-10 text-gray-500 font-bold text-red-700">
                No doctors found.
              </div>
            )}
        </div>
      </section>
    </>
  );
}

export default Doctors;
