import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import DoctorAbout from "../../../pages/Doctors/DoctorAbout";
import Feedback from "../../../pages/Doctors/Feedback";
import SidePanel from "../../../pages/Doctors/SidePanel";

import Loading from "../../Loader/Loading";
import Error from "../../Error/Error";
import { getDoctorDetails } from "../../../apis/doctor";
import DoctorInfoTemplate from "../../templates/Doctorinfo/DoctorInfo";

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
  return (
    <section className="lg:mt-[150px]">
      {isLoading && <Loading />}
      {error && <Error errMessage={error} />}
      {isSuccess && (
        <div className="max-w-[1270px] px-5 mx-auto md:flex">
          <div className="flex sm:flex-col">
            <div className="md:col-span-2">
              <DoctorInfoTemplate {...doctorInfo.data} />
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
              {/* this is behave like a tab */}
              <div className="mt-10">
                {tab === "about" ? (
                  <DoctorAbout {...doctorInfo.data} />
                ) : (
                  <Feedback {...doctorInfo.data} />
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
