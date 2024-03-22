import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Products } from "../tables/columns"
import useAxiosInstance from "@/config/axios"
import IResponse from "@/types/response.types"

const useGetProducts = () => {
    const axiosInstance = useAxiosInstance()
    return useQuery({
        queryKey: ["Products"],
        queryFn: () => axiosInstance.get<IResponse<Products[]>>(
            "/api/product"
        ).then(res => res.data.data)
    })
}

export default useGetProducts 