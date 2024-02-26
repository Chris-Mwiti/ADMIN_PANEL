import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import TUser from "../schemas/users.schema"
import { queryClient } from "@/main"

const useUpdateUser = (id:string) => {
    return useMutation({
        mutationKey: ["updateUser", id],
        mutationFn: (values:Partial<TUser>) => axios.put(
            "http://localhost:1100/Users/" + id,
            values
        ).then(res => res.status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["Users"]
            })
        }
    })
}

export default useUpdateUser;