import React, { useState, useRef } from "react";
// import uploadImageKitIO from "../utils/uploadImageKitIO";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
function Profile() {
  const navigate = useNavigate();
  const [previewURL, setPreviewURL] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null, //url for of image
    gender: "",
    bloodType: "",
  });

  const fileInputRef = useRef(null);

  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/auth`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileInput.files[0];
    let authParams;
    try {
      authParams = await authenticator();
    } catch (err) {
      console.error("Failed to authenticate for upload: ", err);
      toast.error("Failed to authenticate for upload");
      return;
    }

    if (!authParams) {
      toast.error("Authentication failed");
      return;
    }

    const { signature, expire, token, publicKey } = authParams;
    let data;
    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        abortSignal: abortController.signal,
      }).catch((error) => {
        throw new Error(error.message);
      });
      data = { ...formData, photo: uploadResponse.url };
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
        toast.error("Upload was cancelled");
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
        toast.error("Invalid upload request");
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
        toast.error("Network error during upload");
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
        toast.error("Server error during upload");
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
        toast.error("Upload failed");
      }
      return; // Exit early if upload fails
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      console.log(result);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewURL(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  };
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary rounded-md cursor-pointer"
            required
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary rounded-md cursor-pointer"
            required
            type="email"
            placeholder="abcd@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary rounded-md cursor-pointer"
            required
            type="text"
            placeholder="Blood Type"
            name="blood"
            value={formData.bloodType}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary rounded-md cursor-pointer"
            required
            type="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-black font-bold text-[16px] leading-7">
            Are you a:{" "}
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
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
              value={formData.gender}
              onChange={handleInputChange}
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
              src={
                previewURL
                  ? previewURL
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
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
          Update
        </button>
      </form>
    </div>
  );
}

export default Profile;
