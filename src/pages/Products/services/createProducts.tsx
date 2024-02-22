import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Products } from "../tables/columns"
import { queryClient } from "@/main"
import { TProductFormSchema } from "../schemas/productFormSchema"

// @TODO: Update the mutation function to reference a single instance of axios object


const useCreateProduct = () => {
    return useMutation({
        mutationKey: ["createProduct"],
        mutationFn: (values:TProductFormSchema) => axios.post("http://localhost:1100/Products", values),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Products"]
            })
        },
        retry: 3
    })
}

export default useCreateProduct;