import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { TOrdersSchema } from "../schemas/orders.schema"

const useGetOrderById = (id:string) => {
    return useQuery({
        queryKey: ["Orders", id],
        queryFn: () => axios.get<TOrdersSchema>(
            "http://localhost:1100/Orders/" + id
        ).then(res => res.data)
    })
}

export default useGetOrderById