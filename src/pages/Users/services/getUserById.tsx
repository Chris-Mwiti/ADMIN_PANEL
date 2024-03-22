import { useQuery } from "@tanstack/react-query";
import TUser from "../schemas/users.schema";
import useAxiosInstance from "@/config/axios";
import IResponse from "@/types/response.types";

const useGetUsersById = (id: string) => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryKey: ["Users", id],
    queryFn: () =>
      axiosInstance
        .get<IResponse<TUser>>("/api/users/" + id)
        .then((res) => res.data.data),
  });
};

export default useGetUsersById;
