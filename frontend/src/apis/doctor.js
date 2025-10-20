const controller = new AbortController();

export const getAlldoctors = () => {
  const result = fetch(`${import.meta.env.VITE_BASE_URL}/doctors`, {
    signal: controller.signal,
  }).then((res) => res.json());
  controller.abort();
  return result;
};

export const getDoctorDetails = (id) =>
  fetch(`${import.meta.env.VITE_BASE_URL}/doctors/${id}`).then((res) =>
    res.json()
  );

export const editDoctorProfile = async (formData) => {
  const res = await fetch(`${import.meta.env.BASE_URL}/doctors`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const deleteDoctorAccount = async (id) =>
  await fetch(`${import.meta.env.VITE_BASE_URL}/doctors/${id}`, {
    method: "DELETE",
    headers: {
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const getDoctorProfile = () =>
  fetch(`${import.meta.env.VITE_BASE_URL}/doctors/profile/me`, {
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());

export const searchDoctorByQuery = async (debouncedQuery) => {
  const query = debouncedQuery
    ? `?search=${encodeURIComponent(debouncedQuery)}`
    : "";
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/doctors${query}`);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};

export const getDoctorProfileAppointment = () =>
  fetch(`${import.meta.env.VITE_BASE_URL}/doctors/appointments-list/me`, {
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());
