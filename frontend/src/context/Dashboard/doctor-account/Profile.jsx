import React, { useState, useEffect } from "react";
import { BASE_URL, token, user } from "../../../config";
import { toast } from "react-toastify";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";

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

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ticketPrice: "",
    specialization: "",
    // qualifications: []
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
  });
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
      queryClient.invalidateQueries({queryKey: ['doctor']});
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const fetchData = ()=>{
      fetch(`${BASE_URL}/doctors/profile/me`, {
        headers: {
          Authentication: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          const { data } = result;
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
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name.startsWith("qualifications.")) {
      const field = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        qualifications: {
          ...formData.qualifications,
          [field]: e.target.value,
        },
      });
    } else if (e.target.name.startsWith("experiences.")) {
      const field = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        experiences: {
          ...formData.experiences,
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
          {/* dropdown for specialization, gender, tickket price* */}
          <div className="mb-5 w-1/2">
            <p className="form__label text-[16px] font-semibold text-textColor mb-2">
              Gender *
            </p>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-5 w-1/2">
            <p className="form__label text-[16px] font-semibold text-textColor mb-2">
              Specialization *
            </p>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            >
              <option value="">Select</option>
              <option value="surgeon">Surgeon</option>
              <option value="neurologist">Neurologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="pediatrician">Pediatrician</option>
              <option value="cardiologist">Cardiologist</option>
            </select>
          </div>

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
          <div className="grid grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="qualifications.university"
                placeholder="University/College"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer mb-5"
                value={formData.qualifications.university}
                onChange={handleChange}
              />
              <input
                type="date"
                name="qualifications.startDate"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
                value={formData.qualifications.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="qualifications.degree"
                placeholder="Degree"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer mb-5"
                value={formData.qualifications.degree}
                onChange={handleChange}
              />
              <input
                type="date"
                name="qualifications.endDate"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
                value={formData.qualifications.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">
            Experiences *
          </p>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="experiences.hospitalName"
                placeholder="Hospital/Clinic Name"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer mb-5"
                value={formData.experiences.hospitalName}
                onChange={handleChange}
              />
              <input
                type="date"
                name="experiences.startDate"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
                value={formData.experiences.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="experiences.position"
                placeholder="Position"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer mb-5"
                value={formData.experiences.position}
                onChange={handleChange}
              />
              <input
                type="date"
                name="experiences.endDate"
                className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
                value={formData.experiences.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label text-[16px] font-semibold text-textColor mb-2">
            Time Slots *
          </p>
          <div className="flex items-center gap-5">
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
            >
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>

            <input
              type="time"
              name="startTime"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
              value={formData.startTime}
              onChange={handleChange}
            />

            <input
              type="time"
              name="endTime"
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
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
