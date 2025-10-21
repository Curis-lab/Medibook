import { useQuery } from "@tanstack/react-query";
import { searchDoctorByQuery } from "../../../apis/doctor";

export const useAllDoctors = (debouncedQuery) => {
  const {
    data: doctors,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["doctors", debouncedQuery],
    queryFn: async () => await searchDoctorByQuery(debouncedQuery),
  });

  return {
    doctors,
    error,
    isLoading,
    isSuccess,
  };
};
