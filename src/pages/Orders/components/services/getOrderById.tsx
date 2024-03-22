import { useQuery } from "@tanstack/react-query";
import { TOrdersSchema } from "../schemas/orders.schema";
import useAxiosInstance from "@/config/axios";
import IResponse from "@/types/response.types";

const useGetOrderById = (id: string) => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryKey: ["Orders", id],
    queryFn: () =>
      axiosInstance
        .get<IResponse<TOrdersSchema>>("/api/orders/" + id)
        .then((res) => res.data.data),
  });
};

export default useGetOrderById;
