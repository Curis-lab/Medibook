import { BASE_URL, token } from "../config";

export const getAlldoctors = () =>
  fetch(`${BASE_URL}/doctors`).then((res) => res.json());

export const getDoctorDetails = (id) =>
  fetch(`${BASE_URL}/doctors/${id}`).then((res) => res.json());

export const getDoctorProfile = () =>
  fetch(`${BASE_URL}/doctors/profile/me`, {
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${token}`,
    },
  }).then((res) => res.json());
