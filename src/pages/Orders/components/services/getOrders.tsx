import axios from "axios";
import { TOrdersSchema } from "../schemas/orders.schema";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@/config/axios";
import IResponse from "@/types/response.types";



const useGetOrders = () => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryKey: ["Orders"],
    queryFn: () =>
      axiosInstance
        .get<IResponse<TOrdersSchema[]>>("/api/orders")
        .then((res) => res.data.data),
  });
};

export default useGetOrders;
