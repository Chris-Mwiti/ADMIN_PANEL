import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import TUser from "../schemas/users.schema"

const useGetUsers = () => {
    return useQuery({
        queryKey: ["Users"],
        queryFn: () => axios.get<TUser[]>(
            "http://localhost:1100/Users"
        ).then(res => res.data)
    })
}

export default useGetUsers