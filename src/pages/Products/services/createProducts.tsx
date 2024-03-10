import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/main";
import { TProductFormSchema } from "../schemas/product.schema";
import useAxiosInstance from "@/config/axios";

// @TODO: Update the mutation function to reference a single instance of axios object

const useCreateProduct = () => {
  const axiosInstance = useAxiosInstance()
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: (values: TProductFormSchema) =>
      axiosInstance.post("/api/product", values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
    },
    retry: 3,
  });
};

export default useCreateProduct;
