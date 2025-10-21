import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../apis/auth";
import { useContext } from "react";
import { authContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAuthApi = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  let msg = "";
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData) => await login(formData),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["doctor", "profile"] });
      const { data, token, role, status } = result;
      if (status === false) {
        dispatch({
          type: "LOGIN_START",
        });
        msg = result.message;
      } else {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data,
            token,
            role,
          },
        });
        msg = result.message;
        navigate("/home");
      }
    },
    onError: (error) => {
      dispatch({
        type: "LOGIN_START",
      });
      msg = error.message;
    },
  });
  return {
    mutate,
    isPending,
    msg,
    isSuccess,
  };
};
