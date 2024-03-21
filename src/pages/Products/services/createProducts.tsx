import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { TProductFormSchema } from "../schemas/product.schema";
import useAxiosInstance from "@/config/axios";
import { useNavigate } from "react-router";

// @TODO: Update the mutation function to reference a single instance of axios object

const useCreateProduct = () => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: (values: TProductFormSchema) =>
      axiosInstance.post("/api/product", values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });

      setTimeout(() => navigate("/products"), 2000)
    },
    retry: 3,
  });
};

export default useCreateProduct;
