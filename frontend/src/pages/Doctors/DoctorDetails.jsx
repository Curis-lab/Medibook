import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { getDoctorDetails } from "../../apis/doctor";

function DoctorDetails() {
  const [tab, setTab] = useState("about");

  const { id } = useParams();
  const {
    data: doctorInfo,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["doctor", parseInt(id)],
    queryFn: () => getDoctorDetails(id),
  });

  function formatted(result){
    return result.data;
  }
  
  return (
    <section>
      {isLoading && <Loading />}
      {error && <Error errMessage={error} />}
      {isSuccess && (
        <div className="max-w-[1270px] px-5 mx-auto md:flex">
          <div className="flex sm:flex-col">
            <div className="md:col-span-2">
              <div className="md:flex  gap-5 md:min-w-[800px]">
                <figure>
                  <img
                    src={formatted(doctorInfo).photo}
                    alt=""
                    className="w-[300px] h-[300px] object-cover"
                  />
                </figure>
                <div className="my-[15px]">
                  <span className="bg-[#ccf0f3] text-black py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded-full">
                    {formatted(doctorInfo).specialization}
                  </span>
                  <h3 className="text-black text-[22px] leading-9 mt-3 font-bold">
                    {formatted(doctorInfo).name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-black">
                      <FaStar />
                      4.8
                    </span>
                    <span className=" flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-black">
                      (232)
                    </span>
                  </div>
                  <p className="text__parag text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {formatted(doctorInfo).bio}
                  </p>
                </div>
              </div>
              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" && "border-b border-solid border-primary"
                  } py-2 px-5 text-[16px] leading-7 text-black font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" && "border-b border-solid border-primary"
                  } py-2 px-5 text-[16px] leading-7 text-black font-semibold`}
                >
                  Feedback
                </button>
              </div>
              <div className="mt-10">
                {tab === "about" ? (
                  <DoctorAbout {...formatted(doctorInfo)} />
                ) : (
                  <Feedback {...formatted(doctorInfo)} />
                )}
              </div>
            </div>
          </div>
          <SidePanel />
        </div>
      )}
    </section>
  );
}

export default DoctorDetails;
