export const getCurrrentUserAppointment = () =>
  fetch(`${import.meta.env.VITE_BASE_URL}/user/appointments/my-appointment`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  }).then((res) => res.json());
