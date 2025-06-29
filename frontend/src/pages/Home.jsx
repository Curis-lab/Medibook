import React from "react";
import doctor from "../assets/svg/hero/findDoctor.svg";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import ServiceLIst from "../components/Services/ServiceLIst";
function Home() {
  return (
    <>
      {/** =========== hero section ============ */}
      <section className="pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/**========== hero content ============ */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-black font-[800] md:text-[60px] md:leading-[70px]">
                  We help patients live a helthy, longer life.
                </h1>
                <p className="text__parag">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta voluptates, distinctio dolorum blanditiis ratione
                  numquam deserunt rem, repudiandae, cumque quos eius? Rem
                  ratione quos eius soluta. Rem ratione quos eius soluta.
                </p>
                <button className="btn">Request an Appointment</button>
              </div>
              {/**===== hero counter ============ */}

              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[65px] lg:text-[44px] lg:leading-[54px] font-[700] text-black">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-amber-500 rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Years of Experience</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[65px] lg:text-[44px] lg:leading-[54px] font-[700] text-black">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-pink-800 rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Clinic Locations</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[65px] lg:text-[44px] lg:leading-[54px] font-[700] text-black">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-red-900 rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="flex gap-[30px] justify-end">
              <div>
                <img
                  src="https://www.shutterstock.com/image-photo/african-american-male-doctor-using-600nw-2262624635.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto ">
            <h2 className="text-center text-[36px]">
              Providing the best medical services
            </h2>
            <p className="" text__para>
              Expert healthcare for all. We provide top-quality medical services
              and innovative treatments to improve lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] Jg:mt-[55px] ">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={doctor} alt="doctor images" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-black font-[700] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center">
                  Find expert doctors across all specialties. Our easy search
                  helps match you with the right physician for your needs.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={doctor} alt="doctor images" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-black font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center">
                  Find convenient locations near you with modern facilities and
                  expert staff. Get easy access to directions, hours and contact
                  details for quality care close to home.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={doctor} alt="doctor images" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-black font-[700] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-black font-[400] mt-4 text-center">
                  Book your appointments online quickly and easily. Choose from
                  available time slots that work for you, with same-day options
                  available.
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Medical Services</h2>
            <p className="text__para text-center">
World-class healthcare services delivered with compassion. We provide comprehensive medical care including specialized treatments, preventive services, and innovative procedures to ensure your optimal health and well-being.
            </p>
          </div>
          <ServiceLIst/>
        </div>
      </section>
    </>
  );
}

export default Home;
