import React from "react";

function Profile() {
  return (
    <div className="px-5 py-8">
      <h2 className="text-black font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form className="max-w-[600px]">
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Name</p>
          <input
            type="text"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Email</p>
          <input
            type="text"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="email"
            placeholder="Email"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Phone *</p>
          <input
            type="number"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="phone"
            placeholder="Phone number"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Bio *</p>
          <input
            type="text"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="bio"
            placeholder="Write your bio"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Specialization *</p>
          <input
            type="text"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="specialization"
            placeholder="Your specialization"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Qualification *</p>
          <input
            type="text"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="qualification"
            placeholder="Your qualifications"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Experience *</p>
          <input
            type="number"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="experience"
            placeholder="Years of experience"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Fees Per Consultation *</p>
          <input
            type="number"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="fee"
            placeholder="Consultation fee"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Available Times *</p>
          <input
            type="text"
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            name="timeSlots"
            placeholder="e.g. 9:00 AM - 5:00 PM"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">Hospital/Clinic Address *</p>
          <textarea
            className="form__input w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer h-[100px] resize-none"
            name="address"
            placeholder="Write your hospital/clinic address"
            value={name}
            onChange={() => {}}
          />
        </div>
        <div className="mt-7">
          <button type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:bg-blue-600 transition-all duration-200">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
