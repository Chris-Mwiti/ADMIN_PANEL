import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { TLoginSchema } from "../schemas/login.schema"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router"
import AxiosInstance from "@/config/axios"
import { useTokensActions } from "@/contexts/data.store"
import useAxiosInstance from "@/config/axios"

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

const useLoginUser = () => {
    const {toast} = useToast();
    const navigate = useNavigate();
    const {addTokens} = useTokensActions();

    //axios instance
    const axiosInstance = useAxiosInstance();
    return useMutation({
        mutationKey:["login"],
        mutationFn: (values:TLoginSchema) => axiosInstance.post<ITokens>(
            "http://localhost:3000/auth/login",
            values
        ).then(res => res.data),
        onSuccess(data, variables, context) {
            //Persistent storage of cookies
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            toast({
                title: "Login success",
                description: "Login successfully"
            })

            setTimeout(() => navigate("/"), 2000);
        },

        onError(error, variables, context) {
            toast({
                title: "Error",
                description: error.message
            })
        },
    })
}

export default useLoginUser;