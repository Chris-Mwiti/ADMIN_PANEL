import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import TUser from "../schemas/users.schema"
import { queryClient } from "@/main"
import useAxiosInstance from "@/config/axios"

const useCreateUser = () => {
    const axiosInstance = useAxiosInstance();
    return useMutation({
        mutationKey: ["createUser"],
        mutationFn: (values:TUser) => axiosInstance.post(
            "/auth/register",
            values
        ).then(res => res.status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Users"]
            })
        }
    })
}

export default useCreateUser