import React from "react";
import { formateDate } from "../../utils/formatDAte";

function DoctorAbout({ name, about, qualifications, experiences }) {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-black font-semibold flex items-center gap-2">
          About of
          <span className="text-primary font-bold text-[24px]">{name}</span>
        </h3>
        <p className="text__parag">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-black font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualifications && qualifications.map((edu, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div>
                <span className="text-primary text-[15px] leading-6 font-semibold">
                  {formateDate(edu.startDate)} - {formateDate(edu.endDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-black">
                  {edu.degree}
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-black">
                {edu.university}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h1 className="text-[20px] leading-[30px] text-black font-semibold">
          Experience
        </h1>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences && experiences.map((exp, idx) => (
            <li
              key={idx}
              className="text-yellow-600 text-[15px] leading-6 font-semibold bg-[#fff9ea] py-4 px-2 rounded-lg"
            >
              <span className=" text-[15px] leading-6 font-semibold">
                {formateDate(exp.startDate)} - {formateDate(exp.endDate)}
              </span>
              <p className="text-[15px] leading-6 font-medium text-black">
                {exp.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-black">
                {exp.hospitalName}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DoctorAbout;
