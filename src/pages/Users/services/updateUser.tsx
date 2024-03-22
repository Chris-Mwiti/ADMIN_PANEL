import { useMutation } from "@tanstack/react-query"
import TUser from "../schemas/users.schema"
import { queryClient } from "@/main"
import useAxiosInstance from "@/config/axios"

const useUpdateUser = (id:string) => {
    const axiosInstance = useAxiosInstance();
    return useMutation({
        mutationKey: ["updateUser", id],
        mutationFn: (values:Partial<TUser>) => axiosInstance.put(
            "/api/users/" + id,
            {
                id: id,
                ...values
            }
        ).then(res => res.status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Users"]
            })
        }
    })
}

export default useUpdateUser;