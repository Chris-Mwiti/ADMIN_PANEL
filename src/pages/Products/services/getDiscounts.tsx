import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { TDiscount } from "../schemas/discounts.schema"
import AxiosInstance from "@/config/axios"
import useAxiosInstance from "@/config/axios"


type TDiscountResponse = {
    msg:string,
    data:TDiscount[]
}
const useGetDiscounts = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery({
        queryKey: ["Discounts"],
        queryFn: () => axiosInstance.get<TDiscountResponse>(
            "/api/discounts"
        ).then(res => res.data)
    })
}

export default useGetDiscounts