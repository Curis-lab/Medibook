import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";

import FormInput from "./profile/FormInput";
import FormLabel from "./profile/FormLabel";
import FormGroup from "./profile/FormGroup";
import LabelAndInput from "./profile/LabelAndInput";
import SelectInput from "./profile/SelectInput";
import QualificationCard from "./profile/QualificationCard";
import ExperienceCard from "./profile/ExperienceCard";
import TimeSlotCard from "./profile/TimeSlotCard";
import DateInputGroup from "./profile/DateInputGroup";

import { editDoctorProfile, getDoctorProfile } from "../../../apis/doctor";

function Profile() {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    ticketPrice: "",
    specialization: "",
    qualifications: [],
    experiences: [],
    bio: "",
    about: "",
    timeSlots: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [timeSlot, setTimeSlot] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const [qualifications, setQualifications] = useState({
    university: "",
    degree: "",
    startDate: "",
    endDate: "",
  });

  const [experiences, setExperiences] = useState({
    hospitalName: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const doctorInfo = await editDoctorProfile(formData);
      return doctorInfo;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const {
    data: doctorData,
    isError,
    error,
  } = useQuery({
    queryKey: ["doctor"],
    queryFn: getDoctorProfile,
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
        qualifications: [...data.qualifications],
        experiences: [...data.experiences],
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
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleTimeSlot = (e) => {
    setTimeSlot((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addQualifications = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, qualifications],
    }));
    setQualifications({
      degree: "",
      university: "",
      startDate: "",
      endDate: "",
    });
  };

  const addExperiences = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, experiences],
    }));
    setExperiences({
      hospitalName: "",
      position: "",
      startDate: "",
      endDate: "",
    });
  };

  const addTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, timeSlot],
    }));
    // setTimeSlot({ day: "monday" });
  };

  const formFields = [
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
      label: "Bio *",
    },
  ];

  const selectOptions = {
    gender: [
      { value: "", label: "Select" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
    specialization: [
      { value: "", label: "Select" },
      { value: "surgeon", label: "Surgeon" },
      { value: "neurologist", label: "Neurologist" },
      { value: "dermatologist", label: "Dermatologist" },
      { value: "pediatrician", label: "Pediatrician" },
      { value: "cardiologist", label: "Cardiologist" },
    ],
    days: [
      { value: "", label: "Select Day" },
      { value: "monday", label: "Monday" },
      { value: "tuesday", label: "Tuesday" },
      { value: "wednesday", label: "Wednesday" },
      { value: "thursday", label: "Thursday" },
      { value: "friday", label: "Friday" },
      { value: "saturday", label: "Saturday" },
      { value: "sunday", label: "Sunday" },
    ],
  };

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
        {formFields.map((field, idx) => (
          <LabelAndInput key={idx} {...field} />
        ))}

        <div className="flex gap-5">
          <SelectInput
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
            options={selectOptions.gender}
            className="w-1/2"
          />

          <SelectInput
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            label="Specialization"
            options={selectOptions.specialization}
            className="w-1/2"
          />

          <FormGroup label="Ticket Price *" className="w-1/2">
            <FormInput
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              placeholder="100"
            />
          </FormGroup>
        </div>

        <FormGroup label="Qualifications *">
          {formData.qualifications.length > 0 && (
            <div className="mb-5">
              {formData.qualifications.map((qual, index) => (
                <QualificationCard key={index} {...qual} />
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <FormInput
                type="text"
                name="university"
                placeholder="University/College"
                className="mb-5"
                value={qualifications.university}
                onChange={(e) =>
                  setQualifications((prev) => ({
                    ...prev,
                    university: e.target.value,
                  }))
                }
              />
              <FormInput
                type="date"
                name="startDate"
                value={qualifications.startDate}
                onChange={(e) =>
                  setQualifications((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <FormInput
                type="text"
                name="degree"
                placeholder="Degree"
                className="mb-5"
                value={qualifications.degree}
                onChange={(e) =>
                  setQualifications((prev) => ({
                    ...prev,
                    degree: e.target.value,
                  }))
                }
              />
              <FormInput
                type="date"
                name="endDate"
                value={qualifications.endDate}
                onChange={(e) =>
                  setQualifications((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>
            <button className="btn" onClick={addQualifications}>
              Add Qualification
            </button>
          </div>
        </FormGroup>

        <FormGroup label="Experiences *">
          {formData.experiences.length > 0 && (
            <div className="mb-5">
              {formData.experiences.map((exp, index) => (
                <ExperienceCard key={index} {...exp} />
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <FormInput
                type="text"
                name="hospitalName"
                placeholder="Hospital Name"
                className="mb-5"
                value={experiences.hospitalName}
                onChange={(e) =>
                  setExperiences((prev) => ({
                    ...prev,
                    hospitalName: e.target.value,
                  }))
                }
              />
              <FormInput
                type="date"
                name="startDate"
                value={experiences.startDate}
                onChange={(e) =>
                  setExperiences((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <FormInput
                type="text"
                name="position"
                placeholder="Position"
                className="mb-5"
                value={experiences.position}
                onChange={(e) =>
                  setExperiences((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
              />
              <FormInput
                type="date"
                name="endDate"
                value={experiences.endDate}
                onChange={(e) =>
                  setExperiences((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>
            <button className="btn" onClick={addExperiences}>
              Add Experience
            </button>
          </div>
        </FormGroup>

        <FormGroup label="Time Slots *">
          <div className="mb-5">
            {formData.timeSlots.map((slot, index) => (
              <TimeSlotCard key={index} {...slot} />
            ))}
          </div>

          <div className="flex items-center gap-5">
            <SelectInput
              name="day"
              value={timeSlot.day}
              onChange={handleTimeSlot}
              options={selectOptions.days}
            />
            <FormInput
              type="time"
              name="startTime"
              value={timeSlot.startTime}
              onChange={handleTimeSlot}
            />
            <FormInput
              type="time"
              name="endTime"
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
        </FormGroup>

        <FormGroup label="About">
          <textarea
            name="about"
            rows="5"
            value={formData.about}
            onChange={handleChange}
            placeholder="Write about yourself"
            className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
          ></textarea>
        </FormGroup>

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
