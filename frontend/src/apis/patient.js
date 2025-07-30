import { BASE_URL, token } from "../config";

export const getCurrentUserProfile = () =>
  fetch(`${BASE_URL}/user/profile/me`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const deleteCurrentUserProfile = (id) =>
  fetch(`${BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authentication: `Bearer ${token}`,
    },
  }).then((res) => res);

export const editCurrentPatientProfile = (id,data) =>
    fetch(`${BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })