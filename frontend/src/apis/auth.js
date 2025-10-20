
export const login = async (formData) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const result = await res.json();
  return result;
};

export const register = (formData) =>
  fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
