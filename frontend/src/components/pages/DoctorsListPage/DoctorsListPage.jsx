import { useState } from "react";
import DoctorCard from "../../Doctors/DoctorCard";
import { useAllDoctors } from "../../../hooks/getter/useAllDoctors/useAllDoctors";
import { RenderWithCondition } from "../../common/RenderWithCondition/RenderWithCondition";

function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { doctors, error, isLoading } =
    useAllDoctors(debouncedQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery);
  };

  function formatted(result) {
    return result.data;
  }

  return (
    <div className="min-h-screen">
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
              className="placeholder:text-yellow-500 py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer"
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
          {RenderWithCondition({
            render: () =>
              formatted(doctors).length === 0 ? (
                <div className="text-center mt-10 font-bold text-red-700">
                  No doctors found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                  {doctors.data.map((doctor) => (
                    <DoctorCard {...doctor} key={doctor._id} />
                  ))}
                </div>
              ),
            isLoading,
            error,
          })}
        </div>
      </section>
    </div>
  );
}

export default Doctors;
