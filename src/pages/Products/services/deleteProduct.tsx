import { queryClient } from "@/main"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const useDeleteProductById = (id:string) => {
    return useMutation({
        mutationKey: ["deleteProduct", id],
        mutationFn: (id:string) => axios.delete(`http://localhost:1100/Products/${id}`),
        retry: 3,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Products"]
            })
        }
    })
}

export default useDeleteProductById