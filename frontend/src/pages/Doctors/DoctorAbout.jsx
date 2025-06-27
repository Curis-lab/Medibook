import React from "react";
import { formateDate } from "../../utils/formatDAte";

function DoctorAbout({name, about, qualification, experience}) {
  console.log(qualification, experience);
    return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-black font-semibold flex items-center gap-2">
          About of
          <span className="text-primary font-bold text-[24px]">{name}</span>
        </h3>
        <p className="text__para">
            {about}
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-black font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-primary text-[15px] leading-6 font-semibold">
                {formateDate("12-04-2010")} - {formateDate("12-05-2024")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-black">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-black">
              New Apollo Hospital, New York.
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-primary text-[15px] leading-6 font-semibold">
                {formateDate("12-04-2001")} - {formateDate("12-05-2003")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-black">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-black">
              New Apollo Hospital, New York.
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-primary text-[15px] leading-6 font-semibold">
                23 June, 2008
              </span>
              <p className="text-[16px] leading-6 font-medium text-black">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-black">
              New Apollo Hospital, New York.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-12">
        <h1 className="text-[20px] leading-[30px] text-black font-semibold">
          Experience
        </h1>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="text-yellow-600 text-[15px] leading-6 font-semibold bg-[#fff9ea] py-4 px-2 rounded-lg">
            <span className=" text-[15px] leading-6 font-semibold">
              {formateDate("12-04-2010")} - {formateDate("12-05-2024")}
            </span>
            <p className="text-[15px] leading-6 font-medium text-black">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-black">
              New Apollo Hospital, New York.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DoctorAbout;
