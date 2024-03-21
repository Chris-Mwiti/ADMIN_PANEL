import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Products } from "../tables/columns"
import { queryClient } from "@/main";
import useAxiosInstance from "@/config/axios";
import IResponse from "@/types/response.types";


// @TODO: RESEARCH MORE ON OPTIMISTICS UPDATES
// @link: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

const useUpdateProduct = (id:string) => {
    const axiosInstance = useAxiosInstance();
    return useMutation({
      mutationKey: ["updateProduct", id],
      mutationFn: (values: Partial<Products>) =>
        axiosInstance.put<IResponse<Products>>(`/api/product/ ${id}`,values).then((res) => res.status),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Products"] });
      },
      retry: 3
    });
}

export default useUpdateProduct;