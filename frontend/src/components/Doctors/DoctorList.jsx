import React from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "./DoctorCard";

function DoctorList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {
        doctors.map((doctor, index)=>(
            <DoctorCard key={index} {...doctor}/>
        ))
      }
    </div>
  );
}

export default DoctorList;
