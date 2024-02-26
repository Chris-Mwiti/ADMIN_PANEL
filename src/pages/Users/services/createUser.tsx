import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import TUser from "../schemas/users.schema"
import { queryClient } from "@/main"

const useCreateUser = () => {
    return useMutation({
        mutationKey: ["createUser"],
        mutationFn: (values:TUser) => axios.post(
            "http://localhost:1100/Users",
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