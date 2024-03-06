import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { TLoginSchema } from "../schemas/login.schema"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router"

const useLoginUser = () => {
    const {toast} = useToast();
    const navigate = useNavigate();
    return useMutation({
        mutationKey:["login"],
        mutationFn: (values:TLoginSchema) => axios.post(
            "http://localhost:3000/auth/login",
            values
        ),
        onSuccess(data, variables, context) {
            toast({
                title: "Login success",
                description: "Login successfully"
            })

            // setTimeout(() => navigate("/"), 2000);
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