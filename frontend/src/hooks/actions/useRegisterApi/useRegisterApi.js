import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../../../apis/auth";

export const useRegisterApi = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: () => navigate("/login"),
  });

  return {
    mutate,
    isPending,
  };
};
