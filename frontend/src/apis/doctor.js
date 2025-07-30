import { BASE_URL, token } from "../config";


export const getAlldoctors = () =>
  fetch(`${BASE_URL}/doctors`).then((res) => res.json());

export const getDoctorDetails = (id) =>
  fetch(`${BASE_URL}/doctors/${id}`).then((res) => res.json());

export const editDoctorProfile = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/doctors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const deleteDoctorAccount = async (id) =>
  await fetch(`${BASE_URL}/doctors/${id}`, {
    method: "DELETE",
    headers: {
      Authentication: `Bearer ${token}`,
    },
  });
export const getDoctorProfile = () =>
  fetch(`${BASE_URL}/doctors/profile/me`, {
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const searchDoctorByQuery = async (debouncedQuery) => {
  const query = debouncedQuery
    ? `?search=${encodeURIComponent(debouncedQuery)}`
    : "";
  const res = await fetch(`${BASE_URL}/doctors${query}`);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};

export const getDoctorProfileAppointment = () =>
  fetch(`${BASE_URL}/doctors/appointments-list/me`, {
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${token}`,
    },
  }).then((res) => res.json());
