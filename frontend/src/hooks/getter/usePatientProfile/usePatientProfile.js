import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../../../apis/patient";
import { useContext } from "react";
import { authContext } from "../../../context/AuthContext";

export const usePatientProfile = () => {
  const { user } = useContext(authContext);
  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile", user._id],
    queryFn: getCurrentUserProfile,
  });

  return {
    profileData: userData?.data,
    error,
    loading: isLoading,
  };
};
