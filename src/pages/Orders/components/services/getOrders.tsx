import axios from "axios"
import { TOrdersSchema } from "../schemas/orders.schema"
import { useQuery } from "@tanstack/react-query"

const useGetOrders = () => {
    return useQuery({
        queryKey: ["Orders"],
        queryFn: () =>  axios.get<TOrdersSchema[]>("http://localhost:1100/Orders").then(res=> res.data)
    })
}

export default useGetOrders