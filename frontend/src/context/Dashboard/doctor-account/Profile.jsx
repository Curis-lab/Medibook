import React, { useState, useEffect } from "react";
import { BASE_URL, token, user } from "../../../config";
import { toast } from "react-toastify";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";

// Reusable input component
const LabelAndInput = ({ onChange, value, name, label, type, placeholder }) => (
  <div className="mb-5">
    <p className="text-[16px] font-semibold text-textColor mb-2">{label}</p>
    <input
      type={type}
      className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable select component
const SelectInput = ({ name, value, onChange, label, options }) => (
  <div className="mb-5 w-1/2">
    <p className="form__label text-[16px] font-semibold text-textColor mb-2">
      {label} *
    </p>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Reusable date input group component
const DateInputGroup = ({ prefix, formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-5">
    <div>
      <input
        type="text"
        name={`${prefix}.university`}
        placeholder="University/College"
        className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer mb-5"
        value={formData[prefix].university}
        onChange={handleChange}
      />
      <input
        type="date"
        name={`${prefix}.startDate`}
        className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
        value={formData[prefix].startDate}
        onChange={handleChange}
      />
    </div>
    <div>
      <input
        type="text"
        name={`${prefix}.degree`}
        placeholder="Degree"
        className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer mb-5"
        value={formData[prefix].degree}
        onChange={handleChange}
      />
      <input
        type="date"
        name={`${prefix}.endDate`}
        className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
        value={formData[prefix].endDate}
        onChange={handleChange}
      />
    </div>
  </div>
);

function Profile() {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    ticketPrice: "",
    specialization: "",
    qualifications: {
      university: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
    experiences: {
      hospitalName: "",
      position: "",
      startDate: "",
      endDate: "",
    },
    bio: "",
    about: "",
    timeSlots: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [timeSlot, setTimeSlot] = useState({ day: "" });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    data: doctorData,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/doctors/profile/me`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      return result;
    },
  });

  useEffect(() => {
    if (doctorData) {
      const { data } = doctorData;
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        ticketPrice: data.ticketPrice,
        specialization: data.specialization,
        qualifications: {
          university: data.qualifications?.university || "",
          degree: data.qualifications?.degree || "",
          startDate: data.qualifications?.startDate || "",
          endDate: data.qualifications?.endDate || "",
        },
        experiences: {
          hospitalName: data.experiences?.hospitalName || "",
          position: data.experiences?.position || "",
          startDate: data.experiences?.startDate || "",
          endDate: data.experiences?.endDate || "",
        },
        bio: data.bio,
        about: data.about,
        timeSlots: data.timeSlots || [],
      });
    }
  }, [doctorData]);

  if (isError) {
    toast.error(error.message);
  }

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name.includes(".")) {
      const [section, field] = e.target.name.split(".");
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleTimeSlot = (e) => {
    e.preventDefault();
    console.log("timeslot", e.target.value);
    setTimeSlot({ ...timeSlot, [e.target.name]: e.target.value });
  };

  const addTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, timeSlot],
    }));
    setTimeSlot({ day: "" }); // Reset time slot after adding
  };

  const requestInfos = [
    {
      onChange: handleChange,
      value: formData.name,
      type: "text",
      placeholder: "Full Name",
      name: "name",
      label: "Name",
    },
    {
      onChange: handleChange,
      value: formData.email,
      type: "email",
      placeholder: "Email",
      name: "email",
      label: "Email",
    },
    {
      onChange: handleChange,
      value: formData.phone,
      type: "text",
      placeholder: "Phone Number",
      name: "phone",
      label: "Phone *",
    },
    {
      onChange: handleChange,
      value: formData.bio,
      type: "text",
      placeholder: "Bio",
      name: "bio",
      label: "Bio*",
    },
  ];

  const genderOptions = [
    { value: "", label: "Select" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const specializationOptions = [
    { value: "", label: "Select" },
    { value: "surgeon", label: "Surgeon" },
    { value: "neurologist", label: "Neurologist" },
    { value: "dermatologist", label: "Dermatologist" },
    { value: "pediatrician", label: "Pediatrician" },
    { value: "cardiologist", label: "Cardiologist" },
  ];

  const dayOptions = [
    { value: "", label: "Select Day" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  return (
    <div className="px-5 py-8">
      <h2 className="text-black font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(formData);
        }}
        className="max-w-[600px]"
      >
        {requestInfos.map((info, idx) => (
          <LabelAndInput {...info} key={idx} />
        ))}

        <div className="flex gap-5">
          <SelectInput
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
            options={genderOptions}
          />

          <SelectInput
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            label="Specialization"
            options={specializationOptions}
          />

          <div className="mb-5 w-1/2">
            <p className="form__label text-[16px] font-semibold text-textColor mb-2">
              Ticket Price *
            </p>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              placeholder="100"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">
            Qualifications *
          </p>
          <DateInputGroup
            prefix="qualifications"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">
            Experiences *
          </p>
          <DateInputGroup
            prefix="experiences"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">
            Time Slots *
          </p>
          <div className="mb-5">
            {formData.timeSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2 bg-[#0066ff1a] p-2 rounded-md"
              >
                <div className="flex items-center gap-[10px]">
                  <p className="text-[15px] leading-6 text-textColor font-semibold capitalize">
                    {slot.day}:
                  </p>
                  <p className="text-[15px] leading-6 text-textColor">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5">
            
            <SelectInput
              name="day"
              value={timeSlot.day}
              onChange={handleTimeSlot}
              label=""
              options={dayOptions}
            /> 
            <input
              type="time"
              name="startTime"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
              value={timeSlot.startTime}
              onChange={handleTimeSlot}
            />

            <input
              type="time"
              name="endTime"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
              value={timeSlot.endTime}
              onChange={handleTimeSlot}
            />
          </div>
          <button
            type="button"
            onClick={addTimeSlot}
            className="bg-blue-400 px-2 py-1 rounded-[4px]"
          >
            Add
          </button>
        </div>

        <div className="mb-5">
          <p className="text-[16px] font-semibold text-textColor mb-2">About</p>
          <textarea
            name="about"
            rows="5"
            value={formData.about}
            onChange={handleChange}
            placeholder="Write about yourself"
            className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
          ></textarea>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            className="w-full bg-primary text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:bg-blue-600 transition-all duration-200"
          >
            {isPending ? (
              <HashLoader size={25} color="#0066ff61" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
