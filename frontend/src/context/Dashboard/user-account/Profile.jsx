import React, { useState, useRef, useEffect } from "react";

import { toast } from "react-toastify";
import handleFileUpload from "../../../hooks/useFileUploader";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  editCurrentPatientProfile,
  getCurrentUserProfile,
} from "../../../apis/patient";
import { user } from "../../../utils/user";

function Profile() {
  const [previewURL, setPreviewURL] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    photo: null, 
    gender: "",
    bloodType: "",
    role: "patient",
  });

  const {
    data: userProfile,
    error,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["profile", user._id],
    queryFn: getCurrentUserProfile,
  });
  const { mutate: updateProfile } = useMutation({
    mutationFn: (data) => editCurrentPatientProfile(user._id, data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Profile updated successfully!");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData) {
      return;
    }

    try {
      const { name, password, gender, role, bloodType } = formData;

      const data = {
        name,
        password,
        gender,
        role,
        bloodType,
      };

      if (selectedImage) {
        const uploadResponse = await handleFileUpload(selectedImage);
        data.photo = uploadResponse.url;
      }

      updateProfile(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewURL(previewUrl);
      setSelectedImage(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData((prev) => ({
        ...prev,
        ...userProfile.data,
        role: userProfile.data.role || "patient",
      }));
    }
    if (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile data");
    }
  }, [userProfile, error, isSuccess]);

  return (
    <div>
      {isLoading && <div>...loading</div>}
      {error && <div>...error</div>}
      {isSuccess && (
        <form action="" onSubmit={submitHandler}>
          <input
            className="w-full mb-5 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary cursor-pointer"
            required
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleFormInputChange}
          />
          <input
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary mb-5 cursor-pointer"
            required
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType || ""}
            onChange={handleFormInputChange}
          />
          <input
            className="w-full mb-5 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary cursor-pointer"
            required
            type="password"
            placeholder="********"
            name="password"
            value={formData.password || ""}
            onChange={handleFormInputChange}
          />
          <div className="mb-5 flex items-center justify-between">
            <label className="text-black font-bold text-[16px] leading-7">
              Are you a:{" "}
              <select
                name="role"
                value={formData.role || "patient"}
                onChange={handleFormInputChange}
                className="text-black font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>
            <label className="text-black font-bold text-[16px] leading-7">
              Gender:{" "}
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleFormInputChange}
                className="text-black font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="mb-5 flex items-center gap-3">
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primary flex items-center justify-center">
              <img
                src={previewURL || formData.photo || undefined}
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
                onChange={handleImageUpload}
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
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
