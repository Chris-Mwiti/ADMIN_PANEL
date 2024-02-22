import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Products } from "../tables/columns"

const useGetProducts = () => {
    return useQuery({
        queryKey: ["Products"],
        queryFn: () => axios.get<Products[]>(
            "http://localhost:1100/Products"
        ).then(res => res.data)
    })
}

export default useGetProducts 