import AxiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
type TQueryOptions = {
    //QT: Represents QT type
    refecthOnWindowFocus?:boolean
    refetchInterval?:number;
    refetchIntervalInBackground:boolean;
    refetchInBackground?:boolean;
    refetchOnWindowsMount?:boolean;
    staleTime?:number;
    gcTime?:number;
    enabled?:boolean;
}





const useGetQuery =<T>(url:string,key:string[],options?:TQueryOptions) => {
   console.log("fetching...");
   return useQuery({
    queryKey: key,
    queryFn: () => AxiosInstance.get<T>(url),
    ...options,
   })
}

export default useGetQuery