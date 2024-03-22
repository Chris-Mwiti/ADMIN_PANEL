import { useQuery } from "@tanstack/react-query"
import { TCategory } from "../schemas/category.schema"
import useAxiosInstance from "@/config/axios"
type TCategoryResponse = {
    msg: string,
    data: TCategory[]
}
const useGetCategories = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery({
        queryKey:["Categories"],
        queryFn: () => axiosInstance.get<TCategoryResponse>(
            "/api/category"
        ).then(res => res.data)
    })
}

export default useGetCategories