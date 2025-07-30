import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import styles from "./styles.module.css";

function ServiceCard({ item, idx }) {
  const { name, description, bgColor, textColor } = item;
  return (
    <div className={styles.container}>
      <a href="#">
        <img
          src="https://www.sciencealert.com/images/2020-06/processed/cancer_topic_600.jpg"
          alt=""
        />
      </a>
      <div className={styles.content}>
        <main>
          <h2 className="text-[30px] font-semibold">{name}</h2>
          <p className="text-[#cec7c7]">{description}</p>
        </main>
        <div className={styles.footer}>
          <Link
            to="/doctors"
            className={styles.arrow}
          >
            <BsArrowRight className="group-hover:text-white w-6 h-6" />
          </Link>
          <span
            className="w-[44px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600]"
            style={{
              background: `${bgColor}`,
              color: `${textColor}`,
              borderRadius: "6px 0 0 6px",
            }}
          >
            {idx + 1}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
