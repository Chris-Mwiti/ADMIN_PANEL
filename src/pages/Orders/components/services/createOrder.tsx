import useAxiosInstance from "@/config/axios"
import IResponse from "@/types/response.types"
import { useMutation } from "@tanstack/react-query"
import { TOrdersSchema } from "../schemas/orders.schema"
import { useToast } from "@/components/ui/use-toast"

export interface IOrder {
    total:number,
    items:{
        productId:string,
        quantity:number,
        price:string
    }[]
}

const useCreateOrder = () => {
    const axiosInstance = useAxiosInstance();
    const {toast} = useToast()
    return useMutation({
        mutationKey: ["createOrder"],
        mutationFn: (values:IOrder) =>  axiosInstance.post<IResponse<TOrdersSchema>>("/api/orders",values).then(res => res.status),
        onSuccess(data, variables, context) {
            toast({
                title: "Order has been placed successfully",
                description: "Your order has been placed successfully"
            })
        },
    })
}

export default useCreateOrder