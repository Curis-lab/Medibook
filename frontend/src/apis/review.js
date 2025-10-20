
export const patientReviews = (id, reviewText, rating) => {
  const res = fetch(`${import.meta.env.VITE_BASE_URL}/doctors/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      reviewText,
      rating,
    }),
  })
    .then((response) => response.json())
    .then((result) => result.data);
  return res;
};
