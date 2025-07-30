import { BASE_URL, token } from "../config";

export const getCurrrentUserAppointment = () =>
  fetch(`${BASE_URL}/user/appointments/my-appointment`, {
    method: "GET",
    headers: {
      Authentication: `Bearer ${token}`,
    },
  }).then((res) => res.json());
