import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../Loader/Loading";
import Error from "../../Error/Error";
import Tabs from "../../../context/Dashboard/doctor-account/Tabs";
import Profile from "../../../context/Dashboard/doctor-account/Profile";
import Appointments from "../../../context/Dashboard/doctor-account/Appointments";

import DoctorAbout from "../../../pages/Doctors/DoctorAbout";
import SelectTimeSlot from "../../../context/Dashboard/doctor-account/select-timeslot/SelectTimeSlot";

import { getDoctorProfile } from "../../../apis/doctor";
import DoctorInfoTemplate from "../../templates/Doctorinfo/DoctorInfo";
import Wranning from "../../templates/Warnning/Wranning";

function Dashboard() {
  const {
    data: doctorProfile,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["doctor-profile"],
    queryFn: () => getDoctorProfile(),
  });
  const [tab, setTab] = useState("overview");

  return (
    <section>
      <div className="max-w-[95%] mx-auto p-2">
        {isLoading && <Loading />}
        {error && <Error errMessage={error} />}
        {isSuccess && (
          <div className="grid lg:grid-cols-4 gap-[30px] lg:gap-[50px] p-2">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {doctorProfile.data.isApproved === "pending" && (
                <Wranning
                  title="Info"
                  description="To get approval within 3 days, please complete your profile.
              We'll review and verify your information as soon as
                  possible."
                />
              )}
              <div className="mt-8">
                {tab === "overview" && (
                  <>
                    <DoctorInfoTemplate {...doctorProfile.data} />
                    <DoctorAbout {...doctorProfile.data} />
                  </>
                )}
                {tab === "appointments" && <Appointments />}
                {tab === "settings" && <Profile />}
                {tab === "timeslot" && <SelectTimeSlot />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
