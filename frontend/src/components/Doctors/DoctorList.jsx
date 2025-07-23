import React from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]";

  const renderDoctors = () => {
    return doctors.map((doctor, index) => (
      <DoctorCard key={doctor.id || index} {...doctor} />
    ));
  };

  return (
    <div className={gridClasses}>
      {renderDoctors()}
    </div>
  );
};

export default DoctorList;
