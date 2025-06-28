import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
function DoctorDetails() {
  const [tab, setTab] = useState("about");

  const { id } = useParams();
  const [doctorInfo, setDoctorInfo] = useState();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`${BASE_URL}/doctors/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch doctor info");
        }
        const { data } = await res.json();
        setDoctorInfo(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoctor();
  }, []);
  return (
    <section>
      {doctorInfo && (
        <div className="max-w-[1270px] px-5 mx-auto md:flex">
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div
                className="flex items-center gap-5
            "
              >
                <figure>
                  <img
                    src={doctorInfo.photo}
                    alt=""
                  />
                </figure>
                <div>
                  <span className="bg-[#ccf0f3] text-black py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded-full">
                    {doctorInfo.specialization}
                  </span>
                  <h3 className="text-black text-[22px] leading-9 mt-3 font-bold">
                    {doctorInfo.name}
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
                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {doctorInfo.bio}
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
                {tab === "about" ? <DoctorAbout {...doctorInfo} /> : <Feedback {...doctorInfo}/>}
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
