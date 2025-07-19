import { BASE_URL } from "../config";

export const getAlldoctors = () =>
  fetch(`${BASE_URL}/doctors`).then((res) => res.json());

export const getDoctorDetails = (id) =>
  fetch(`${BASE_URL}/doctors/${id}`).then((res) => res.json());
