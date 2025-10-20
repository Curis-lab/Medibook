export const getCurrentUserProfile = () =>
  fetch(`${import.meta.env.VITE_BASE_URL}/user/profile/me`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());

export const deleteCurrentUserProfile = (id) =>
  fetch(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res);

export const editCurrentPatientProfile = (id, data) =>
  fetch(`${import.meta.VITE_BASE_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
