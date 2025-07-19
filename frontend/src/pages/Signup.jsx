import React, { useState, useRef } from "react";
import { BASE_URL } from "../config";
import registerImage from "../assets/svg/register/register.svg";
import { useMutation } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";

function Signup() {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "patient",
  };
  const navigate = useNavigate();
  const [previewURL, setPreviewURL] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) =>
      fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json()),
    onSuccess: () => navigate("/login"),
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewURL(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  };

  const validateForm = () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      alert("Please select a file to upload");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("image", fileInputRef.current.files[0]);
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    mutate(formDataToSend);
  };

  const renderFormInput = (type, name, placeholder) => (
    <div className="mb-5">
      <input
        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary rounded-md cursor-pointer"
        required
        type={type}
        placeholder={placeholder}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderSelect = (label, name, options) => (
    <label className="text-black font-bold text-[16px] leading-7">
      {label}{" "}
      <select
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="text-black font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <section>
      <div className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block bg-primary rounded-l-[20px]">
              <figure className="rounded-l-lg p-[100px]">
                <img src={registerImage} alt="" />
              </figure>
            </div>
            <div className="rounded-l-lg lg:pl-16 py-10">
              <h3 className="text-black text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-primary">account</span>
              </h3>
              <form onSubmit={submitHandler}>
                {renderFormInput("text", "name", "Name")}
                {renderFormInput("email", "email", "abcd@gmail.com")}
                {renderFormInput("password", "password", "********")}

                <div className="mb-5 flex items-center justify-between">
                  {renderSelect("Are you a:", "role", [
                    { value: "patient", label: "Patient" },
                    { value: "doctor", label: "Doctor" },
                  ])}
                  {renderSelect("Gender:", "gender", [
                    { value: "", label: "Select" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ])}
                </div>

                <div className="mb-5 flex items-center gap-3">
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primary flex items-center justify-center">
                    <img
                      src={
                        previewURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
                      }
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </figure>
                  <div className="relative w-[130px] h-[50px]">
                    <input
                      type="file"
                      name="photo"
                      id="customFile"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept=".jpg, .png"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label
                      htmlFor="customFile"
                      className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-black font-semibold rounded-lg truncate cursor-pointer"
                    >
                      Upload Photo
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn">
                  {isPending ? (
                    <HashLoader size={25} color="#fff" />
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
