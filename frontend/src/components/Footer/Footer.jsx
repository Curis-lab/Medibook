import React from "react";
import { FaYoutube } from "react-icons/fa";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
const socialLinks = [
  {
    path: "https://www.youtube.com",
    icon: <FaYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.youtube.com",
    icon: <FaYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.youtube.com",
    icon: <FaYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.youtube.com",
    icon: <FaYoutube className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];
const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request a Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get an Opinion",
  },
];
const quicklinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" className="w-[50px] h-[50px]" />
            <p className="text-[16px] leading-7 font-[400] text-black mt-4">
              Copyright @ {year} developed by min nyan lin all right reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((item, idx) => (
                <Link
                  to={item.path}
                  key={idx}
                  className="h-9 w-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center group hover:bg-primary hover:border-none"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-black">
              Quick links
            </h2>
            <ul>
              {quickLinks01.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-black"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-black">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-black"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-black">
              Support:
            </h2>
            <ul>
              {quicklinks03.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-black"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
