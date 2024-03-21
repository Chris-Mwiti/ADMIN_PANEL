import useGetQuery from "@/querys/FetchQueries/fetchSalesData";
import { Products } from "../tables/columns";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@/config/axios";
import IResponse from "@/types/response.types";

const useGetProductsById = (id: string) => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryKey: ["Products", id],
    queryFn: () =>
      axiosInstance
        .get<IResponse<Products>>("/api/product/" + id)
        .then((res) => res.data.data),
  });
};

export default useGetProductsById;
