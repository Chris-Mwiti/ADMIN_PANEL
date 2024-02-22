import useGetQuery from "@/querys/FetchQueries/fetchSalesData"
import { Products } from "../tables/columns"

const useGetProductsById = (id:string) => {
    return useGetQuery<Products>(`/Products/${id}`, ["Products", id]);
}

export default useGetProductsById;