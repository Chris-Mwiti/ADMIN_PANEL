import useAxiosInstance from "@/config/axios"
import IResponse from "@/types/response.types";
import { useQuery } from "@tanstack/react-query"

export type TNotifications = {
    id?:string;
    type: "products" | "orders" | "users";
    level: "critical" | "important" | "info";
    message:string;
    title:string;
}



const useGetNotifications = () => {
    const axiosInstance = useAxiosInstance()
    return useQuery({
        queryKey: ["Notifications"],
        queryFn: () => axiosInstance.get<IResponse<TNotifications[]>>("/api/notifications").then(res => res.data.data.reverse())
    })
}

export default useGetNotifications