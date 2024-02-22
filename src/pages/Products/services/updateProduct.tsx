import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Products } from "../tables/columns"
import { queryClient } from "@/main";


// @TODO: RESEARCH MORE ON OPTIMISTICS UPDATES
// @link: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

const useUpdateProduct = (id:string) => {
    return useMutation({
      mutationKey: ["updateProduct", id],
      mutationFn: (values: Partial<Products>) =>
        axios.post(`http://localhost:1100/Products/${values.id}`, values).then((res) => res.status),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Products"] });
      },
      retry: 3
    });
}

export default useUpdateProduct;