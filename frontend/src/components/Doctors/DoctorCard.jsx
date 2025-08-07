import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import styles from "./styles.module.css";

function DoctorCard({
  _id,
  name,
  specialization,
  totalRating,
  photo,
  totalPatients = 100,
  experiences,
}) {
  return (
    <div className={styles.container}>
      <img src={photo} alt="" />
      <div className={styles.content}>
        <main>
        <h2 className="text[18px] leading-[30px] lg:text-[26px] lg:leading-9 font-[700] mt-3 lg:mt-5">
          {name}
        </h2>
        <div className="flex items-center justify-between">
          <span className="bg-[#2a2c2c] text-[#8f9ba6] py-3 px-2 lg:py-1 lg:px-[10px] text-[15px] rounded-full">
            {specialization}
          </span>
          <span className="text-[15px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-[#ada4a4]">
            rating ({totalRating})
          </span>
        </div>
        </main>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-extralight">
              +{totalPatients} patients
            </h3>
            <p className="text-[14px] leading-6 font-serif">
              {/* At {experiences[0].hospitalName} */}
              
            </p>
          </div>
          <Link
            to={`/doctors/${_id}`}
            className="w-[44px] h-[44px] rounded-full bg-[#0d89dc] flex items-center justify-center  hover:bg-primary hover:border-none"
          >
            <BsArrowRight className="group-hover:text-white w-6 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
