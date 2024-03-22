import useAxiosInstance from "@/config/axios"
import { queryClient } from "@/main"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const useDeleteUser = (id:string) => {
    const axiosInstance = useAxiosInstance();
    return useMutation({
        mutationKey: ["deleteUser", id],
        mutationFn: () => axiosInstance.delete(
            "/api/users/" + id
        ).then(res => res.status),
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey: ["Users"]
            })
        }
    })
}

export default useDeleteUser
