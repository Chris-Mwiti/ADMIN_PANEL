import useAxiosInstance from "@/config/axios"
import { useMutation } from "@tanstack/react-query"
import { TOrdersSchema } from "../schemas/orders.schema";
import { useNavigate } from "react-router";
import { queryClient } from "@/main";

const useUpdateOrder = (id:string) => {
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["updatingOrder", id],
        mutationFn: (status:TOrdersSchema["status"]) => axiosInstance.put("/api/orders/" + id, {
            status
        }).then(res => res.status),
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({
                queryKey: ["Orders"]
            })
            setTimeout(() => navigate("/orders"),2000)
        },
    })
}

export default useUpdateOrder