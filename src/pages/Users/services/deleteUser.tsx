import { queryClient } from "@/main"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const useDeleteUser = (id:string) => {
    return useMutation({
        mutationKey: ["deleteUser", id],
        mutationFn: () => axios.delete(
            "http://localhost:1100/Users/" + id
        ).then(res => res.status),
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey: ["Users"]
            })
        }
    })
}

export default useDeleteUser
