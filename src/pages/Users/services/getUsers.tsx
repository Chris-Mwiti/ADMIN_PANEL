import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import TUser from "../schemas/users.schema"
import useAxiosInstance from "@/config/axios"
import IResponse from "@/types/response.types"

const useGetUsers = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery({
        queryKey: ["Users"],
        queryFn: () => axiosInstance.get<IResponse<TUser[]>>(
            "/api/users"
        ).then(res => res.data.data)
    })
}

export default useGetUsers